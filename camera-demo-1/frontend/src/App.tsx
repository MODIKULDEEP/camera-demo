import "./App.css";
import CustomWebcam from "./component/customCameraComponent/CustomWebcam.tsx";
import {imageDataType} from "./types/types.ts";

const App = () => {
    const imageDataHandler = (imageData: imageDataType) => {
        console.log(imageData)
    }
    return (
        <div className="App">
            <CustomWebcam imgType="webp" sendImageData={imageDataHandler}/>
        </div>
    );
};

export default App;