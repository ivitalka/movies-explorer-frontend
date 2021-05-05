import React from 'react';
import './AuthFormInput.css';

function AuthFormInput({title ,type, name, id, placeholder}) {
    return (
        <div className="auth-form-input__container">
            <h3 className="auth-form-input__title">{title}</h3>
            <input className="auth-form-input" required type={type} name={name} id={id} placeholder={placeholder}/>
            <span className="auth-form-input__error">Что то пошло не так...</span>
        </div>
    )
}

export default AuthFormInput;
