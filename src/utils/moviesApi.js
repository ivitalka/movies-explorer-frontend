const BASE_URL = `https://api.nomoreparties.co/beatfilm-movies`

export const getAllMovies = () => fetch(`${BASE_URL}`, {
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((res) => res.json());
