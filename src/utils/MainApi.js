class MainApi {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _getResponseDate(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserInfo = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => this._getResponseDate(res));
    }

    updateUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
            })
        })
            .then(res => this._getResponseDate(res));
    }

    createMovie(movieData) {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
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
                image: 'https://api.nomoreparties.co' + movieData.image.url,
                thumbnail: movieData.thumbnail,
                movieId: movieData.id.toString(),
            })
        })
            .then(res => this._getResponseDate(res));
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            credentials: "include",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => this._getResponseDate(res));
    }

    removeMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => this._getResponseDate(res));
    }

    register(name, email, password)  {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
            .then(res => this._getResponseDate(res));
    }
    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
            .then(res => this._getResponseDate(res));
    }

const mainApi = new MainApi({
    baseUrl: 'https://api.movies.mav1.nomoredomains.xyz'
})

export default mainApi;
