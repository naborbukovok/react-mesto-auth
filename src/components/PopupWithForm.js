function PopupWithForm(props) {
    return (
        <div className={`popup popup_content_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_form">
                <button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form name={`form-${props.name}`} className="popup__form" noValidate>
                    {props.children}
                    <button type="submit" className="popup__button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
