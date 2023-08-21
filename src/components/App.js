import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { register, login, checkToken } from "../utils/auth.js";
import avatarTemplate from "../images/avatar-template.png";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    avatar: avatarTemplate,
  });
  const [email, setEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipOk, setIsInfoTooltipOk] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.log(error);
        });

      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
  
      if (token) {
        checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", {replace: true});
            }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
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
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateAvatar(input) {
    api
      .setAvatar(input.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(input) {
    api
      .setUserInfo(input.name, input.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(input) {
    api
      .postCard(input.name, input.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRegister(email, password) {
    register(email, password)
    .then((data) => {
      if (data) {
        setIsInfoTooltipOk(true);
        navigate("/signin", {replace: true});
      }
    })
    .catch((error) => {
      setIsInfoTooltipOk(false);
      console.log(error);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    });
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }
    login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/signin");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            email={email}
            onSignOut={handleSignOut}
          />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onDeleteClick={handleDeleteClick}
                  onLikeClick={handleLikeClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                />
              }
            />
            <Route 
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                />
              }
            />
            <Route 
              path="/signin"
              element={
                <Login
                  onLogin={handleLogin}
                />
              }
            />
            <Route
              path="*"
              element={ loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace /> }
            />
          </Routes>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="confirmation"
            onClose={closeAllPopups}
            buttonText="Да"
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            isOk={isInfoTooltipOk}
            onClose={closeAllPopups}
          />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
