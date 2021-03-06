import './App.css';
import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import * as mainApi from '../../utils/MainApi';
import {SHORT_MOVIE_DURATION} from '../../utils/constants'
import { getAllMovies } from "../../utils/moviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [isLogged, setIsLogged] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({});

    const [loadingError, setLoadingError] = React.useState('');

    const [movies, setMovies] = React.useState([]);
    const [savedMovies, setSavedMovies] = React.useState([]);

    const [isChecked, setIsChecked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [isSearched, setIsSearched] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchedMovies, setSearchedMovies] = React.useState([]);
    const [searchedSavedMovies ,setSearchedSavedMovies]= React.useState([]);
    const [isSavedPage, setIsSavedPage] = React.useState(null);


    const menuHandler = () => setMenuOpen(true);
    const closeMenuHandler = () => setMenuOpen(false);

    const history = useHistory();

    const getUserProfile = () => {
        const token = localStorage.getItem('token')
        if (token) {
            mainApi.getProfile(token)
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setIsLogged(true);
                            setCurrentUser(data);
                            history.push('/movies');

                        })
                    } else {
                        setIsLogged(false);
                        localStorage.removeItem('token');
                        history.push('/signin')
                    }
                })
                .catch((e) => console.log(e));
        }
    }

    const signOut = () => {
        history.push('/');
        setIsLogged(false);
        setSearchedMovies([]);
        setSearchedSavedMovies([]);
        localStorage.removeItem('token');
        localStorage.removeItem('movies');
        localStorage.removeItem('saved-movies');
        localStorage.removeItem('searched-movies');
        localStorage.removeItem('searched-saved-movies');
    }
    React.useEffect(() => {
        getUserProfile();
    }, []);

    const getAllMoviesData = () => {
        if (isLogged) {
            getAllMovies().then((data) => {
                const allMovies = data.map((item) => {
                    const moviesImage = item.image ? `https://api.nomoreparties.co${item.image.url}` : '';
                    const movieThumbnail = item.image ? `https://api.nomoreparties.co${item.image.formats.thumbnail.url}` : '';
                    return {
                        ...item,
                        thumbnail: movieThumbnail,
                        movieId: item.id,
                        image: moviesImage,
                        trailer: item.trailerLink,
                    };
                })
                localStorage.setItem('movies', JSON.stringify(allMovies));
                setMovies(allMovies);
                setLoadingError('');
            })
                .catch(() => {
                    setLoadingError(`???? ?????????? ?????????????? ?????????????????? ????????????. 
                    ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. 
                    ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????`)
                })
        }
        }

    const getAllSavedMovies = () => {
        const token = localStorage.getItem('token')
        if (isLogged) {
            mainApi.getSavedMovies(token)
                .then((res) => {
                    if (res.status === 200){
                        res.json().then((data) => {
                            localStorage.setItem('saved-movies', JSON.stringify(data))
                            setSavedMovies(data)
                            setLoadingError('');
                        })
                    } else {
                        throw new Error(`???? ?????????? ?????????????? ?????????????????? ????????????. 
                    ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. 
                    ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????`)
                    }

                })
                .catch((e) => {
                    setLoadingError(e.message)
                });
        }
        }

    React.useEffect(() => {
        const localMovies = JSON.parse(localStorage.getItem('movies'))
        if (localMovies) {
            setMovies(localMovies)
        } else {
            getAllMoviesData();
        }
        const localSavedMovies = JSON.parse(localStorage.getItem('saved-movies'))
        if (localSavedMovies) {
            setSavedMovies(localSavedMovies)
        } else {
            getAllSavedMovies();
        }
    }, [isLogged]);

    const isAddedMovies = (movie) => savedMovies.some((item) => item.movieId === movie.id);

    const addToFavorites = (movie) => {
        const token = localStorage.getItem('token')
        mainApi.addSavedMovies(movie, token)
            .then((res) => {
                setSavedMovies([...savedMovies, res])
                localStorage.setItem('saved-movies', JSON.stringify([...savedMovies, res]))
            })
            .catch((e) => console.log(e));
    };

    const removeFromFavorites = (movie) => {
        const token = localStorage.getItem('token')
        const movieId = savedMovies.find((item) => item.movieId === movie.movieId)._id;
        mainApi.removeSavedMovies(movieId, token)
            .then((res) => {
                if (!res.status) {
                    const newArray = savedMovies.filter((item) => item.movieId !== movie.movieId);
                    setSavedMovies(newArray);
                    localStorage.setItem('saved-movies', JSON.stringify(newArray));
                }
            })
            .catch((e) => console.log(e))
    }

    const isCheckedHandler = () => {
        setIsChecked(!isChecked)
    }

    const filterMovies = (data, query) => {
        if (query) {
            const regex = new RegExp(query, 'gi');
            const filteredData = data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
            if (filteredData.length === 0) {
                setLoadingError('???????????? ???? ??????????????');
            } else {
                setLoadingError('');
            }
            return filteredData;
        } else {
            return data;
        }
    }

    const shortFilmFilter = (data) => {
        if (isChecked) {
            const shortData = data.filter((item) => item.duration < SHORT_MOVIE_DURATION);
            if (shortData.length === 0) {
                setLoadingError('???????????? ???? ??????????????')
            }
            return shortData;
        } else {
            return data;
        }
    }

    const submitSearchFromHandler = (e, isSavedMovies, setSearchFormDisabled) => {
        e.preventDefault();
        setSearchFormDisabled(true);
        setIsLoading(true);
        setTimeout(() => {
            if (isSavedMovies) {
                setSearchedSavedMovies(shortFilmFilter(filterMovies(savedMovies, searchQuery)));

            } else {
                setSearchedMovies(shortFilmFilter(filterMovies(movies, searchQuery)));

            }
            setSearchQuery('');
            setIsSearched(true);
            setIsLoading(false);
            setSearchFormDisabled(false)
        }, 500);

    }

    React.useEffect(() => {
        const localMovies = JSON.parse(localStorage.getItem('searched-movies'));
        if (localMovies) {
            setSearchedMovies(localMovies);
        }
        const localSavedMovies = JSON.parse(localStorage.getItem('searched-saved-movies'));
        if (localMovies) {
            setSearchedSavedMovies(localSavedMovies);
        }
        // setSearchedMovies(JSON.parse(localStorage.getItem('searched-movies')))
        // setSearchedSavedMovies(JSON.parse(localStorage.getItem('searched-saved-movies')))
    }, [isSearched])

    React.useEffect(() => {
        if (searchedSavedMovies.length > 0 || searchedMovies.length > 0) {
            localStorage.setItem('searched-saved-movies', JSON.stringify(searchedSavedMovies));
            localStorage.setItem('searched-movies', JSON.stringify(searchedMovies));
        }

    }, [submitSearchFromHandler])

    React.useEffect(() => {
        setIsSearched(false)
        setLoadingError('')
    }, [isSavedPage])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
                <Header
                    isLogged={ isLogged }
                    isOpen={ isMenuOpen }
                    menuCalled={ menuHandler }
                    onClose={ closeMenuHandler }
                />
            </Route>
            <Switch>
                <Route exact path="/">
                  <Main/>
                </Route>
                <ProtectedRoute
                    path={"/movies"}
                    isLogged={isLogged}
                    component={Movies}
                    movies={searchedMovies}
                    isSavedMovies={false}
                    setIsSavedPage={setIsSavedPage}
                    isAdded={isAddedMovies}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    isLoading={isLoading}
                    loadingError={loadingError}
                    setLoadingError={setLoadingError}
                    isCheckedHandler={isCheckedHandler}
                    submitSearchFromHandler={submitSearchFromHandler}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                />
                <ProtectedRoute
                  path={"/saved-movies"}
                  isLogged={isLogged}
                  component={Movies}
                  movies={searchedSavedMovies.length > 0 ? searchedSavedMovies : !isSearched ? savedMovies : searchedSavedMovies}
                  isSavedMovies={true}
                  setIsSavedPage={setIsSavedPage}
                  isAdded={isAddedMovies}
                  removeFromFavorites={removeFromFavorites}
                  isLoading={isLoading}
                  loadingError={loadingError}
                  setLoadingError={setLoadingError}
                  isCheckedHandler={isCheckedHandler}
                  submitSearchFromHandler={submitSearchFromHandler}
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                />
                <ProtectedRoute
                  path={"/profile"}
                  isLogged={isLogged}
                  component={Profile}
                  setCurrentUser={setCurrentUser}
                  onSignOut={signOut}
                />
                <Route path="/signup">
                    <Register/>
                </Route>
                <Route path="/signin">
                    <Login setIsLogged={ setIsLogged } getAllSavedMovies={getAllSavedMovies} getUserProfile={getUserProfile} />
                </Route>
                <Route path={'*'}>
                    <ErrorPage/>
                </Route>
            </Switch>
            <Route exact path={['/', '/movies', '/saved-movies']}>
                <Footer />
            </Route>
        </CurrentUserContext.Provider>
  );
}

export default App;
