import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isCheckedHandler }) {
    return (
        <label className="filter" htmlFor="checkbox">
            <input onClick={() => isCheckedHandler()} id="checkbox" className="filter__checkbox" type="checkbox"/>
            <span className="filter__pseudo-item"/>
            <p className="filter__text">Короткометражки</p>
        </label>
    )
}

export default FilterCheckbox;
