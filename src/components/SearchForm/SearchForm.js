import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
    return (
        <section className="search">
            <form name="search-form" id="search-form" className="search__form">
                <div className="search__container">
                    <input name="search-input" id="search-input" required className="search__input" placeholder="Фильм"/>
                    <button className="search__button" type="submit">Найти</button>
                </div>
                <FilterCheckbox/>
            </form>
        </section>
    )
}

export default SearchForm;
