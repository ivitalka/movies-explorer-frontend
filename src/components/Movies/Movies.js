import React from 'react';
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(
    { movies, isSavedMovies, setIsSavedPage, isAdded, addToFavorites, removeFromFavorites, isLoading, loadingError, isCheckedHandler, submitSearchFromHandler, setSearchQuery, searchQuery }) {

    React.useEffect(() => {
        setIsSavedPage(isSavedMovies);
    })
    return (
        <>
            <SearchForm
                isCheckedHandler={isCheckedHandler}
                submit={submitSearchFromHandler}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                isSavedMovies={isSavedMovies}
            />
            <section className="movies">
                {isLoading && <Preloader/>}
                {!isLoading && loadingError !== '' && <p className="movies__error">{loadingError}</p>}
                {
                    !isLoading && <MoviesCardList
                        movies={movies}
                        isSavedMovies={isSavedMovies}
                        isAdded={isAdded}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                    />
                }
            </section>
        </>
    )
}

export default Movies;
