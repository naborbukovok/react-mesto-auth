function ImagePopup(props) {
    return (
        <div className={`popup popup_content_image ${(props.card == null) ? '' : 'popup_opened'}`}>
            {(props.card != null) && (
                <div className="popup__container popup__container_type_image">
                    <button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
                    <img src={props.card.link} className="popup__image" alt={`Фото: ${props.card.name}`} />
                    <p className="popup__image-description">{props.card.name}</p>
                </div>
            )}
        </div>
    );
}

export default ImagePopup;
