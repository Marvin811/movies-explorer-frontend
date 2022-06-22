import React from "react";
import './More.css';

export function More({ handleClickButton }) {
    return(
        <div className="more">
            <button
                className="more__button" type="button" onClick={handleClickButton}>
                Ещё
            </button>
        </div>
    )
}
