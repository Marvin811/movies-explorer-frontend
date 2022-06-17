import React from "react";
import './NotFoundPage.css';
import {Link} from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__text">Страница не найдена</p>
            <Link className="not-found-page__link" to="/">Назад</Link>
        </div>
    )
}


