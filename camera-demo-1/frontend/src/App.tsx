import "./App.css";
import CustomWebcam from "./component/customCameraComponent/CustomWebcam.tsx";

const App = () => {
    return (
        <div className="App">
            <CustomWebcam imgType="webp"/>
        </div>
    );
};

export default App;