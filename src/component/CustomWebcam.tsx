import Webcam from "react-webcam";
import React, {useCallback, useRef, useState} from "react";

// Define the type for the webcam reference, which can be either a Webcam component instance or null
type WebcamRef = React.MutableRefObject<Webcam | null>;
// capture image type format
type ImageType = 'png' | 'jpeg' | 'webp'
// capture image data in base 64
type Base64<imageType extends ImageType> = `data:image/${imageType};base64${string}`

const CustomWebcam = () => {
    // using useRef Hook allow us to access the webcam instance and take a screenshot
    const webcamRef: WebcamRef = useRef<Webcam | null>(null);
    // imgSrc store the image data after a screenshot has been taken
    const [imgSrc, setImgSrc] = useState<Base64<'jpeg'> | null>(null);
    // used to store the value of the checkbox and determine whether the video stream should be mirrored or not
    const [mirrored, setMirrored] = useState<boolean>(false);

    const [devices, setDevices] = React.useState([]);
    const [selectedDevice, setSelectedDevice] = React.useState({});

    const handleDevices = React.useCallback(
        mediaDevices => {
            setDevices(mediaDevices.filter(({kind}) => kind === "videoinput"))
            setSelectedDevice(mediaDevices.filter(({kind}) => kind === "videoinput")[0])
        },
        [setDevices]
    );

    React.useEffect(
        () => {
            if (!navigator.mediaDevices?.enumerateDevices) {
                alert("enumerateDevices() not supported.");
            }
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );

    // create a capture function to take photo
    const capture = useCallback(() => {
      if (webcamRef.current instanceof Webcam) {
        // This function returns a base64 encoded string of the current webcam image
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc as Base64<'jpeg'>);
      }
    }, [webcamRef]);

    // function for retaking photos
    const retake = () => {
        setImgSrc(null);
    };

    return (
        <div className="container">
                <div>
                    {imgSrc ? (
                        <img src={imgSrc} alt="webcam"/>
                    ) : (
                        <Webcam
                            height={600}
                            width={600}
                            // reference for capturing image
                            ref={webcamRef}
                            // boolean value for if we need mirror image or not
                            mirrored={mirrored}
                            // for image capture quality range from 0 to 1
                            screenshotQuality={1}
                            // The possible values for this prop are image/jpeg, image/png, and image/webp. The default value is image/webp
                            screenshotFormat="image/jpeg"
                            // smoothens the pixel of a image
                            imageSmoothing={true}
                            // for to show specific camera device
                            videoConstraints={{deviceId: selectedDevice.deviceId}}
                        />
                    )}
                    {selectedDevice.label}
                </div>
            <div className="controls">
                <div>
                    <input
                        type="checkbox"
                        checked={mirrored}
                        onChange={(e) => setMirrored(e.target.checked)}
                    />
                    <label>Mirror</label>
                </div>
            </div>
            <div className="btn-container">
                {imgSrc ? (
                    <button onClick={retake}>Retake photo</button>
                ) : (
                    <button onClick={capture}>Capture photo</button>
                )}
            </div>
        </div>
    );
};

export default CustomWebcam;
