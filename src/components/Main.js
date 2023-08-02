import React from 'react';
import avatarTemplate from "../images/avatar-template.png";
import api from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
    const [userAvatar, setUserAvatar] = React.useState(avatarTemplate);
    const [userName, setUserName] = React.useState("...");
    const [userDescription, setUserDescription] = React.useState("...");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
            api.getUserInfo()
            .then((data) => {
                setUserAvatar(data.avatar);
                setUserName(data.name);
                setUserDescription(data.about);
            })
            .catch((error) => {
                console.log(error)
            });
        },
        []
    );

    React.useEffect(() => {
            api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((error) => {
                console.log(error)
            });
        },
        []
    );


    return (
        <main className="content">
            <section className="profile">
                <button onClick={props.onEditAvatar} type="button" aria-label="Заменить фото" className="profile__avatar-edit-button"></button>
                <img src={userAvatar} alt="Фото профиля" className="profile__avatar" />
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button onClick={props.onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
            </section>

            <section className="cards">
                {cards.map((card, i) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                ))}
            </section>
        </main>
    );
}

export default Main;
