import React from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

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
                buttonText="Сохранить"
            >
                <label className="popup__field">
                    <input name="avatar" placeholder="Ссылка на картинку" type="url" className="popup__input" id="avatar" required />
                    <span className="popup__error avatar-error"></span>
                </label>
            </PopupWithForm>

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                title="Редактировать профиль"
                name="user"
                onClose={closeAllPopups}
                buttonText="Сохранить"
            >
                <label className="popup__field">
                    <input name="name" placeholder="Имя" type="text" className="popup__input" id="name" required minLength="2" maxLength="40" />
                    <span className="popup__error name-error"></span>
                </label>
                <label className="popup__field">
                    <input name="description" placeholder="О себе" type="text" className="popup__input" id="description" required minLength="2" maxLength="200"/>
                    <span className="popup__error description-error"></span>
                </label>
            </PopupWithForm>
            
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
    );
}

export default App;
