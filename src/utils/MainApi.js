import {BASE_URL} from "./const";
import {FILM_URL} from "./const";

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
};

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',

    })
        .then(checkResponse);
};


export const updateUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
        })
    })
        .then(checkResponse);
};

export const createMovie = (movieData) => {
    return fetch(`${BASE_URL}/movies`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country: movieData.country,
            director: movieData.director,
            duration: movieData.duration,
            year: movieData.year,
            description: movieData.description,
            trailerLink: movieData.trailerLink,
            nameRU: movieData.nameRU,
            nameEN: movieData.nameEN || ' ',
            image: `${FILM_URL + movieData.image.url}`,
            thumbnail: movieData.thumbnail,
            movieId: movieData.id.toString(),
        }),
    })
        .then(checkResponse);
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        credentials: 'include',
        method: 'GET',
    })
        .then(checkResponse);
};

export const removeMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse);
};
