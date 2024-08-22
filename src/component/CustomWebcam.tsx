import Webcam from "react-webcam";
import React, {useCallback, useEffect, useRef, useState} from "react";

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
    // used to store all video devices
    const [devices, setDevices] = React.useState([]);
    // used to store currently in use camera id
    const [selectedDeviceId, setSelectedDeviceId] = React.useState({});

    const handleDevices = React.useCallback(
        mediaDevices => {
            // filter all video device from media devices
            const videoDevices = mediaDevices.filter(({kind}) => kind === "videoinput")
            // store filtered video device
            setDevices(videoDevices)
            // store first video device as initial device
            setSelectedDeviceId(videoDevices[0].deviceId)
        },
        [setDevices]
    );

    useEffect(
        () => {
            // check if video device is supported or not
            if (!navigator.mediaDevices?.enumerateDevices) {
                // throw error if no video devices is supported
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
            // set captured image in state
            setImgSrc(imageSrc as Base64<'jpeg'>);
        }
    }, [webcamRef]);

    // function for retaking photos
    const retake = () => {
        setImgSrc(null);
    };

    // change selected device
    const handleSelectedDevices = (e) => {
        setSelectedDeviceId(e.target.value);
    }

    return (
        <div className="container">
            {selectedDeviceId &&
                <div>
                    {imgSrc ? (
                        <img src={imgSrc} alt="webcam"/>
                    ) : (
                        <Webcam
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
                            videoConstraints={{deviceId: selectedDeviceId}}
                        />
                    )}
                </div>
            }
            <div className="controls">
                <div>
                    <label htmlFor="cameras">Choose a camera:</label>
                    <select name="cameras" id="cameras" onChange={(e) => handleSelectedDevices(e)}>
                        {devices?.map((device) => (
                            <option key={device.label} value={device.deviceId}>{device.label}</option>
                        ))}
                    </select>
                </div>
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
