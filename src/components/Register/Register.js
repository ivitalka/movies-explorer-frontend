import React from 'react'
import './Register.css'
import {Link} from "react-router-dom";
import AuthFormInput from "../AuthFormInput/AuthFormInput"
import FormButton from "../FormButton/FormButton";

function Register() {
    return (
        <section className="register">
            <div className="register__container">
                <Link to="/" className="register__logo-link"/>
                <h2 className="register__title">Добро пожаловать!</h2>
                <form className="register__form" name="register-form">
                    <AuthFormInput
                        title={"Имя"}
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        placeholder={"Введите ваше имя"}
                    />
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
                <p className="register__text">Уже зарегистрированы?
                    <Link className="register__link" to={"/signin"}>Войти</Link>
                </p>
            </div>

        </section>

    )
}

export default Register;
