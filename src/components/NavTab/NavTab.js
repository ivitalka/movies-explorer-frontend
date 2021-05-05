import React from 'react';
import { Link } from "react-scroll";
import './NavTab.css';

function NavTab() {
    return (
        <nav className="nav-tab">
            <Link to="about-project" smooth={true} className="nav-tab__link">О проекте</Link>
            <Link to="techs" smooth={true} className="nav-tab__link">Технологии</Link>
            <Link to="about-me" smooth={true} className="nav-tab__link">Студент</Link>
        </nav>
    )
}

export default NavTab;
