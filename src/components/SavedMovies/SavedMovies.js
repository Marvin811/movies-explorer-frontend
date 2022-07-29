import React, {useContext, useEffect, useState} from "react";
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";
import {SavedMoviesContext} from "../../contexts/SavedMoviesContext";
import {filterMovies, filterShortMovies} from '../../utils/searchFilter';


export function SavedMovies({handleRemoveButton}) {
    const savedMovies = useContext(SavedMoviesContext);
    const [dataMovies, setDataMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [responseText, setResponseText] = useState("");
    const [isSwitchShortMovie, setIsSwitchShortMovie] = useState(false);

    const movies = () => savedMovies.map((movie) => ({
        id: movie.movieId,
        image: {
            url: movie.image,
        },
        nameRU: movie.nameRU,
        duration: movie.duration,
        trailerLink: movie.trailerLink,
        movieId: movie._id,
    }));

    const switchShortMovie = () => {
        if (!isSwitchShortMovie && dataMovies) {
            const filtered = filterShortMovies(dataMovies);
            setDataMovies(filtered);
        }

        if (isSwitchShortMovie && dataMovies) {
            const data = movies(savedMovies);
            setDataMovies(data.reverse());
        }

        setIsSwitchShortMovie((prevState) => !prevState);
    };

    useEffect(() => {
        const data = movies();
        setDataMovies(data.reverse());
    }, [savedMovies]);

    const handleSearchButton = (e) => {
        e.preventDefault();

        const data = movies();
        const filteredMovies = filterMovies(data, searchQuery, isSwitchShortMovie);
        setResponseText(filteredMovies.length === 0 && 'Ничего не найдено.');
        setDataMovies(filteredMovies.reverse());
    };

    return (
        <div>
            <SearchForm

                searchQuery={searchQuery}
                handleSearchQuery={(e) => setSearchQuery((e.target.value))}
                switchShortMovie={switchShortMovie}
                handleSearchButton={handleSearchButton}
            />
            {responseText ?
                (<span className="movies__not-found">{responseText}</span>)
                : (<MoviesCardList
                    handleRemoveButton={handleRemoveButton}
                    isSaved
                    movies={dataMovies}/>)
            }

        </div>
    )
}
