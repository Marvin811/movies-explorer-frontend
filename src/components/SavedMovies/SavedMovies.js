import React from "react";
import './SavedMovies.css';
import Navigation from "../Navigation/Navigation";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";

export function SavedMovies(props) {
    const {tumbler, setTumbler} = props;
    return(
        <div>
            <Navigation/>
            <SearchForm
                tumbler={tumbler}
                setTumbler={setTumbler}
            />
            <MoviesCardList/>
        </div>
    )
}
