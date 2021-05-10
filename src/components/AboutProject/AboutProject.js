import React from 'react'
import "./AboutProject.css";
import Title from "../Title/Title";


function AboutProject() {
    return (
        <section id="about-project" className="about-project">
           <Title titleText="О проекте"/>
            <div className="about-project__container">
                <div className="about-project__wrap">
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__wrap">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__week-container">
                <p className="about-project__week-text about-project__week-text_one">1 неделя</p>
                <p className="about-project__week-text about-project__week-text_four">4 недели</p>
                <p className="about-project__parts">Back-end</p>
                <p className="about-project__parts">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;
