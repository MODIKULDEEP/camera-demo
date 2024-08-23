import React from "react";

type CapturedImageProps = {
    imgSrc: string | null;
};

const CapturedImage: React.FC<CapturedImageProps> = ({ imgSrc }) => {
    return imgSrc ? <img src={imgSrc} alt="Captured webcam" /> : null;
};

export default CapturedImage;
