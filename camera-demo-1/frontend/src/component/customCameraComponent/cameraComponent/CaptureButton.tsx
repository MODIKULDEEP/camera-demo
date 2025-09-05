import React from "react";
import { CaptureButtonProps } from "../../../types/types.ts";

const CaptureButton: React.FC<CaptureButtonProps> = ({
  imgSrc,
  capture,
  retake,
  uploadImage,
  isRecording,
  startRecording,
  stopRecording,
  videoSrc,
  retakeVideo,
  uploadVideo,
}) => {
  return (
    <div className="btn-container">
      {/* Image capture buttons */}
      {imgSrc ? (
        <>
          <button onClick={retake}>Retake photo</button>
          <button onClick={uploadImage}>Upload photo</button>
        </>
      ) : !videoSrc ? (
        <button onClick={capture}>Capture photo</button>
      ) : null}

      {/* Video recording buttons */}
      {videoSrc ? (
        <>
          <button onClick={retakeVideo}>Record new video</button>
          <button onClick={uploadVideo}>Upload video</button>
        </>
      ) : !imgSrc ? (
        <>
          {!isRecording ? (
            <button
              onClick={startRecording}
              style={{ backgroundColor: "#dc3545", color: "white" }}
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              style={{ backgroundColor: "#28a745", color: "white" }}
            >
              <span className="recording-indicator"></span>
              Stop Recording
            </button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default CaptureButton;
