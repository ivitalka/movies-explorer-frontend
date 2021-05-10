import React from 'react';
import { Link } from 'react-router-dom';
import './Authorization.css';

function Authorization({isLogged}) {
    return (
        <div className={`authorization ${isLogged ? "authorization_disabled" : ""}`}>
            <Link to="/signup" className="authorization__link">Регистрация</Link>
            <Link to="/signin" className="authorization__link authorization__link_action_login">Войти</Link>
        </div>
    )
}

export default Authorization;
