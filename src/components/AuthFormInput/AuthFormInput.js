import React from 'react';
import './AuthFormInput.css';

function AuthFormInput({ inputHandler, inputError, inputValue, inputDirty, onBlur, title ,type, name, id, placeholder,formDisabled }) {
    return (
        <div className="auth-form-input__container">
            <h3 className="auth-form-input__title">{title}</h3>
            <input disabled={formDisabled} onChange={e => inputHandler(e)} value={inputValue} onBlur={onBlur} className="auth-form-input" required type={type} name={name} id={id} placeholder={placeholder}/>
            {(inputDirty && inputError) && <span className="auth-form-input__error">{inputError}</span>}
        </div>
    )
}

export default AuthFormInput;
