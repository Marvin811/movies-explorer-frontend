import React from "react";
import './SavedMovies.css';
import Navigation from "../Navigation/Navigation";
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";

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
