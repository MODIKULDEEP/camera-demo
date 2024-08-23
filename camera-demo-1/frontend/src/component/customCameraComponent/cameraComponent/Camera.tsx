import React, { forwardRef } from "react";
import Webcam from "react-webcam";

type ImageType = 'png' | 'jpeg' | 'webp'

type CameraProps = {
    mirrored: boolean;
    selectedDeviceId: string;
    imgType: ImageType
};

const Camera = forwardRef<Webcam, CameraProps>(({ mirrored, selectedDeviceId, imgType }, ref) => {
    return (
        <Webcam
            // reference for capturing image
            ref={ref}
            // boolean value for if we need mirror image or not
            mirrored={mirrored}
            // for image capture quality range from 0 to 1
            screenshotQuality={1}
            // The possible values for this prop are image/jpeg, image/png, and image/webp. The default value is image/webp
            screenshotFormat={`image/${imgType}`}
            // smoothens the pixel of an image
            imageSmoothing={true}
            // for to show specific camera device
            videoConstraints={{ deviceId: selectedDeviceId }}
        />
    );
});

export default Camera;