import React from "react";
import './Header.css';
import {Link} from "react-router-dom";
import Logo from '../../images/Logo.svg';

export function Header() {
    return (
        <header className='header'>
            <nav className="header__container">
                <Link className="header__link" to="/">
                    <img src={Logo} alt="Логотип" className="header__logo"/>
                </Link>
                <div className="header__links">
                    <Link className="header__link" to="/signup">
                        <h2 className="header__link-title">Регистрация</h2>
                    </Link>
                    <Link className="header__link" to="/signin">
                        <button className="header__link-button">Войти</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
