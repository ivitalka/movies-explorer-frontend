import React from 'react'
import './Register.css'
import {Link, useHistory } from "react-router-dom";
import AuthFormInput from "../AuthFormInput/AuthFormInput"
import FormButton from "../FormButton/FormButton";
import * as mainApi from "../../utils/MainApi";

function Register() {
    const history = useHistory();

    const [registerName, setRegisterName] = React.useState("");
    const [registerNameDirty, setRegisterNameDirty] = React.useState(false);
    const [registerNameError, setRegisterNameError] = React.useState("Заполните поле");

    const [registerEmail, setRegisterEmail] = React.useState("");
    const [registerEmailDirty, setRegisterEmailDirty] = React.useState(false);
    const [registerEmailError, setRegisterEmailError] = React.useState("Заполните поле");

    const [registerPassword, setRegisterPassword] = React.useState("");
    const [registerPasswordDirty, setRegisterPasswordDirty] = React.useState(false);
    const [registerPasswordError, setRegisterPasswordError] = React.useState("Заполните поле");

    const [registerFormValid, setRegisterFormValid] = React.useState(false);

    const [registerFormDisabled, setRegisterFormDisabled] = React.useState(false);

    const [registerMessage, setRegisterMessage] = React.useState('');


    const nameHandler = (e) => {
        setRegisterName(e.target.value);
        const re = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
        if(!re.test(String(e.target.value))){
            setRegisterNameError("Введено не корректное значение");
            if (!e.target.value) {
                setRegisterNameError("Заполните поле");
            }
        }
        else {
            setRegisterNameError("");
        }
    }
    const emailHandler = (e) => {
        setRegisterEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setRegisterEmailError("Введено не корректное значение");
            if (!e.target.value) {
                setRegisterEmailError("Заполните поле");
            }
        }
        else {
            setRegisterEmailError("");
        }
    };
    const passwordHandler = (e) => {
        setRegisterPassword(e.target.value);
        const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;
        if (!re.test(String(e.target.value))){
            console.log(re.test(String(e.target.value)))
            setRegisterPasswordError("Пароль должен содержать хотя бы 1 заглавную букву и цифру, а так же быть длиной не менее 6 символов");
            if (!e.target.value) {
                setRegisterPasswordError("Заполните поле");
            }
        }
        else {
            setRegisterPasswordError("");
        }
    };
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setRegisterNameDirty(true);
                break;
            case "email":
                setRegisterEmailDirty(true);
                break;
            case "password":
                setRegisterPasswordDirty(true);
                break;
        }
    };

    React.useEffect(() => {
        if (registerNameError || registerEmailError || registerPasswordError){
            setRegisterFormValid(false)
        }
        else {
            setRegisterFormValid(true)
        }

    }, [registerNameError, registerEmailError, registerPasswordError])

    const handleRegister = (name, email, password) => {
        mainApi.register(name, email, password)
            .then((data) => {
                if (data.status === 200) {
                    return history.push('/signin');
                }
                data.json()
                    .then((obj) => {
                        throw new Error(obj.message);
                    })
                    .catch((e) => setRegisterMessage(e.message))
                    .finally(() => setRegisterFormDisabled(false))
            })
    };
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setRegisterFormDisabled(true);
        handleRegister(registerName, registerEmail, registerPassword);
    }

    return (
        <section className="register">
            <div className="register__container">
                <Link to="/" className="register__logo-link"/>
                <h2 className="register__title">Добро пожаловать!</h2>
                <form onSubmit={e => handleRegisterSubmit(e) } className="register__form" name="register-form">
                    <AuthFormInput
                        inputValue={ registerName }
                        inputHandler={ nameHandler }
                        inputError={ registerNameError }
                        inputDirty={ registerNameDirty }
                        onBlur={ blurHandler }
                        title={"Имя"}
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        placeholder={"Введите ваше имя"}
                        formDisabled={registerFormDisabled}
                    />
                    <AuthFormInput
                        inputValue={ registerEmail }
                        inputHandler={ emailHandler }
                        inputError={ registerEmailError }
                        inputDirty={ registerEmailDirty }
                        onBlur={ blurHandler }
                        title={"E-mail"}
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Введите ваш email"}
                        formDisabled={registerFormDisabled}
                    />
                    <AuthFormInput
                        inputValue={ registerPassword }
                        inputHandler={ passwordHandler }
                        inputError={ registerPasswordError }
                        inputDirty={ registerPasswordDirty }
                        onBlur={ blurHandler }

                        title={"Пароль"}
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Введите ваш пароль"}
                        formDisabled={registerFormDisabled}
                    />
                        <FormButton
                            buttonText="Зарегистрироваться"
                            formValid={ registerFormValid }
                            message={ registerMessage }
                            formDisabled={registerFormDisabled}
                        />

                </form>

                <p className="register__text">Уже зарегистрированы?
                    <Link className="register__link" to={"/signin"}>Войти</Link>
                </p>
            </div>

        </section>

    )
}

export default Register;
