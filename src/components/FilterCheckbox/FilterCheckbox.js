import React from "react";
import "./FilterCheckbox.css";

function Checkbox({switchShortMovie, isActive}) {
    return (
        <input
            type="checkbox"
            className="checkbox__tumbler link-opacity"
            checked={isActive}
            onChange={switchShortMovie}
        ></input>
    );
}

export default Checkbox;
