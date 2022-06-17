import './Portfolio.css';
import React from "react";
import arrow from "../../images/arrow.svg";

export function Portfolio() {
    return  (
        <section className="portfolio">
            <div className="portfolio__container">
                <h2 className="portfolio__title">Портфолио</h2>
                <a className="portfolio__item" href="https://marvin811.github.io/how-to-learn/index.html" target="_blank"  rel="noopener noreferrer">
                    <h2 className="portfolio__item-title">Статичный сайт</h2>
                    <img
                        src={arrow}
                        className="portfolio__item-arrow"
                        alt="Изображение стрелки"
                    ></img>
                </a>
                <a className="portfolio__item" href="https://marvin811.github.io/russian-travel/index.html" target="_blank"  rel="noopener noreferrer">
                    <h2 className="portfolio__item-title">Адаптивный сайт</h2>
                    <img
                        src={arrow}
                        className="portfolio__item-arrow"
                        alt="Изображение стрелки"
                    ></img>
                </a>
                <a className="portfolio__item" href="https://marvin.nomoredomains.xyz/sign-in" target="_blank"  rel="noopener noreferrer">
                    <h2 className="portfolio__item-title">Одностраничное приложение</h2>
                    <img
                        src={arrow}
                        className="portfolio__item-arrow"
                        alt="Изображение стрелки"
                    ></img>
                </a>
            </div>
        </section>
    )
}


