class MoviesApi {
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

    getAllMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`), {
            method: "GET",
        }
            .then(res => this._getResponseDate(res));
    }
}

const moviesApi = new MoviesApi({
        baseUrl: 'https://api.nomoreparties.co/',
    }
)
export default moviesApi
