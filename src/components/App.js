import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import avatarTemplate from "../images/avatar-template.png";
import EditProfilePopup from "./EditProfilePopup.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';

function App() {
    const [currentUser, setUser] = React.useState({ avatar: avatarTemplate });
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, openEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, openEditProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, openAddPlacePopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    React.useEffect(() => {
            api.getUserInfo()
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
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

    function handleEditAvatarClick() {
        openEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        openEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        openAddPlacePopup(true);
    }

    function handleDeleteClick(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleLikeClick(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        if (!isLiked) {
            api.addLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            api.removeLike(card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((error) => {
                console.log(error);
            });
        }
    } 

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        openEditAvatarPopup(false);
        openEditProfilePopup(false);
        openAddPlacePopup(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
                <div className="page">
                    <Header />

                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onDeleteClick={handleDeleteClick}
                        onLikeClick={handleLikeClick}
                        onCardClick={handleCardClick}
                    />

                    <Footer />

                    <PopupWithForm
                        isOpen={isEditAvatarPopupOpen}
                        title="Обновить аватар"
                        name="avatar"
                        onClose={closeAllPopups}
                        buttonText="Сохранить"
                    >
                        <label className="popup__field">
                            <input name="avatar" placeholder="Ссылка на картинку" type="url" className="popup__input" id="avatar" required />
                            <span className="popup__error avatar-error"></span>
                        </label>
                    </PopupWithForm>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} /> 
                    
                    <PopupWithForm
                        isOpen={isAddPlacePopupOpen}
                        title="Новое место"
                        name="place"
                        onClose={closeAllPopups}
                        buttonText="Создать"
                    >
                        <label className="popup__field">
                            <input name="title" placeholder="Название" type="text" className="popup__input" id="title" required minLength="2" maxLength="30" />
                            <span className="popup__error title-error"></span>
                        </label>
                        <label className="popup__field">
                            <input name="image" placeholder="Ссылка на картинку" type="url" className="popup__input" id="image" required />
                            <span className="popup__error image-error"></span>
                        </label>
                    </PopupWithForm>
                    
                    <PopupWithForm
                        title="Вы уверены?"
                        name="confirmation"
                        onClose={closeAllPopups}
                        buttonText="Да"
                    />
                    
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </div>
            </CardsContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
