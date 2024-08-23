import React from "react";

type CameraControlsProps = {
    devices: MediaDeviceInfo[];
    mirrored: boolean;
    setMirrored: (value: boolean) => void;
    selectedDeviceId: string;
    handleSelectedDevices: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CameraControls: React.FC<CameraControlsProps> = ({ devices, mirrored, setMirrored, selectedDeviceId, handleSelectedDevices }) => {
    return (
        <div className="controls">
            <div>
                <label htmlFor="cameras">Choose a camera:</label>
                <select name="cameras" id="cameras" value={selectedDeviceId} onChange={handleSelectedDevices}>
                    {devices?.map((device) => (
                        <option key={device.label} value={device.deviceId}>
                            {device.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <input type="checkbox" checked={mirrored} onChange={(e) => setMirrored(e.target.checked)} />
                <label>Mirror</label>
            </div>
        </div>
    );
};

export default CameraControls;
