import React from 'react'
import './Login.css'
import {Link} from "react-router-dom";
import AuthFormInput from "../AuthFormInput/AuthFormInput"
import FormButton from "../FormButton/FormButton";


function Login() {
    return (
        <section className="login">
            <div className="login__container">
                <Link to="/" className="login__logo-link"/>
                <h2 className="login__title">Добро пожаловать!</h2>
                <form className="login__form" name="login-form">
                    <AuthFormInput
                        title={"E-mail"}
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Введите ваш email"}
                    />
                    <AuthFormInput
                        title={"Пароль"}
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Введите ваш пароль"}
                    />
                    <FormButton buttonText="Зарегистрироваться"/>
                </form>
                <p className="login__text">Уже зарегистрированы?
                    <Link className="login__link" to={"/signup"}>Регистрация</Link>
                </p>
            </div>

        </section>
    )
}

export default Login;
