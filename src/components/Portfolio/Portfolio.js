import React from 'react'
import "./Portfolio.css";
import {Link} from "react-router-dom";

function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <Link to={{pathname:"https://ivitalka.github.io/how-to-learn/"}} target="_blank" className="portfolio__link">Статичный сайт</Link>
            <Link to={{pathname:"https://ivitalka.github.io/russian-travel/"}} target="_blank" className="portfolio__link">Адаптивный сайт</Link>
            <Link to={{pathname:"http://ivitalka-mesto.nomoredomains.icu/"}} target="_blank" className="portfolio__link">Одностраничное приложение</Link>
        </div>
    )
}

export default Portfolio;
