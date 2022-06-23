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
import {useNavigate} from 'react-router';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [serverError, setServerError] = useState({});
    const [blockInput, setBlockInput] = useState(false)
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

    const handleRegister = (name, email, password) => {
        setBlockInput(true);
        return mainApi.register(name, email, password)
            .then(() => {
                mainApi.authorize(email, password)
                    .then(() => {
                        navigate('/movies')
                    })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setBlockInput(false);
            });
    }

    const handleLogin = (email, password) => {
        return mainApi.authorize(email, password)
            .then(() => {
                setLoggedIn(true);
                navigate('/movies');
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => {
                setBlockInput(false)
            });
    };

    const handleUpdateUser = (name, email) => {
        mainApi.updateUserInfo(name, email)
            .then((response) => {
                setCurrentUser(response);
            })
            .catch((err) =>
            console.log(err))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SavedMoviesContext.Provider value={savedMovies}>
                <div className="page">
                    {pathPageWithHeader.includes(location.pathname) && <Header/>}
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/signin" element={< Login/>}/>
                        <Route path="/signup" element={<Register/>}/>
                        <Route path="/movies" element={<Movies handleLikeClick={handleLikeClick}/>}/>
                        <Route path="/saved-movies" element={<SavedMovies handleRemoveCard={handleRemoveCard}/>}/>
                        <Route path="/profile" element={
                            <Profile
                                isLoading={isLoading}
                                handleLogin={handleLogin}
                            />
                        }/>
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
