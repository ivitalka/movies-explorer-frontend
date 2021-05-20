import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({ isCheckedHandler, submit, setSearchQuery, searchQuery, isSavedMovies }) {
    const [queryDirty, setQueryDirty] = React.useState(false);
    const [queryError, setQueryError] = React.useState('Введите ключевое слово');

    const [searchFormDisabled, setSearchFormDisabled] = React.useState(false);

    const queryChangeHandler = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value) {
            setQueryError('Введите ключевое слово');
        } else {
            setQueryError('')
        }
    }

    const blurHandler = () => setQueryDirty(true)

    return (
        <section className="search">
            <form onSubmit={(e) => submit(e, isSavedMovies, setSearchFormDisabled)} name="search-form" id="search-form" className="search__form">
                <div className="search__container">
                    <input disabled={searchFormDisabled} onChange={(e) => queryChangeHandler(e)} onBlur={() => blurHandler()} value={searchQuery} name="search-input" id="search-input" required className="search__input" placeholder="Фильм"/>
                    {(queryDirty && queryError) && <span className="search__input-error">{queryError}</span>}
                    <button disabled={searchFormDisabled} className="search__button" type="submit">Найти</button>
                </div>
                <FilterCheckbox isCheckedHandler={isCheckedHandler}/>
            </form>
        </section>
    )
}

export default SearchForm;
