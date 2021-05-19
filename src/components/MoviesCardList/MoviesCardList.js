import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {
    DESKTOP_WIDTH,
    TABLET_WIDTH,
    DESKTOP_INITIAL_QUANTITY,
    DESKTOP_EXTRA_QUANTITY,
    TABLET_INITIAL_QUANTITY,
    TABLET_EXTRA_QUANTITY,
    MOBILE_INITIAL_QUANTITY,
    MOBILE_EXTRA_QUANTITY
} from '../../utils/constants'

function MoviesCardList({ movies, isSavedMovies, isAdded, addToFavorites, removeFromFavorites }) {

    const [currentCount, setCurrentCount] = React.useState(0);
    const [extraRow, setExtraRow] = React.useState(4);
    const [moviesToRender, setMoviesToRender] = React.useState([]);

    const getCount = (windowWidth) => {
        if(windowWidth >= DESKTOP_WIDTH) {
            return { initial: DESKTOP_INITIAL_QUANTITY, extra: DESKTOP_EXTRA_QUANTITY}
        } if(windowWidth >= TABLET_WIDTH) {
            return { initial: TABLET_INITIAL_QUANTITY, extra: TABLET_EXTRA_QUANTITY}
        }
        return {initial: MOBILE_INITIAL_QUANTITY, extra: MOBILE_EXTRA_QUANTITY}
    }
    const renderExtraRow = () => {
        const count = Math.min(movies.length, currentCount + extraRow);
        const extraMovies = movies.slice(currentCount, count);
        setMoviesToRender([...moviesToRender, ...extraMovies]);
        setCurrentCount(count);
    };

    const resizeHandler = () => {
        const windowWidth = window.innerWidth;
        setExtraRow(getCount(windowWidth));
    };
    React.useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    });

    React.useEffect(() => {
        const windowWith = window.innerWidth;
        setExtraRow(getCount(windowWith).extra);
        const count = Math.min(movies.length, getCount(windowWith).initial);
        setMoviesToRender(movies.slice(0, count));
        setCurrentCount(count);
    }, [movies]);

    const renderExtraRowHandler = () => renderExtraRow();

    return (
        <>
            <ul className="movies__list">
                {
                    isSavedMovies ? movies.map((movie) =>
                        <MoviesCard
                            key={movie.movieId}
                            card={ movie }
                            isSavedMovies={isSavedMovies}
                            isAdded={isAdded}
                            addToFavorites={addToFavorites}
                            removeFromFavorites={removeFromFavorites}
                        />)
                        : moviesToRender.map((movie) =>
                        <MoviesCard
                            key={movie.movieId}
                            card={ movie }
                            isSavedMovies={isSavedMovies}
                            isAdded={isAdded}
                            addToFavorites={addToFavorites}
                            removeFromFavorites={removeFromFavorites}
                        />)
                }
            </ul>
            {
                isSavedMovies ? '' : currentCount < movies.length && <button onClick={() => renderExtraRowHandler()} className="movies__button">Ещё</button>
            }

        </>
    )
}

export default MoviesCardList;
