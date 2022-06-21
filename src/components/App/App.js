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


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const location = useLocation();
    const [savedMovies, setSavedMovies] = useState([]);
    const pathPageWithHeader = ['/'];
    const pathPageWithFooter = ['/', '/movies', '/saved-movies'];
    // Все что касается карточек
    const [moviesInputValue, setMoviesInputValue] = React.useState("");



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

    const handleLikeClick = (moviesCard) => {
        const movie = savedMovies.find((item) => +item.movieId === moviesCard.id)
        if (movie) {
            mainApi.removeMovie(movie.id)
                .then(() => {
                    filterRemovedCard(moviesCard);
                })
                .catch((err) => `Ошибка ${err} при удалениии фильма из сохраненных`)
        } else {
            mainApi.createMovie(moviesCard)
                .then((result) => setSavedMovies([...savedMovies, result]))
                .catch((err) => `Ошибка ${err} при добавлении фильма в сохраненные`)
        }
    };
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                {pathPageWithHeader.includes(location.pathname) && <Header/>}
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/signin" element={< Login/>}/>
                    <Route path="/signup" element={<Register/>}/>
                    <Route path="/movies" element={<Movies/>}/>
                    <Route path="/saved-movies" element={<SavedMovies/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/*" element={< NotFoundPage/>}/>
                </Routes>


                {pathPageWithFooter.includes(location.pathname) && <Footer/>}
            </div>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;
