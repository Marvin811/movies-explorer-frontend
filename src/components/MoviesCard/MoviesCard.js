import React from "react";
import './MoviesCard.css'
import card from "../../images/MoviePic.png"
import { useLocation } from "react-router-dom";

export function MoviesCard({ movieData }) {
    let location = useLocation();
    const isSaved = location.pathname === "/saved-movies";

    const headerThemeClassName = `${isSaved ? "card__button card__button_type_delete" : " card__button"}`;

    function convertMinutes(time){
        const hours = Math.trunc(time/60);
        const minutes = time % 60;
        return { hours, minutes}
    }

    const durationData = convertMinutes(card.duration)

    return (
        <div className="card">
            <a href={movieData.trailerLink} target="_blank" rel='noopener noreferrer'>
            <img className="card__pic" src={`https://api.nomoreparties.co/${movieData.image.url}`} alt="Постер 33 слова о дизайне"/>
            </a>

            <div className="card__text-container">
                <p className="card__text">{movieData.nameRU}</p>
                <div className="card__button-container">
                    <button className={headerThemeClassName} />
                </div>
            </div>
            <p className="card__time">{`${durationData.hours}ч${durationData.minutes}м`}</p>
        </div>
    )
}
