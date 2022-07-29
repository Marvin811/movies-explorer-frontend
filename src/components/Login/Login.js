import React from "react";
import './Login.css';
import Form from "../Form/Form"


export function Login({handleLogin, serverError, isLoading, resetServerError}) {


    return (
        <div className="login">
            <Form
                resetServerError={resetServerError}
                serverError={serverError}
                isLoading={isLoading}
                handleSubmitLogin={handleLogin}
                title={"Рады видеть!"}
                button={"Войти"}
                text={"Ещё не зарегистрированы?"}/>
        </div>
    )
}

