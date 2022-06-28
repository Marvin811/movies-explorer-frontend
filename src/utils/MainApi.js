export const BASE_URL = "https://api.movies.mav1.nomoredomains.xyz";
export const FILM_URL = "https://api.nomoreparties.co";

async function getResponseData(result) {
    const res = await result.json();
    if (result.ok) {
        return res;
    } else {
        return Promise.reject(res);
    }
}

export const getUserInfo = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return getResponseData(response);
        })
        .then((res) => {
            if (res) {
                return res;
            }
        });
};


export const updateUserInfo = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
        })
    })
        .then((response) => {
            return getResponseData(response);
        })
        .then((res) => {
            if (res) {
                return res;
            }
        });
};

export const createMovie = (movieData) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
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
        .then((response) => {
            return getResponseData(response);
        })
        .then((data) => {
            return data;
        });
};

export const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        credentials: "include",
        headers: {
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return getResponseData(response);
        })
        .then((data) => {
            return data;
        });
};

export const removeMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return getResponseData(response);
        })
        .then((data) => {
            return data;
        });
};

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    })
        .then((response) => {
            return getResponseData(response);
        })
        .then((data) => {
            return data;
        });
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'https://api.movies.mav1.nomoredomains.xyz',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then((response) => {
            return getResponseData(response);
        })
        .then((data) => {
            return data
        })
}
