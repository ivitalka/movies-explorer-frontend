import React from 'react';
import "./Profile.css";
import * as mainApi from '../../utils/MainApi'
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ setCurrentUser, onSignOut }) {
    const currentUser = React.useContext(CurrentUserContext);

    const handleUpdateUser = (name, email) => {
        const token = localStorage.getItem('token');
        mainApi.updateProfile(name, email, token)
            .then((res) => {
                if(!res.status) {
                    setCurrentUser(res);
                    setProfileMessage('Успешно!')
                    setMessageColor(true);
                } else {
                    throw new Error(res.message);
                }
            })
            .catch((e) => {
                setMessageColor(false);
                setProfileMessage(e.message);
            })
    }

    const [profileName, setProfileName] = React.useState('');
    const [profileNameDirty, setProfileNameDirty] = React.useState(false);
    const [profileNameError, setProfileNameError] = React.useState("Заполните поле");

    const [profileEmail, setProfileEmail] = React.useState('');
    const [profileEmailDirty, setProfileEmailDirty] = React.useState(false);
    const [profileEmailError, setProfileEmailError] = React.useState("Заполните поле");

    const [profileFormValid, setProfileFormValid] = React.useState(false)

    const [profileMessage, setProfileMessage] = React.useState('');
    const [messageColor, setMessageColor] = React.useState(null);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "name":
                setProfileNameDirty(true);
                break;
            case "email":
                setProfileEmailDirty(true);
                break;
        }
    };

    React.useEffect(() => {
        setProfileName(currentUser.name);
        setProfileEmail(currentUser.email);
    }, [currentUser.name, currentUser.email]);

    React.useEffect(() => {
        if (profileNameError || profileEmailError || profileName === currentUser.name && profileEmail === currentUser.email ){
            setProfileFormValid(false)
        }
        else {
            setProfileFormValid(true)
        }

    }, [profileNameError, profileEmailError, profileName, profileEmail, currentUser.name, currentUser.email])

    function handleNameChange(e) {
        setProfileName(e.target.value);
        const re = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
        if(!re.test(String(e.target.value))){
            setProfileNameError("Введено не корректное значение");
            if (!e.target.value) {
                setProfileNameError("Заполните поле");
            }
        }
        else {
            setProfileNameError("");
        }
    }

    function handleEmailChange(e) {
        setProfileEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setProfileEmailError("Введено не корректное значение");
            if (!e.target.value) {
                setProfileEmailError("Заполните поле");
            }
        }
        else {
            setProfileEmailError("");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateUser(profileName, profileEmail);
    }

    const handleSignOut = () => {
        onSignOut();
    }

    return (
        <>
            <section className="profile">
                <h2 className="profile__title">Привет, {currentUser.name}</h2>
                <form onSubmit={e => handleSubmit(e)} className="profile__form" action="">
                    <div className="profile__wrap">
                        <h3 className="profile__input-title">Имя</h3>
                        <input onBlur={e => blurHandler(e)} onChange={e => handleNameChange(e)} className="profile__input" type="text" name="name" id="name" defaultValue={currentUser.name}/>
                        {(profileNameDirty && profileNameError) && <span className="profile__input-error">{profileNameError}</span>}
                    </div>
                    <div className="profile__wrap">
                        <h3 className="profile__input-title">E-mail</h3>
                        <input onBlur={e => blurHandler(e)} onChange={e => handleEmailChange(e)} className="profile__input" type="email" name="email" id="email" defaultValue={currentUser.email}/>
                        {(profileEmailDirty && profileEmailError) && <span className="profile__input-error">{profileEmailError}</span>}
                    </div>
                    <span className={`profile__message ${messageColor ? "profile__message_success" : ""}`}>{profileMessage}</span>
                    <button disabled={!profileFormValid} className="profile__button" type="submit">Редактировать</button>
                </form>
                <button onClick={handleSignOut} className="profile__button profile__button_action_logout" type="button">Выйти из аккаунта</button>
            </section>
        </>
    )
}

export default Profile;
