import React from "react";
import {CapturedImageProps} from "../../../types/types.ts";

const CapturedImage: React.FC<CapturedImageProps> = ({imgSrc}) => {
    return imgSrc ? <img src={imgSrc} alt="Captured webcam"/> : null;
};

export default CapturedImage;
