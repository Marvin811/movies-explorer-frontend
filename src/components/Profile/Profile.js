import React from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import {NavLink} from "react-router-dom";

export function Profile() {
    return (
        <div className="profile">
            <Navigation />
            <form className="profile__form">
                <h1 className="profile__title">Привет, Егор!</h1>

                <div className="profile__input-container">
                    <label className="profile__input-container-label">Имя</label>
                    <input id="profile-input-name" type="text" name="name" className="profile__item-input profile__item-input_type_name" defaultValue="Егор" />
                </div>
                <span className="authorization__error"></span>

                <div className="profile__input-container">
                    <label className="profile__input-container-label">E-mail</label>
                    <input id="profile-input-email" type="email" name="email" className="profile__item-input" defaultValue="pochta@yandex.ru" />
                </div>
                <span className="authorization__error"></span>

                <div className="profile__link-container">
                    <button className="profile__button" to="/signin">Редактировать</button>
                    <NavLink className="profile__link" to="/">Выйти из аккаунта</NavLink>
                </div>
            </form>
        </div>

    )
}
