import React, {useContext} from "react";
import { SavedMoviesContext } from "../../../contexts/SavedMoviesContext";
import {calcDuration} from "../../../utils/calcDuration";
import {useLocation} from "react-router-dom";
import './MoviesCard.css'

export function MoviesCard({movieData, handleLikeClick, handleRemoveButton}) {
    // let location = useLocation();
    // const isSaved = location.pathname === "/saved-movies";
    //
    // const headerThemeClassName = `${isSaved ? "card__button card__button_type_delete" : " card__button"}`;
    //const isTouchDevice = 'ontouchstart' in window;
    const savedMovies = useContext(SavedMoviesContext);
    const isLiked = savedMovies.find(i => +i.movieId === movieData.id);
    const location = useLocation().pathname;

    return (
        <div className="card">
            <a href={movieData.trailerLink} target="_blank" rel='noopener noreferrer'>
                <img className="card__pic" src={`https://api.nomoreparties.co/${movieData.image.url}`}
                     alt="Постер {33 слова о дизайне}"/>
            </a>
            <div className="card__text-container">
                <p className="card__text">{movieData.nameRU}</p>
                <div className="card__button-container">
                    {location === '/movies' ?
                            <button className={
                                isLiked ?
                                    'card__button card__button_type_saved'
                                    :
                                    'card__button'
                            }
                                    type='button' onClick={() => handleLikeClick(movieData)}></button>
                            :
                            <button className='card__button card__button_type_delete'
                                    type='button' onClick={() => handleRemoveButton(movieData)}></button>
                    }
                </div>
            </div>
            <p className="card__time">{calcDuration(movieData.duration)}</p>
        </div>
    )
}

