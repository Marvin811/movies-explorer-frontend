class MoviesApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getAllMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
        })
            .then(res => this._getResponseData(res));
    }
}

const moviesApi = new MoviesApi({
        baseUrl: 'https://api.nomoreparties.co/',
    }
)
export default moviesApi
