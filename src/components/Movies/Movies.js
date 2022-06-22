import React, {useEffect, useState} from "react";
import Navigation from "../Navigation/Navigation";
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList"
import {More} from "./More/More";
import useWindowWidth from "../../hooks/useWindowWidth";
import {filterMovies, filterShortMovies} from '../../utils/searchFilter';
import moviesApi from "../../utils/MoviesApi";
import {
    DESKTOP_WIDTH,
    TABLET_WIDTH,
    MOBILE_WIDTH,
    NUMBER_OF_CARDS_TO_BE_ADDED_ON_DESKTOP,
    NUMBER_OF_CARDS_TO_BE_ADDED_ON_MOBILE,
    NUMBER_OF_CARDS_FOR_DESKTOP,
    NUMBER_OF_CARDS_FOR_TABLET,
    NUMBER_OF_CARDS_FOR_MOBILE,
} from '../../utils/const';

export function Movies({ handleLikeClick }) {
    const windowWidth = useWindowWidth();
    const [movies, setMovies] = useState([]);
    const [cardCount, setCardCount] = useState(0);
    const [responseText, setResponseText] = useState('');
    const [isEnableShortMovies, setIsEnableShortMovies] = useState(JSON.parse(localStorage.getItem('toggleState')) || false);
    const [searchQuery, setSearchQuery] = useState('');
    const handleClickButton = () => {
        const width = cardCount + ((windowWidth >= DESKTOP_WIDTH) ? NUMBER_OF_CARDS_TO_BE_ADDED_ON_DESKTOP : NUMBER_OF_CARDS_TO_BE_ADDED_ON_MOBILE);
        setCardCount(width);
        localStorage.setItem('cardCount', JSON.stringify(width));
    };

    const switchShortMovie = () => {
        if (!isEnableShortMovies && movies) {
            const filtered = filterShortMovies(movies);
            setMovies(filtered || []);
        }

        if (isEnableShortMovies && movies) {
            try {
                const { movies } = JSON.parse(localStorage.reqData);
                setMovies(movies);
            } catch {
                setMovies([]);
            }
        }
        setIsEnableShortMovies((prevState) => !prevState);
    };

    useEffect(() => {
        windowWidth >= DESKTOP_WIDTH
        && setCardCount(NUMBER_OF_CARDS_FOR_DESKTOP);

        windowWidth >= TABLET_WIDTH
        && windowWidth < DESKTOP_WIDTH && setCardCount(NUMBER_OF_CARDS_FOR_TABLET);

        windowWidth >= MOBILE_WIDTH
        && windowWidth < TABLET_WIDTH && setCardCount(NUMBER_OF_CARDS_FOR_MOBILE);
    }, [windowWidth, movies]);

    useEffect(() => {
        const localCardCount = JSON.parse(localStorage.getItem('cardCount'));
        if (localCardCount) {
            setCardCount(localCardCount);
        }
    }, [movies]);

    useEffect(() => {
        if (localStorage.reqData) {
            const {movies, searchQuery} = JSON.parse(localStorage.getItem('reqData'));
            const toggleState = JSON.parse(localStorage.getItem('toggleState'));
            setIsEnableShortMovies(toggleState);
            setSearchQuery(searchQuery);
            (!isEnableShortMovies) ?
                setMovies(movies)
                :
                setMovies(filterShortMovies(movies) || []);
        }
    }, []);

    const handleSetMovies = () => {
        const filteredMovies = filterMovies(JSON.parse(localStorage.getItem('movies')), searchQuery);
        filteredMovies.length === 0 && setResponseText('Ничего не найдено.');
        localStorage.setItem('reqData', JSON.stringify({movies: filteredMovies, searchQuery: searchQuery}));
        localStorage.removeItem('cardCount');
        (!isEnableShortMovies) ?
            setMovies(filteredMovies)
            :
            setMovies(filterShortMovies(filteredMovies) || []);
    };

    const handleSearchButton = (e) => {
        e.preventDefault();

        if (!localStorage.movies) {
            moviesApi.getAllMovies()
                .then((data) => {
                    localStorage.setItem('movies', JSON.stringify(data));
                    handleSetMovies();
                })
                .catch(() => {
                    localStorage.removeItem('movies');
                    setResponseText(`Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.`);
                })

        } else {
            handleSetMovies();
        }
    }

    return (
        <div>
            <Navigation/>
            <SearchForm
                searchQuery={searchQuery}
                handleSearchQuery={(e) => setSearchQuery(e.target.value)}
                handleSearchButton={handleSearchButton}
                isActiveCheckbox={isEnableShortMovies}
                switchShortMovie={switchShortMovie}
            />
            <MoviesCardList movies={movies.slice(0, cardCount)} handleLikeClick={handleLikeClick}/>
            <More handleClickButton={handleClickButton}/>
        </div>

    )
}
