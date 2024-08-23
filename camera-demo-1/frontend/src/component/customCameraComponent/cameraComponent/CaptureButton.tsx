import React from "react";

type CaptureButtonProps = {
    imgSrc: string | null;
    capture: () => void;
    retake: () => void;
};

const CaptureButton: React.FC<CaptureButtonProps> = ({imgSrc, capture, retake}) => {
    return (
        <div className="btn-container">
            {imgSrc ? (
                <button onClick={retake}>Retake photo</button>
            ) : (
                <button onClick={capture}>Capture photo</button>
            )}
        </div>
    );
};

export default CaptureButton;
