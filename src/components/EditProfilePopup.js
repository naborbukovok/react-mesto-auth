import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
    const [name, setName] = React.useState("...");
    const [description, setDescription] = React.useState("...");

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            title="Редактировать профиль"
            name="user"
            onClose={props.onClose}
            buttonText="Сохранить"
        >
            <label className="popup__field">
                <input name="name" placeholder="Имя" type="text" className="popup__input" id="name" required minLength="2" maxLength="40" />
                <span className="popup__error name-error"></span>
            </label>

            <label className="popup__field">
                <input name="description" placeholder="О себе" type="text" className="popup__input" id="description" required minLength="2" maxLength="200"/>
                <span className="popup__error description-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
