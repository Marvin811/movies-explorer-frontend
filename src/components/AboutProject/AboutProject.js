import './AboutProject.css';

export function AboutProject() {
    return (
        <section className="about-project" id="project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__info">
                <div className="about-project__info-box">
                    <h2 className="about-project__info-box-title">Дипломный проект включал 5 этапов</h2>
                    <p className="about-project__info-box-subtitle">Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__info-box">
                    <h2 className="about-project__info-box-title">На выполнение диплома ушло 5 недель</h2>
                    <p className="about-project__info-box-subtitle">У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__duration">
                <p className="about-project__weeks about-project__weeks_type_short">1 неделя</p>
                <p className="about-project__weeks about-project__weeks_type_long">4 недели</p>
                <p className="about-project__weeks about-project__fullstack">Back-end</p>
                <p className="about-project__weeks about-project__fullstack">Front-end</p>
            </div>
        </section>
    );
}
