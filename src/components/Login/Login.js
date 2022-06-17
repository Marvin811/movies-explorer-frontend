import './Login.css';
import React from "react";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";
import {Link} from "react-router-dom";

export function Login() {

    return (
        <section className='authorization'>
            <Logo />
            <h1 className="authorization__title">Рады видеть!</h1>
            <form className="authorization__form">
                <label className="authorization__label">E-mail
                    <input className="authorization__input"
                           name="email"
                           type="email"
                    />
                    <span className="authorization__error"></span>
                </label>
                <label className="authorization__label">Пароль
                    <input className="authorization__input"
                           name="password"
                           type="password"
                    />
                    <span className="authorization__error"></span>
                </label>
                {/*<Preloader/>*/}
                <button className="authorization__submit" type="submit">Войти</button>
            </form>
            <span className="authorization__caption">Еще не зарегистрированы?
                <Link className="authorization__caption-text" to="/signup"> Регистрация</Link> </span>
        </section>
    )

}

