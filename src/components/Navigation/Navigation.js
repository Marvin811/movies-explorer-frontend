import React from "react";
import './Navigation.css'
import {Link} from "react-router-dom";
import profile from "../../images/icon.svg";

function Navigation() {
    return (
        <div className="navigation">
            <div className="navigation__films-container">
                <Link to="/movies" className="navigation__film">Фильмы</Link>
                <Link to="/saved-movies" className="navigation__film">Сохраненные фильмы</Link>
            </div>
            <div className="navigation__acc-container">
                <Link to="/profile" className="navigation__acc">Аккаунт</Link>
                <div className="navigation__pic-container">
                    <img src={profile} alt="Логотип профиля" className="navigation__pic"/>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
