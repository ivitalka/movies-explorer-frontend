import React from 'react'
import "./FormButton.css";

function FormButton({buttonText}) {
    return (
        <button className="form-button" type="submit">{buttonText}</button>
    )
}

export default FormButton;
