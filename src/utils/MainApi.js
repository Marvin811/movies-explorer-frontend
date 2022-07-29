class MainApi {
    constructor({address}) {
        this._address = address;
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getSavedMovies() {
        return fetch(this._address + "/movies", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
        })
            .then(this._handleResponse);
    }

    addSavedMovie(movieData) {
        return fetch(this._address + "/movies", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                country: movieData.country,
                director: movieData.director,
                duration: movieData.duration,
                year: movieData.year,
                description: movieData.description,
                trailerLink: movieData.trailerLink || 'https://movies-explorer.mavi.nomoreparties.sbs/404',
                nameRU: movieData.nameRU,
                nameEN: movieData.nameEN || ' ',
                image: 'https://api.nomoreparties.co' + movieData.image.url,
                thumbnail: 'https://api.nomoreparties.co' + movieData.image.formats.thumbnail.url,
                movieId: movieData.id.toString(),
            }),
        })
            .then(this._handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        })
            .then(this._handleResponse);
    }

    changeUserInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            })
        })
            .then(this._handleResponse);

    }

    deleteCard(movieID) {
        return fetch(`${this._address}/movies/${movieID}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
        })
            .then(this._handleResponse);
    }


}


const mainApi = new MainApi({
    address: 'https://api.movies.mav1.nomoredomains.xyz',
});

export default mainApi
