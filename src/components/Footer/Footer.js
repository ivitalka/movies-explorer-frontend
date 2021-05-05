import React from 'react'
import "./Footer.css";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">
                <div className="footer__wrap">
                    <Link to={{pathname:"https://praktikum.yandex.ru"}} target="_blank" className="footer__link" >Яндекс.Практикум</Link>
                    <Link to={{pathname:"https://github.com/ivitalka"}} target="_blank" className="footer__link" >Github</Link>
                    <Link to={{pathname:"https://vk.com/id10754280"}} target="_blank" className="footer__link" >Вконтакте</Link>
                </div>
                <p className="footer__copyright">&copy;2021</p>
            </div>
        </footer>
    )
}

export default Footer;
