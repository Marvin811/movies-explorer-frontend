import './AboutMe.css';
import photo from '../../images/photo.png';

export function AboutMe() {
    return (
        <section className="about-me" id='student'>
            <h2 className="about-me__title">Студент</h2>
            <article className="about-me__container">
                <div className="about-me__info">
                    <div className="about-me__info-box">
                        <h3 className="about-me__info-title">Егор</h3>
                        <p className="about-me__info-subtitle">Фронтенд-разработчик, 25 лет</p>
                        <p className="about-me__info-text">Я родился и живу в Калужской области, закончил факультет
                            экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл
                            курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    </div>
                    <ul className="about-me__contacts">
                        <li className="about-me__contact">
                            <a className="about-me__link" href="https://t.me/egorlukin" target="_blank">Telegram</a>
                        </li>
                        <li className="about-me__contact">
                            <a className="about-me__link" href="https://github.com/Marvin811" target="_blank">Github</a>
                        </li>
                    </ul>
                </div>
                <div className="about-me__photo-box">
                    <img className="about-me__photo" src={photo} alt="Фото студента"/>
                </div>
            </article>
        </section>
    )
}


