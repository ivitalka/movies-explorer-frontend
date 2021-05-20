import { BASE_URL } from '../utils/constants'

export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
})
    .then((res) => res);

export const login = (email, password) => fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
})
    .then((res) => res.json());

export const getProfile = (token) => fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
    .then((res) => res);

export const updateProfile = (name, email, token) => fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name, email}),
})
    .then((res) => res.json());

export const getSavedMovies = (token) => fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
    .then((res) => res);

export const removeSavedMovies = (movieId, token) => fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})
    .then((res) => res.json());

export const addSavedMovies = (data, token) => fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
})
    .then((res) => res.json());
