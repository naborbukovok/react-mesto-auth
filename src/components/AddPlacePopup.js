import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [props.isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
          name,
          link
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            title="Новое место"
            name="place"
            onClose={props.onClose}
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    name="title"
                    placeholder="Название"
                    type="text"
                    className="popup__input"
                    id="title"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleNameChange}
                />
                <span className="popup__error title-error"></span>
            </label>
            <label className="popup__field">
                <input
                    name="image"
                    placeholder="Ссылка на картинку"
                    type="url"
                    className="popup__input"
                    id="image"
                    required
                    value={link}
                    onChange={handleLinkChange}
                />
                <span className="popup__error image-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
