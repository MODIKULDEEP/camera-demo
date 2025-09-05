import Webcam from "react-webcam";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Camera from "./cameraComponent/Camera.tsx";
import CapturedImage from "./cameraComponent/CapturedImage.tsx";
import CapturedVideo from "./cameraComponent/CapturedVideo.tsx";
import CameraControls from "./cameraComponent/CameraControls.tsx";
import CaptureButton from "./cameraComponent/CaptureButton.tsx";
import {
  CustomWebcamProps,
  imageDataType,
  videoDataType,
  WebcamRef,
} from "../../types/types.ts";

const CustomWebcam: React.FC<CustomWebcamProps> = ({
  imgType,
  sendImageData,
  sendVideoData,
}) => {
  // using useRef Hook allow us to access the webcam instance and take a screenshot
  const webcamRef: WebcamRef = useRef<Webcam | null>(null);
  // imgSrc store the image data after a screenshot has been taken
  const [imgSrc, setImgSrc] = useState<imageDataType>(null);
  // videoSrc store the video data after recording has been stopped
  const [videoSrc, setVideoSrc] = useState<videoDataType>(null);
  // isRecording tracks the recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  // mediaRecorderRef stores the MediaRecorder instance
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // used to store the value of the checkbox and determine whether the video stream should be mirrored or not
  const [mirrored, setMirrored] = useState<boolean>(false);
  // used to store all video devices
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  // used to store currently in use camera id
  const [selectedDeviceId, setSelectedDeviceId] = React.useState<string>("");
  const [cameraAccessChecked, setCameraAccessChecked] =
    useState<boolean>(false);

  // Function to check camera access and request permission if needed
  const checkCameraAccess = async () => {
    try {
      // Attempt to access the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // If successful, the camera is accessible
      console.log("Camera access granted");
      // Stop the stream immediately if you don't need it now
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          // If the user denied permission
          console.log("Camera access denied");
        } else if (error.name === "NotFoundError") {
          // If no camera is found
          console.log("No camera found");
        } else {
          // Other errors
          console.error("Error accessing the camera:", error);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      // Indicate that camera access check is complete
      setCameraAccessChecked(true);
    }
  };

  // Call the function to check camera access
  useEffect(() => {
    checkCameraAccess();
  }, []);

  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      // filter all video device from media devices
      const videoDevices = mediaDevices.filter(
        ({ kind }) => kind === "videoinput"
      ) as MediaDeviceInfo[];
      // store filtered video device
      setDevices(videoDevices);
      // Store first video device as the initial device
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    },
    [setDevices]
  );

  useEffect(() => {
    // check if video device is supported or not
    if (!navigator.mediaDevices?.enumerateDevices) {
      // throw error if no video devices is supported
      alert("enumerateDevices() not supported.");
    }
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [cameraAccessChecked, handleDevices]);

  // create a capture function to take photo
  const capture = useCallback(() => {
    if (webcamRef.current instanceof Webcam) {
      // This function returns a base64 encoded string of the current webcam image
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(typeof imageSrc);
      // set captured image in state
      setImgSrc(imageSrc as imageDataType);
    }
  }, [webcamRef]);

  // function for retaking photos
  const retake = () => {
    setImgSrc(null);
  };

  // function for retaking videos
  const retakeVideo = () => {
    setVideoSrc(null);
  };

  // function to start video recording
  const startRecording = useCallback(() => {
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject as MediaStream;
      if (stream) {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
        });

        mediaRecorderRef.current = mediaRecorder;

        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const videoUrl = URL.createObjectURL(blob);
          setVideoSrc(videoUrl);
        };

        mediaRecorder.start();
        setIsRecording(true);
      }
    }
  }, []);

  // function to stop video recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  // change selected device
  const handleSelectedDevices = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(e.target.value);
  };

  const sendImage = () => {
    sendImageData(imgSrc);
  };

  const sendVideo = () => {
    sendVideoData(videoSrc);
  };

  return (
    <div className="container">
      {selectedDeviceId && (
        <div>
          <CapturedImage imgSrc={imgSrc} />
          <CapturedVideo videoSrc={videoSrc} />
          {!imgSrc && !videoSrc && (
            <Camera
              ref={webcamRef}
              mirrored={mirrored}
              selectedDeviceId={selectedDeviceId}
              imgType={imgType}
            />
          )}
        </div>
      )}
      <CameraControls
        devices={devices}
        mirrored={mirrored}
        setMirrored={setMirrored}
        selectedDeviceId={selectedDeviceId}
        handleSelectedDevices={handleSelectedDevices}
      />
      <CaptureButton
        imgSrc={imgSrc}
        capture={capture}
        retake={retake}
        uploadImage={sendImage}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        videoSrc={videoSrc}
        retakeVideo={retakeVideo}
        uploadVideo={sendVideo}
      />
    </div>
  );
};

export default CustomWebcam;
