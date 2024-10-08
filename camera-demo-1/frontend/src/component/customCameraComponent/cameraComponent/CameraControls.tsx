import React from "react";
import {CameraControlsProps} from "../../../types/types.ts";

const CameraControls: React.FC<CameraControlsProps> = ({
                                                           devices,
                                                           mirrored,
                                                           setMirrored,
                                                           selectedDeviceId,
                                                           handleSelectedDevices
                                                       }) => {
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
                <label>
                    <input name="mirror" id="mirror" type="checkbox" checked={mirrored}
                           onChange={(e) => setMirrored(e.target.checked)}/>
                    Mirror
                </label>
            </div>
        </div>
    );
};

export default CameraControls;
