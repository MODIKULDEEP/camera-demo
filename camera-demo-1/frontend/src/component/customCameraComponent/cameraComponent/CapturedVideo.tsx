import React from "react";
import { CapturedVideoProps } from "../../../types/types.ts";

const CapturedVideo: React.FC<CapturedVideoProps> = ({ videoSrc }) => {
  return (
    <div className="captured-video">
      {videoSrc && (
        <video
          src={videoSrc}
          controls
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default CapturedVideo;
