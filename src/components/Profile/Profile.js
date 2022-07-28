import React, {useContext, useEffect} from "react";
import "./Profile.css";
import useForm from "../../hooks/useForm";
import validators from "../../utils/validators";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

export function Profile({onUpdateUser, signOut, isLoading, serverError, success, resetServerError}) {
    const currentUser = useContext(CurrentUserContext);

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isValid,
    } = useForm(onSubmit, validators)

    useEffect(() => {
        resetServerError();
    }, []);

    function onSubmit() {
        onUpdateUser({
            name: values.name,
            email: values.email
        })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        resetServerError();
    }, []);

    const isFormInvalid = () => {
        return (values.email !== currentUser.email) || (values.name !== currentUser.name);
    }


    return (
        <div className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <h1 className="profile__title">Привет, {values.name}!</h1>

                <div className="profile__input-container">
                    <label className="profile__input-container-label">Имя</label>
                    <input type="text" name="name"
                           onChange={handleChange}
                           value={values.name || ''}
                           disabled={isLoading}
                           defaultValue={currentUser.name}
                           className="profile__item-input profile__item-input_type_name"/>
                </div>
                <ErrorMessage isValid={isValid} text={errors.name}/>

                <div className="profile__input-container">
                    <label className="profile__input-container-label">E-mail</label>
                    <input type="email" name="email"
                           value={values.email || ''}
                           onChange={handleChange}
                           disabled={isLoading}
                           defaultValue={currentUser.email}
                           className="profile__item-input"/>
                </div>
                <ErrorMessage isValid={isValid} text={errors.email}/>
                <div>
                    {isLoading && <Preloader/>}
                    {(success || serverError) && (
                        <p className={`profile__error-green ${serverError && 'profile__error-red'}`}>{success || serverError}</p>)
                    }
                </div>
                <div className="profile__link-container">
                    <button type="submit" disabled={!isValid || !isFormInvalid()}
                            className="profile__button">Редактировать
                    </button>
                    <button className="profile__button profile__button-exit"
                            type="button"
                            onClick={signOut}
                            to="/">Выйти из аккаунта
                    </button>
                </div>
            </form>
        </div>

    )
}
