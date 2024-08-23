import React from "react";
import {CaptureButtonProps} from "../../../types/types.ts";

const CaptureButton: React.FC<CaptureButtonProps> = ({imgSrc, capture, retake, uploadImage}) => {
    return (
        <div className="btn-container">
            {imgSrc ? (
                <>
                    <button onClick={retake}>Retake photo</button>
                    <button onClick={uploadImage}>Upload photo</button>
                </>
            ) : (
                <button onClick={capture}>Capture photo</button>
            )}
        </div>
    );
};

export default CaptureButton;
