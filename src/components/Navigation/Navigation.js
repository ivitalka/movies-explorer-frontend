import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./Navigation.css";


function Navigation({isLogged ,isOpen, HamburgerMenuCalled, onClose}) {
    const HamburgerMenuCalledHandler = () => {
        HamburgerMenuCalled();
    }
    return (
            <nav className={`navigation ${isLogged ? "" : "navigation_disabled"} `}>
                <button onClick={HamburgerMenuCalledHandler} className="navigation__button_action_hamburger"/>
                <div className={`navigation__container ${isOpen ? "navigation__container_opened" : ""}`}>
                    <button onClick={onClose} className="navigation__button_action_close"/>
                    <ul className="navigation__list">
                        <li className="navigation__list-item navigation__list-item_action_home">
                            <NavLink exact to="/" className="navigation__link" activeClassName="navigation__link_active">Главная</NavLink>
                        </li>
                        <li className="navigation__list-item">
                            <NavLink to="/movies" className ="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
                        </li>
                        <li className="navigation__list-item">
                            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохраненные фильмы</NavLink>
                        </li>
                        <li className="navigation__list-item">
                            <NavLink to="/profile" className="navigation__link" activeClassName="navigation__link_active">Аккаунт <div className="navigation__profile-icon"/></NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
}

export default Navigation;
