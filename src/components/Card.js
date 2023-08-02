function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="card">
            <button type="button" aria-label="Удалить" className="card__trash-button"></button>
            <img onClick={handleClick} src={props.card.link} className="card__image" alt={`Фото: ${props.card.name}`} />
            <div className="card__image-description">
                <h2 className="card__title">{props.card.name}</h2>
                <div className = "card__like-container">
                    <button type="button" aria-label="Нравится" className="card__like-button"></button>
                    <p className="card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
