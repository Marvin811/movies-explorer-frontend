import "./SlideMenu.css";
import closeButton from "../../images/close-button.svg";
import {NavLink, Link} from "react-router-dom";
import profile from "../../images/icon.svg";
import React from "react";

function SlideMenu(props) {
    const {isOpen, onClose} = props;

    const setActive = ({isActive}) =>
        isActive
            ? "slide-menu__link slide-menu__link_active link-opacity"
            : "slide-menu__link link-opacity";

    return (
        <section className={`slide-menu ${isOpen ? "slide-menu_opened" : ""}`}>

            <img
                src={closeButton}
                className="slide-menu_close-button link-opacity"
                onClick={onClose}
                alt="Кнопка Выйти"
            ></img>
            <div className="slide-menu__container">
                <div className="slide-menu__links">
                    <NavLink to="/" className={setActive}>
                        Главная
                    </NavLink>
                    <NavLink to="/movies" className={setActive}>
                        Фильмы
                    </NavLink>
                    <NavLink to="/saved-movies" className={setActive}>
                        Сохраненные фильмы{" "}
                    </NavLink>
                </div>
                <Link to="/profile" className="slide-menu__profile link-opacity">
                    <p className='slide-menu__menu-text'>Аккаунт</p>
                    <img src={profile} className="navigation-header__icon" alt="Изображение кнопки Аккаунт"></img>
                </Link>
            </div>
        </section>
    );
}

export default SlideMenu;
