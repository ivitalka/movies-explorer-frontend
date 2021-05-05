import React from 'react';
import './MoviesCardList.css';
import {initialCards} from '../../utils/constants'
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader"
function MoviesCardList() {
    return (
        <section className="movies">
            {/*<Preloader/>*/}
            <ul className="movies__list">
                {initialCards.map((card) => <MoviesCard card={card}/>)}
            </ul>
            <button className="movies__button">Ещё</button>
        </section>
    )
}

export default MoviesCardList;
