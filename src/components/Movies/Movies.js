import React from "react";
import './Movies.css';
import Navigation from "../Navigation/Navigation";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList"
import {More} from "../More/More";

export function Movies(props) {
    const {tumbler, setTumbler} = props;
    return (
        <div>
            <Navigation/>
            <SearchForm
                tumbler={tumbler}
                setTumbler={setTumbler}
            />
            <MoviesCardList/>
            <More />
        </div>

    )
}
