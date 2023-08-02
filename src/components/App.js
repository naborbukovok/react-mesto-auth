import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

function App() {
    const [isEditAvatarPopupOpen, openEditAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, openEditProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, openAddPlacePopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleEditAvatarClick() {
        openEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        openEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        openAddPlacePopup(true);
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
        <div className="page">
            <Header />

            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />

            <Footer />

            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                title="Обновить аватар"
                name="avatar"
                onClose={closeAllPopups}
            />
            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                title="Редактировать профиль"
                name="user"
                onClose={closeAllPopups}
            />
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                title="Новое место"
                name="place"
                onClose={closeAllPopups}
            />
            <PopupWithForm
                title="Вы уверены?"
                name="confirmation"
                onClose={closeAllPopups}
            />
            <PopupWithImage
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </div>
    );
}

export default App;
