export const filterShortMovies = (data) => data.filter((movie) => movie.duration <= 40);

export const filterMovies = (data, value) => data.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(value.trim().toLowerCase());
});
