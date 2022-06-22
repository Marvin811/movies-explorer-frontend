import React, {useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import './App.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Header} from "../Header/Header";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from "../SavedMovies/SavedMovies";
import {Profile} from "../Profile/Profile";
import {NotFoundPage} from "../NotFoundPage/NotFoundPage";
import mainApi from "../../utils/MainApi";
import {SavedMoviesContext} from "../../contexts/SavedMoviesContext";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const location = useLocation();
    const [savedMovies, setSavedMovies] = useState([]);
    const pathPageWithHeader = ['/'];
    const pathPageWithFooter = ['/', '/movies', '/saved-movies'];
    // Все что касается карточек
    const [moviesInputValue, setMoviesInputValue] = React.useState("");


// оправить функцию filterRemovedCard
    const filterRemovedCard = (movie) => {
        setSavedMovies((savedMovies) => savedMovies.filter((item) => +item.movieId !== +movie.id));
    }

    const handleRemoveCard = (movie) => {
        mainApi.removeMovie(movie.movieId)
            .then(() => {
                filterRemovedCard(movie);
            })
            .catch((err) => `Ошибка ${err} при удалении фильма из сохраненных`);
    };

    const handleLikeClick = (movieCard) => {
        const movie = savedMovies.find((item) => +item.movieId === movieCard.id);

        if (movie) {
            mainApi.removeMovie(movie._id)
                .then(() => {
                    filterRemovedCard(movieCard);
                })
                .catch((err) => `Ошибка ${err} при удалениии фильма из сохраненных`);
        } else {
            mainApi.createMovie(movieCard)
                .then((result) => setSavedMovies([...savedMovies, result]))
                .catch((err) => `Ошибка ${err} при добавлении фильма в сохраненные`);
        }
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SavedMoviesContext.Provider value={savedMovies}>
                <div className="page">
                    {pathPageWithHeader.includes(location.pathname) && <Header/>}
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/signin" element={< Login/>}/>
                        <Route path="/signup" element={<Register/>}/>
                        <Route path="/movies" element=<Movies handleLikeClick={handleLikeClick} /> />
                        <Route path="/saved-movies" element={<SavedMovies/>} handleRemoveCard={handleRemoveCard}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/*" element={< NotFoundPage/>}/>
                    </Routes>


                    {pathPageWithFooter.includes(location.pathname) && <Footer/>}
                </div>
            </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;
