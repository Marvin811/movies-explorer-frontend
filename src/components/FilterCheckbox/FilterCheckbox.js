import React from "react";
import "./FilterCheckbox.css";

function Checkbox(props) {
    const { tumbler, setTumbler } = props;
    function changeTumbler() {
        setTumbler(tumbler ? false : true);
    }

    return (
        <input
            type="checkbox"
            className="checkbox__tumbler link-opacity"
            checked={tumbler}
            onClick={changeTumbler}
        ></input>
    );
}

export default Checkbox;
