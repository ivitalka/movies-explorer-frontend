import React from 'react';
import "./Profile.css";

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form" action="">
                <div className="profile__wrap">
                    <h3 className="profile__input-title">Имя</h3>
                    <input className="profile__input" type="text" name="name" id="name" value="Vitaly"/>
                </div>
                <div className="profile__wrap">
                    <h3 className="profile__input-title">E-mail</h3>
                    <input className="profile__input" type="email" name="email" id="email" value="mail@mail.ru"/>
                </div>
                <span className="profile__error">Что то пошло не так...</span>
                <button className="profile__button" type="submit">Редактировать</button>
            </form>
            <button className="profile__button profile__button_action_logout" type="button">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;
