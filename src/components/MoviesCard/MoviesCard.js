import React from 'react';
import './MoviesCard.css';
import { durationTimeFormatter } from '../../utils/helpers'
import {Link} from "react-router-dom";

function MoviesCard({ card, isSavedMovies, isAdded, addToFavorites, removeFromFavorites }) {

    const addedMovies = isAdded(card);

    return (
        <>
            <li className="movies-card" id={card.movieId}>
                <Link to={{pathname:card.trailer}} target="_blank" className="movies-card__link">
                    <img className="movies-card__picture" src={card.image} alt={card.nameRU}/>
                </Link>
                <div className="movies-card__container">
                    <h2 className="movies-card__title">{card.nameRU}</h2>
                    {isSavedMovies
                        ? <button onClick={() => removeFromFavorites(card)} type="button" className="movies-card__favorites movies-card__favorites_remove"/>
                        : <button onClick={() => {
                            addedMovies
                            ? removeFromFavorites(card)
                            : addToFavorites(card)
                        }} type="button"
                                  className={`movies-card__favorites ${addedMovies ? "movies-card__favorites_active" : ""}`}/>
                    }
                </div>
                <p className="movies-card__duration">{ durationTimeFormatter(card.duration) }</p>
            </li>
        </>
    )
}

export default MoviesCard;
