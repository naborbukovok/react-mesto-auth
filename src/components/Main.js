import React from 'react';
import Card from "./Card.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button onClick={props.onEditAvatar} type="button" aria-label="Заменить фото" className="profile__avatar-edit-button"></button>
                <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
            </section>

            <section className="cards">
                {props.cards.map((card, i) => (
                    <Card key={card._id} card={card} onDeleteClick={props.onDeleteClick} onLikeClick={props.onLikeClick} onCardClick={props.onCardClick} />
                ))}
            </section>
        </main>
    );
}

export default Main;
