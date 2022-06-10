import React from "react";
import './Navigation.css';
import Logo from "../Logo/Logo";
import {NavLink} from "react-router-dom";
import icon from '../../images/icon.svg'


export default function Navigation() {
    const setActive = ({isActive}) =>
        isActive
            ? "navigation-header__link navigation-header__link_active link-opacity"
            : "navigation-header__link link-opacity";

    return (
        <section className="navigation-header">
            <Logo/>
            <div className="navigation-header__links">
                <NavLink to="/movies" className={setActive}>
                    Фильмы
                </NavLink>
                <NavLink to="/saved-movies" className={setActive}>
                    Сохраненные фильмы
                </NavLink>
            </div>
            <NavLink to="/profile" className="navigation-header__profile link-opacity">
                <p className='navigation__profile-text'>Аккаунт</p>
                <img src={icon}  className="navigation-header__icon" alt="Изображение кнопки Аккаунт"></img>
            </NavLink>
        </section>
    )
}

