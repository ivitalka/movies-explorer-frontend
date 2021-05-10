import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile"

function App() {
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);
    const [isLogged, setIsLogged] = React.useState(false)

    const HamburgerMenuHandler = () => setIsHamburgerMenuOpen(true);
    const closeHamburgerMenuHandler = () => setIsHamburgerMenuOpen(false);

    return (
      <Switch>
          <Route path="/profile">
              <Header
                  isLogged={isLogged}
                  isOpen={isHamburgerMenuOpen}
                  HamburgerMenuCalled={HamburgerMenuHandler}
                  onClose={closeHamburgerMenuHandler}
              />
              <Profile/>
          </Route>
          <Route path="/signup">
              <Register/>
          </Route>
          <Route path="/signin">
              <Login/>
          </Route>
          <Route path="/404">
              <ErrorPage/>
          </Route>

          <>
              <Header
                  isLogged={isLogged}
                  isOpen={isHamburgerMenuOpen}
                  HamburgerMenuCalled={HamburgerMenuHandler}
                  onClose={closeHamburgerMenuHandler}
              />

              <Route exact path="/">
                        <Main/>
                  </Route>
              <Route path="/movies">
                  <Movies/>
              </Route>
              <Route path="/saved-movies">
                      <Movies/>
              </Route>
              <Footer/>
        </>
      </Switch>
  );
}

export default App;
