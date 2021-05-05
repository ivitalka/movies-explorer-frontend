import React from 'react';
import './MoviesCard.css';

function MoviesCard({card}) {
    return (
        <>
            <li className="movies-card" id={card.movieId}>
                <img className="movies-card__picture" src={card.image} alt={card.nameRu}/>
                <div className="movies-card__container">
                    <h2 className="movies-card__title">{card.nameRu}</h2>
                    <button type="button" className="movies-card__favorites "/>
                </div>
                <p className="movies-card__duration">{card.duration}</p>
            </li>
        </>
    )
}

export default MoviesCard;
