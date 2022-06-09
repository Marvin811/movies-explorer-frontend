import React from "react";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";
import {Link} from "react-router-dom"

export function Register() {
    return (
        <section className='authorization'>
            <Logo />
            <h1 className="authorization__title">Добро пожаловать!</h1>
            <form className="authorization__form">
                <label className="authorization__label">Имя
                    <input className="authorization__input"
                           name="name"
                           type="email"
                    />
                    <span className="authorization__error"></span>
                </label>
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
                <button className="authorization__submit authorization__submit-reg" type="submit">Зарегистрироваться</button>
            </form>
            <span className="authorization__caption">Уже зарегистрированы?
                <Link className="authorization__caption-text" to="/signin"> Войти</Link> </span>
        </section>
    )
}
