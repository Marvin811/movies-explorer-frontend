import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import './App.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {SavedMoviesContext} from "../../contexts/SavedMoviesContext";
import {Header} from "../Header/Header";
import {Main} from "../Main/Main";
import {Footer} from "../Footer/Footer";
import {Login} from "../Login/Login";
import {Register} from "../Register/Register";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from "../SavedMovies/SavedMovies";
import {Profile} from "../Profile/Profile";
import {NotFoundPage} from "../NotFoundPage/NotFoundPage";
import {useNavigate} from 'react-router';
import ProtectedRoutes from "../ProtectedRoute/ProtectedRoutes";
import mainApi from "../../utils/MainApi";

import * as auth from "../../utils/MainApiAuth";

function App() {

    let location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState({})
    const [successUpdate, setSuccessUpdate] = useState('');
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        tokenCheck()
    }, [])

    useEffect(() => {
        const locations = ["/signup", "/signin"];
        if (loggedIn && (locations.includes(location.pathname))) {
            navigate("/");
        } else navigate(location.pathname);
    }, [loggedIn, location.pathname, navigate])


    useEffect(() => {
        if (loggedIn === true && localStorage.getItem("token")) {
            mainApi.getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn, userData]);

    useEffect(() => {
        if (loggedIn) {
            mainApi.getSavedMovies()
                .then((movies) => setSavedMovies(movies))
                .catch((err) => `Ошибка ${err} при получении сохраненных фильмов`);
        }
    }, [loggedIn]);

    const filterRemovedCard = (movie) => {
        setSavedMovies((savedMovies) => savedMovies.filter((item) => +item.movieId !== +movie.id));
    };

    function handleCardDelete(movie) {
        mainApi.deleteCard(movie.movieId)
            .then(() => {
                filterRemovedCard(movie);
            })
            .catch((err) => `Ошибка ${err} при удалениии фильма из сохраненных`);
    }

    function handleCardAdd(movieCard) {
        const movie = savedMovies.find((item) => +item.movieId === movieCard.id);

        if (movie) {
            mainApi.deleteCard(movie._id)
                .then(() => {
                    filterRemovedCard(movieCard);
                })
                .catch((err) => `Ошибка ${err} при удалениии фильма из сохраненных`);
        } else {
            mainApi.addSavedMovie(movieCard)
                .then((result) => setSavedMovies([...savedMovies, result]))
                .catch((err) => `Ошибка ${err} при добавлении фильма в сохраненные`);
        }
    }

    function handleUpdateUser(userData) {
        setIsLoading(true);
        setServerError({});
        return mainApi
            .changeUserInfo(userData)
            .then((result) => {
                setCurrentUser(result);
                setSuccessUpdate('Данные успешно обновлены!');
                setTimeout(() => setServerError(''), 2000);
                setServerError({});
            })
            .catch((err) => {
                const textError = err === 'Ошибка: 409' ?
                    'Пользователь с таким E-mail уже существует' :
                    'При обновлении профиля произошла ошибка.';
                setServerError({...serverError, profile: textError});
            })
            .finally(() => setIsLoading(false));
    }


    function handleRegister(name, email, password) {
        setServerError({});
        setIsLoading(true);
        return auth
            .register(name, email, password)
            .then(() => {
                handleLogin(email, password)
                setServerError({});
                setUserData({name: name, email: email});
                setLoggedIn(true);
                navigate("/movies");
            })
            .catch((err) => {
                const textError = err === 'Ошибка: 409' ?
                    'При регистрации пользователя произошла ошибка'
                    :
                    'Пользователь с таким email уже существует';
                setServerError({...serverError, signUp: textError});
            })
            .finally(() => setIsLoading(false));
    }

    function handleLogin(email, password) {
        setServerError({});
        setIsLoading(true);
        return auth.authorize(email, password).then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                setUserData({name: data.name, email: data.email});
                setLoggedIn(true);
                setServerError({});
                navigate("/movies");
            }
        })
            .catch((err) => {
                const textError = err === 'Ошибка: 401' ?
                    'При авторизации произошла ошибка'
                    :
                    'Вы ввели неправильный логин или пароль';
                setServerError({...serverError, login: textError});
            })
            .finally(() => setIsLoading(false));
    }

    function tokenCheck() {
        const token = localStorage.getItem("token");
        if (token) {
            auth.getContent(token).then((data) => {
                if (data) {
                    setUserData({name: data.name, email: data.email});
                    setLoggedIn(true);
                    navigate(location.pathname);
                }
            });
        }
    }

    const resetServerErr = () => setServerError({});

    function handleSignOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem('movies');
        localStorage.removeItem('reqData');
        localStorage.removeItem('toggleState');
        navigate("/");
    }

    const isHeaderVisible = () => {
        const locations = ["/", "/saved-movies", "/movies", "/profile"];
        return locations.includes(location.pathname);
    };

    const isFooterVisible = () => {
        const locations = ["/", "/saved-movies", "/movies"];
        return locations.includes(location.pathname);
    };

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <SavedMoviesContext.Provider value={savedMovies}>
                    {isHeaderVisible() && <Header loggedIn={loggedIn}/>}
                    <Routes>
                        <Route path="/" element={<Main/>}></Route>
                        <Route path="/signin"
                               element={<Login
                                   resetServerError={resetServerErr}
                                   serverError={serverError.login} isLoading={isLoading}
                                   handleLogin={handleLogin} loggedIn={loggedIn}/>}></Route>
                        <Route path="/signup"
                               element={<Register
                                   resetServerError={resetServerErr}
                                   serverError={serverError.signUp} isLoading={isLoading}
                                   handleRegister={handleRegister} loggedIn={loggedIn}/>}></Route>
                        <Route
                            path="/movies"
                            element={
                                <ProtectedRoutes loggedIn={loggedIn}>
                                    <Movies
                                        handleLikeClick={handleCardAdd}
                                    />
                                </ProtectedRoutes>
                            }
                        />
                        <Route
                            path="/saved-movies"
                            element={
                                <ProtectedRoutes loggedIn={loggedIn}>
                                    <SavedMovies
                                        handleRemoveButton={handleCardDelete}
                                    />
                                </ProtectedRoutes>
                            }
                        />
                        <Route exact path="/profile" element={<ProtectedRoutes loggedIn={loggedIn}>
                            <Profile signOut={handleSignOut}
                                     serverError={serverError.profile}
                                     success={successUpdate}
                                     resetServerError={resetServerErr}
                                     onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
                        </ProtectedRoutes>}></Route>

                        <Route path="/*" element={< NotFoundPage/>}></Route>
                    </Routes>

                    {isFooterVisible() && <Footer/>}
                </SavedMoviesContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    )
        ;
}

export default App;
