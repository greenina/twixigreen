import React from "react";
import "./Switch.css";

const Switch = ({rounded = false}) => {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="onoff" />
        </label>
    )
};

export default Switch;