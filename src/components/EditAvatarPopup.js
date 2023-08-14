import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            title="Обновить аватар"
            name="avatar"
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}

        >
            <label className="popup__field">
                <input
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    type="url" className="popup__input"
                    id="avatar"
                    required
                    ref={avatarRef}
                />
                <span className="popup__error avatar-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
