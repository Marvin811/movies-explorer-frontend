import React, {useEffect, useState} from "react";
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
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({});
    const [savedMovies, setSavedMovies] = useState([]);
    const [serverError, setServerError] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [successUpdate, setSuccessUpdate] = useState('');
    const pathPageWithHeader = ['/'];
    const pathPageWithFooter = ['/', '/movies', '/saved-movies'];
    // Все что касается карточек
    const [moviesInputValue, setMoviesInputValue] = React.useState("");


    useEffect(() => {
        if (loggedIn) {
            mainApi.getSavedMovies()
                .then((movies) => setSavedMovies(movies))
                .catch((err) => `Ошибка ${err} при получении сохраненных фильмов`);
        }
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            mainApi.getUserInfo()
                .then((user) => setCurrentUser(user))
                .catch((err) => `Ошибка ${err} при получении данных пользователя`);
        }
    }, [loggedIn]);

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
        mainApi.register(name, email, password)
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
        mainApi.authorize(email, password)
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

    const handleUpdateUser = (evt, name, email) => {
        evt.preventDefault();
        setServerError({});
        mainApi.updateUserInfo(name, email)
            .then((result) => {
                setSuccessUpdate('Данные успешно обновлены!');
                setTimeout(() => setServerError(''), 2000);
                setServerError({});
                setCurrentUser(result);

            })
            .catch((err) => {
                const textError = err === 'Ошибка: 409' ?
                    'Пользователь с таким E-mail уже существует' :
                    'При обновлении профиля произошла ошибка.';
                setServerError({...serverError, profile: textError});
            })
            .finally(() => setIsLoading(false));
    };

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

    const handleLogout = () => {
        mainApi.signout()
            .then(() => {
                localStorage.removeItem('movies');
                localStorage.removeItem('reqData');
                localStorage.removeItem('toggleState');
                setLoggedIn(false);
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SavedMoviesContext.Provider value={savedMovies}>
                <div className="page">
                    {pathPageWithHeader.includes(location.pathname) && <Header/>}
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/movies" element={
                            <ProtectedRoute isLoggin={loggedIn}>
                                <Movies handleLikeClick={handleLikeClick}/>
                            </ProtectedRoute>}
                        />
                        <Route path="/saved-movies" element={
                            <ProtectedRoute isLoggin={loggedIn}>
                                <SavedMovies handleRemoveCard={handleRemoveCard}/>
                            </ProtectedRoute>}/>
                        <Route path="/profile" element={
                            <ProtectedRoute isLoggin={loggedIn}>
                                <Profile
                                    handleButtonEdit={handleUpdateUser}
                                    handleLogout={handleLogout}
                                    isLoading={isLoading}
                                    serverError={serverError.profile}
                                    success={successUpdate}
                                    resetServerErr={resetServerErr}
                                />
                            </ProtectedRoute>}/>
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
