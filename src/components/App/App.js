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
    const [isLoading, setIsLoading] = useState(false)
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
        setServerError({});
        return mainApi.register(name, email, password)
            .then(() => {
                mainApi.authorize(email, password)
                    .then(() => {
                        setServerError({});
                        setLoggedIn(true);
                        navigate('/movies');
                    })
            })
            .catch((err) => {
                const textError = err === 'Ошибка: 409' ? 'Пользователь с таким E-mail уже сувещстует' :
                    'При регистрации пользователя произошла ошибка';
                setServerError({...serverError, signUp: textError})
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleLogin = (email, password) => {
        setServerError({});
        return mainApi.authorize(email, password)
            .then(() => {
                setServerError({});
                setLoggedIn(true);
                navigate('/movies');
            })
            .catch((err) => {
                const textError = err === 'Ошкибка: 401' ? 'Вы ввели неправильный E-mail или пароль' :
                    'При авторизции произошла ошибка';
                setServerError({...serverError, signIn: textError})
            })
            .finally(() => {
                setIsLoading(false);
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

    const handleClickSignInButton = (e, email, password) => {
        e.preventDefault();

        setIsLoading(true);
        handleLogin(email, password);
    }

    const handleClickSignUpButton = (e, name, email, password) => {
        e.preventDefault();

        setIsLoading(true);
        handleRegister(name, email, password)
    }

    const resetServerErr = () => setServerError({});

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SavedMoviesContext.Provider value={savedMovies}>
                <div className="page">
                    {pathPageWithHeader.includes(location.pathname) && <Header/>}
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/signin" element={
                            <Login
                                resetServerErr={resetServerErr}
                                handleSubmit={handleClickSignInButton}
                                isLoading={isLoading}
                                isLoggin={loggedIn}
                                serverError={serverError.signIn}
                            />
                        }/>
                        <Route path="/signup" element={
                            <Register
                                resetServerErr={resetServerErr}
                                handleSubmit={handleClickSignUpButton}
                                isLoading={isLoading}
                                isLoggin={loggedIn}
                                serverError={serverError.signIn}

                            />
                        }/>
                        <Route path="/movies" element={<Movies handleLikeClick={handleLikeClick}/>}/>
                        <Route path="/saved-movies" element={<SavedMovies handleRemoveCard={handleRemoveCard}/>}/>
                        <Route path="/profile" element={
                            <Profile
                                handleSubmit={handleClickSignInButton}
                                isLoading={isLoading}
                                isLoggin={loggedIn}
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
