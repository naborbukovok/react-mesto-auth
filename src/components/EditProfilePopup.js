import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("...");
    const [description, setDescription] = React.useState("...");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
    } 

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            title="Редактировать профиль"
            name="user"
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    name="name"
                    placeholder="Имя"
                    type="text"
                    className="popup__input"
                    id="name"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name}
                    onChange={handleNameChange}
                />
                <span className="popup__error name-error"></span>
            </label>

            <label className="popup__field">
                <input 
                    name="description"
                    placeholder="О себе"
                    type="text"
                    className="popup__input"
                    id="description"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__error description-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
