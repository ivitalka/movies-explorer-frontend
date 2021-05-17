import React from 'react'
import "./FormButton.css";

function FormButton({ buttonText, formValid, message }) {
    return (
        <div className="form-button__container">
            <span className="form-button__error">{ message }</span>
            <button disabled={!formValid} className="form-button" type="submit">{buttonText}</button>
        </div>
    )
}

export default FormButton;
