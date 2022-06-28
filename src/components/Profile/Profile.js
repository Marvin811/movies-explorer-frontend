import React, {useContext, useEffect} from "react";
import "./Profile.css";
import Navigation from "../Navigation/Navigation";
import {useInput} from "../../hooks/useInput";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

export function Profile({handleButtonEdit, handleLogout, seccess, isLoading, serverError, resetServerErr}) {
    const currentUser = useContext(CurrentUserContext);

    const name = useInput('', 'name');
    const email = useInput('', 'email');

    useEffect(() => {
        resetServerErr();
    }, []);

    useEffect(() => {
        name.updateValue(currentUser.name);
        email.updateValue(currentUser.email);
    }, [currentUser]);


    const isFormInvalid = (((email.value === currentUser.email) && (name.value === currentUser.name)) || (name.inputInvalid || email.inputInvalid) || isLoading);

    return (
        <>
            <div className="profile">
                <Navigation type="header"/>
                <form className="profile__form" id="profile-form" noValidate>
                    <h1 className="profile__title">Привет, {currentUser.name}</h1>

                    <div className="profile__input-container">
                        <label className="profile__input-container-label">Имя</label>
                        <input id="profile-input-name" type="text" name="name"
                               value={name.value}
                               onChange={evt => name.onChange(evt)}
                               onBlur={evt => name.onBlur(evt)}
                               disabled={isLoading}
                               className="profile__item-input profile__item-input_type_name"/>

                        <span className="authorization__error">{name.isDirty && name.currentError}</span>
                    </div>
                    <div className="profile__input-container">
                        <label className="profile__input-container-label">E-mail</label>
                        <input id="profile-input-email" type="email" name="email"
                               value={email.value}
                               onChange={evt => email.onChange(evt)}
                               onBlur={evt => email.onBlur(evt)}
                               disabled={isLoading}
                               className="profile__item-input"/>

                        <span className="authorization__error">{email.isDirty && email.currentError}</span>
                    </div>
                    <div className="profile__error">
                        {isLoading && <Preloader/>}
                        {(seccess || serverError) && <p className="authorization__error">{serverError}</p>
                        }
                    </div>
                    <div className="profile__link-container">
                        <button className="profile__button"
                                form="profile-form"
                                to="/signin"
                                disabled={isFormInvalid}
                                onClick={evt => handleButtonEdit(evt, name.value, email.value)}
                        >Редактировать
                        </button>
                        <button className="profile__button"
                                type="button"
                                onClick={handleLogout}
                                to="/">Выйти из аккаунта</button>
                    </div>
                </form>
            </div>
        </>
    )
}
