import React from "react";
import './MoviesCardList.css'
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList() {
    return (
        <div className="card-list">
            <div className="card-list__container">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
        </div>
    )
}
