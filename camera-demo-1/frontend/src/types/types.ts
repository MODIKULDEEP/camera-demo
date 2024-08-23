import Webcam from "react-webcam";
import React from "react";

// Define the type for the webcam reference, which can be either a Webcam component instance or null
export type WebcamRef = React.MutableRefObject<Webcam | null>;
// capture image type format
type ImageType = 'png' | 'jpeg' | 'webp'
// capture image data in base 64
type Base64<imageType extends ImageType> = `data:image/${imageType};base64${string}`
// image data types
export type imageDataType = Base64<ImageType> | null

export type CameraProps = {
    mirrored: boolean;
    selectedDeviceId: string;
    imgType: ImageType
};

export type CameraControlsProps = {
    devices: MediaDeviceInfo[];
    mirrored: boolean;
    setMirrored: (value: boolean) => void;
    selectedDeviceId: string;
    handleSelectedDevices: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type CaptureButtonProps = {
    imgSrc: string | null;
    capture: () => void;
    retake: () => void;
    uploadImage: () => void;
};

export type CapturedImageProps = {
    imgSrc: string | null;
};

// Define the type for the props, including imgType
export type CustomWebcamProps = {
    imgType: ImageType;
    sendImageData: (imageData: imageDataType) => void;
};