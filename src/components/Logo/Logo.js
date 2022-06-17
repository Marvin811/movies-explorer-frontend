import './Logo.css';
import logo from '../../images/Logo.svg';
import {Link} from "react-router-dom";
import React from "react";

function Logo() {
    return (
        <Link className="logo__link" to="/">
            <img src={logo} alt="Логотип" className="logo"/>
        </Link>

    );
}

export default Logo;


