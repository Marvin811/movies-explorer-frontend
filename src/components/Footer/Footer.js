import "./Footer.css";
import React from "react";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__container">
                <p className="footer__year">&copy;{year}</p>
                <ul className="footer__links">
                    <li className="footer__item">
                        <a className="footer__link" href="https://praktikum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://github.com/Marvin811" target="_blank" rel="noopener noreferrer">Github</a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://t.me/egorlukin" target="_blank" rel="noopener noreferrer">Telegram</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
