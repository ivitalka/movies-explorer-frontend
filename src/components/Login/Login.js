import React from 'react'
import './Login.css'
import {Link, useHistory} from "react-router-dom";
import AuthFormInput from "../AuthFormInput/AuthFormInput"
import FormButton from "../FormButton/FormButton";
import * as mainApi from "../../utils/MainApi";


function Login({setIsLogged}) {

    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginEmailDirty, setLoginEmailDirty] = React.useState(false);
    const [loginEmailError, setLoginEmailError] = React.useState("Заполните поле");

    const [loginPassword, setLoginPassword] = React.useState("");
    const [loginPasswordDirty, setLoginPasswordDirty] = React.useState(false);
    const [loginPasswordError, setLoginPasswordError] = React.useState("Заполните поле");

    const [loginFormValid, setLoginFormValid] = React.useState(false);

    const emailHandler = (e) => {
        setLoginEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setLoginEmailError("Введено не корректное значение");
            if (!e.target.value) {
                setLoginEmailError("Заполните поле");
            }
        }
        else {
            setLoginEmailError("");
        }
    };
    const passwordHandler = (e) => {
        setLoginPassword(e.target.value);
        const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;
        if (!re.test(String(e.target.value))){
            setLoginPasswordError("Пароль должен содержать хотя бы 1 заглавную букву и цифру, а так же быть длиной не менее 6 символов");
            if (!e.target.value) {
                setLoginPasswordError("Заполните поле");
            }
        }
        else {
            setLoginPasswordError("");
        }
    };
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setLoginEmailDirty(true);
                break;
            case "password":
                setLoginPasswordDirty(true);
                break;
        }
    };

    React.useEffect(() => {
        if (loginEmailError || loginPasswordError){
            setLoginFormValid(false)
        }
        else {
            setLoginFormValid(true)
        }

    }, [loginEmailError, loginPasswordError])

    const [loginMessage, setLoginMessage] = React.useState('');
    const history = useHistory();


    const handleLogin = (email, password) => {
        mainApi.login(email, password)
            .then((data) => {
                if(data.token) {
                    localStorage.setItem('token', data.token);
                    setIsLogged(true);
                    history.push('/movies');
                    return;
                }
                throw new Error(data.message);
            })
            .catch((e) => setLoginMessage(e.message))
    }
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        handleLogin(loginEmail, loginPassword);
    }
    return (
        <section className="login">
            <div className="login__container">
                <Link to="/" className="login__logo-link"/>
                <h2 className="login__title">Добро пожаловать!</h2>
                <form onSubmit={e => handleLoginSubmit(e)} className="login__form" name="login-form">
                    <AuthFormInput
                        inputValue={ loginEmail }
                        inputHandler={ emailHandler }
                        inputError={ loginEmailError }
                        inputDirty={ loginEmailDirty }
                        onBlur={ blurHandler }
                        title={ "E-mail" }
                        type={ "email" }
                        name={ "email" }
                        id={ "email" }
                        placeholder={ "Введите ваш email" }
                    />
                    <AuthFormInput
                        inputValue={ loginPassword }
                        inputHandler={ passwordHandler }
                        inputError={ loginPasswordError }
                        inputDirty={ loginPasswordDirty }
                        onBlur={ blurHandler }
                        title={ "Пароль" }
                        type={ "password" }
                        name={ "password" }
                        id={ "password" }
                        placeholder={"Введите ваш пароль"}
                    />
                    <FormButton
                        buttonText="Войти"
                        formValid={ loginFormValid }
                        message={ loginMessage }
                    />
                </form>
                <p className="login__text">Уже зарегистрированы?
                    <Link className="login__link" to={ "/signup" }>Регистрация</Link>
                </p>
            </div>

        </section>
    )
}

export default Login;
