import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from "../Navigation/Navigation";
import Authorization from "../Authorization/Authorization.js"

function Header({isLogged, isOpen, menuCalled, onClose}) {

    return (
        <header className="header">
            <Link to="/" className="header__logo-link"/>
            <Navigation
                isLogged = {isLogged}
                isOpen={isOpen}
                menuCalled={menuCalled}
                onClose={onClose}
            />
            <Authorization
                isLogged = {isLogged}
            />
        </header>
    )
}

export default Header;
