import './AboutProject.css';
import React from "react";

export function AboutProject() {
    return (
        <section className="about-project" id="project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__texts">
                <div className="about-project__text-column">
                    <h3 className="about-project__text-title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__text-column">
                    <h3 className="about-project__text-title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__progress">
                <div className="about-project__progress-back">
                    <div className="about-project__progress-text about-project__progress-text_color_back">
                        1 неделя
                    </div>
                    <p className="about-project__progress-caption">Back-end</p>
                </div>
                <div className="about-project__progress-front">
                    <div className="about-project__progress-text">4 недели</div>
                    <p className="about-project__progress-caption">Front-end</p>
                </div>
            </div>
        </section>
    );
}
