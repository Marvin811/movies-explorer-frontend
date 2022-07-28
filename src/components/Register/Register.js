import React from "react";
import './Register.css';
import Form from "../Form/Form"

export function Register({handleRegister, serverError, resetServerError, isLoading}) {

    return (
        <div className="register">
            <Form
                resetServerError={resetServerError}
                serverError={serverError}
                isLoading={isLoading}
                handleSubmitRegister={handleRegister}
                title={"Добро пожаловать!"}
                button={"Зарегистрироваться"}
                text={"Уже зарегистрированы?"}
            />
        </div>
    )
}

