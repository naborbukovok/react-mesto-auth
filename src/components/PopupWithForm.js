function PopupWithForm(props) {
    return (
        <div className={`popup popup_content_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_form">
                <button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
                <h2 className="popup__title">{props.title}</h2>

                {(props.name === "avatar") && (
                    <form name="form" className="popup__form" noValidate>
                        <label className="popup__field">
                            <input name="avatar" placeholder="Ссылка на картинку" type="url" className="popup__input" id="avatar" required />
                            <span className="popup__error avatar-error"></span>
                        </label>
                        <button type="submit" className="popup__button">Сохранить</button>
                    </form>
                )}

                {(props.name === "user") && (
                    <form name="form" className="popup__form" noValidate>
                        <label className="popup__field">
                            <input name="name" placeholder="Имя" type="text" className="popup__input" id="name" required minLength="2" maxLength="40" />
                            <span className="popup__error name-error"></span>
                        </label>
                        <label className="popup__field">
                            <input name="description" placeholder="О себе" type="text" className="popup__input" id="description" required minLength="2" maxLength="200"/>
                            <span className="popup__error description-error"></span>
                        </label>
                        <button type="submit" className="popup__button">Сохранить</button>
                    </form>
                )}

                {(props.name === "place") && (
                    <form name="form" className="popup__form" noValidate>
                        <label className="popup__field">
                            <input name="title" placeholder="Название" type="text" className="popup__input" id="title" required minLength="2" maxLength="30" />
                            <span className="popup__error title-error"></span>
                        </label>
                        <label className="popup__field">
                            <input name="image" placeholder="Ссылка на картинку" type="url" className="popup__input" id="image" required />
                            <span className="popup__error image-error"></span>
                        </label>
                        <button type="submit" className="popup__button">Создать</button>
                    </form>
                )}

                {(props.name === "confirmation") && (
                    <form name="form" className="popup__form" noValidate>
                        <button type="submit" className="popup__button popup__button_margin-top_small">Да</button>
                    </form>
                )}
                
            </div>
        </div>
    );
}

export default PopupWithForm;
