import React from "react";
import './MoviesCardList.css'
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList({movies, ...props}) {
    return (
        <div className="card-list">
            <div className="card-list__container">
                {movies.map(movie => {
                    return <MoviesCard movieData={movie} key={movie.id} {...props}/>
                })}
            </div>
        </div>
    )
}
