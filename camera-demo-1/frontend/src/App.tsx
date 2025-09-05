import "./App.css";
import CustomWebcam from "./component/customCameraComponent/CustomWebcam.tsx";
import { imageDataType, videoDataType } from "./types/types.ts";

const App = () => {
  const imageDataHandler = (imageData: imageDataType) => {
    console.log("Image data:", imageData);
  };

  const videoDataHandler = (videoData: videoDataType) => {
    console.log("Video data:", videoData);
  };

  return (
    <div className="App">
      <CustomWebcam
        imgType="webp"
        sendImageData={imageDataHandler}
        sendVideoData={videoDataHandler}
      />
    </div>
  );
};

export default App;
