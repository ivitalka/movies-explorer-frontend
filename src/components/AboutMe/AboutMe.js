import React from 'react'
import "./AboutMe.css";
import Title from "../Title/Title";
import {Link} from "react-router-dom";
import student from "../../images/student.jpg"
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
    return (
        <section id="about-me" className="about-me">
            <Title titleText="Студент"/>
            <div className="student">
                <img src={`${student}`} alt="" className="student__photo"/>
                <div className="student__wrap">
                    <h3 className="student__name">Виталий</h3>
                    <h4 className="student__about">Фронтенд-разработчик, 29 лет</h4>
                    <p className="student__about-text">
                        Я родился и проживаю в городе Красноярск. Учился в сфу на геологическом факультете.
                        Последние 5 лет работаю удаленно. Увлекаюсь катанием на велосипеде летом и на сноуборде в зимнее время
                        </p>
                    <div className="student__link-wrap">
                        <Link to={{pathname:"https://vk.com/id10754280"}} target="_blank" className="student__link">Вконтакте</Link>
                        <Link to={{pathname:"https://github.com/ivitalka"}} target="_blank" className="student__link">Github</Link>
                    </div>
                </div>
            </div>
            <Portfolio/>
        </section>
    )
}

export default AboutMe;
