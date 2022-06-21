import React from "react";
import Navigation from "../Navigation/Navigation";
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList"
import {More} from "./More/More";
import moviesApi from "../../utils/MoviesApi";

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
