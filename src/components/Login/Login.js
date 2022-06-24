import './Login.css';
import React, {useEffect} from "react";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";
import {Link} from "react-router-dom";
import {useInput} from "../../hooks/useInput";
import {Navigate} from "react-router";

export function Login({isLoggin, isLoading, handleSubmit, resetServerErr, serverError}) {
    const email = useInput('', 'email');
    const password = useInput('', 'password');

    useEffect(() => {
        resetServerErr();
    }, [])

    const isFormInvalid = ((email.inputInvalid || password.inputInvalid) || isLoading)

    return (
        <>
            {isLoggin ? <Navigate to="/movies"/>
                :
                <section className='authorization'>
                    <Logo/>
                    <h1 className="authorization__title">Рады видеть!</h1>
                    <form className="authorization__form">
                        <label className="authorization__label">E-mail
                            <input className="authorization__input"
                                   name="email"
                                   type="email"
                                   value={email.value}
                                   onBlur={evt => email.onBlur(evt)}
                                   onChange={evt => email.onChange(evt)}
                                   disabled={isLoading}
                            />
                            <span className="authorization__error">{email.isDirty && email.currentError}</span>
                        </label>
                        <label className="authorization__label">Пароль
                            <input className="authorization__input"
                                   name="password"
                                   type="password"
                                   value={password.value}
                                   onBlur={evt => password.onBlur(evt)}
                                   onChange={evt => password.onChange(evt)}
                                   disabled={isLoading}
                            />
                            <span className="authorization__error">{password.isDirty && password.currentError}</span>
                        </label>
                        {serverError && <p className="authorization__error">{serverError}</p>}
                        {isLoading ? <Preloader/>
                            :
                            <button className="authorization__submit"
                                    onClick={(evt) => handleSubmit(evt, email.value, password.value)}
                                    disabled={isFormInvalid}
                            >
                                Войти</button>
                        }

                    </form>
                    <span className="authorization__caption">Еще не зарегистрированы?
                <Link className="authorization__caption-text" to="/signup"> Регистрация</Link> </span>
                </section>

            }
        </>

    )

}

