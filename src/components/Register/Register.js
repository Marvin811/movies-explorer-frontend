import React, {useEffect} from "react";
import Logo from "../Logo/Logo";
import Preloader from "../Preloader/Preloader";
import {Link} from "react-router-dom";
import {useInput} from '../../hooks/useInput';
import {Navigate} from "react-router";

export function Register({isLoggin, isLoading, handleSubmit, resetServerErr, serverError}) {
    const name = useInput('', 'name');
    const email = useInput('', 'email');
    const password = useInput('', 'password');

    useEffect(() => {
        resetServerErr();
    }, []);

    const isFormInvalid = ((name.inputInvalid || email.inputInvalid || password.inputInvalid) || isLoading);


    return (
        <>
            {isLoggin ? <Navigate to="/movies"/>
                :
                <section className='authorization'>
                    <Logo/>
                    <h1 className="authorization__title">Добро пожаловать!</h1>
                    <form className="authorization__form">
                        <label className="authorization__label">Имя
                            <input className="authorization__input"
                                   name="name"
                                   type="email"
                                   value={name.value}
                                   onChange={evt => name.onChange(evt)}
                                   onBlur={evt => name.onBlur(evt)}
                                   disabled={isLoading}
                            />
                            <span className="authorization__error">{name.isDirty && name.currentError}</span>
                        </label>
                        <label className="authorization__label">E-mail
                            <input className="authorization__input"
                                   name="email"
                                   type="email"
                                   value={email.value}
                                   onChange={evt => email.onChange(evt)}
                                   onBlur={evt => email.onBlur(evt)}
                                   disabled={isLoading}
                            />
                            <span className="authorization__error">{email.isDirty && email.currentError}</span>
                        </label>
                        <label className="authorization__label">Пароль
                            <input className="authorization__input"
                                   name="password"
                                   type="password"
                                   value={password.value}
                                   onChange={evt => password.onChange(evt)}
                                   onBlur={evt => password.onBlur(evt)}
                                   disabled={isLoading}
                            />
                            <span className="authorization__error">{password.isDirty && password.currentError}</span>
                        </label>
                        {serverError && <p className="authorization__error">{serverError}</p>}
                        {isLoading ? <Preloader/>
                            :
                            <button className="authorization__submit authorization__submit-reg"
                                    onClick={(evt) => handleSubmit(evt, name.value, email.value, password.value)}
                                    disabled={isFormInvalid}
                            >
                                Зарегистрироваться</button>
                        }
                    </form>
                    <span className="authorization__caption">Уже зарегистрированы?
                <Link className="authorization__caption-text" to="/signin"> Войти</Link> </span>
                </section>
            }
        </>

    )
}
