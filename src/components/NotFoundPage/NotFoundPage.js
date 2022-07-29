import React from "react";
import './NotFoundPage.css';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router';

export function NotFoundPage() {
    const navigate = useNavigate();

    function goBack() {
        return navigate(-1);
    }

    return (
        <div className="not-found-page">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__text">Страница не найдена</p>
            <button className="not-found-page__link" onClick={goBack}>Назад</button>
        </div>
    )
}


