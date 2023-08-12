import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = ( 
        `card__like-button ${isLiked && 'card__like-button_enabled'}` 
    );

    function handleDeleteClick() {
        props.onDeleteClick(props.card);
    }

    function handleLikeClick() {
        props.onLikeClick(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="card">
            {isOwn && <button type="button" aria-label="Удалить" className="card__trash-button" onClick={handleDeleteClick} />} 
            <img onClick={handleClick} src={props.card.link} className="card__image" alt={`Фото: ${props.card.name}`} />
            <div className="card__image-description">
                <h2 className="card__title">{props.card.name}</h2>
                <div className = "card__like-container">
                    <button onClick={handleLikeClick} type="button" aria-label="Нравится" className={cardLikeButtonClassName} />
                    <p className="card__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
