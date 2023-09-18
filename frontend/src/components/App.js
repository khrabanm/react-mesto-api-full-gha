import '../index.css';
import React, {  useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth.js";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isRegister, setRegister] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) setToken(jwt);
    api.getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) setToken(jwt);
    api
      .getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  }

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getUser(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, [token]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .addLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => { console.log(`Ошибка при проставлении лайка ${error}`) })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  function handleInfoTooltipClick() {
    setInfoTooltipPopupOpen(true);
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardId));
      })
      .catch((error) => { console.log(`Ошибка при при удалении фото ${error}`) })
  }

  function handleUpdateUser(dataUserInfo) {
    api
      .patchProfile(dataUserInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => { console.log(`Ошибка при редактировании профиля ${error}`) })

  }

  function handleUpdateAvatar(dataUserInfo) {
    api
      .setUserAvatar(dataUserInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => { console.log(`Ошибка при загрузки фото ${error}`) })
  }

  function handleAddPlaceSubmit(dataCard) {
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((error) => { console.log(`Ошибка при загрузки фото ${error}`) })

  }

  function registerUser({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          setRegister({
            status: true,
            message: "Вы успешно зарегистрировались!",
          });
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setRegister({
          status: false,
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
      });
  }

  function onLogin({ email, password }) {
    auth
      .authorization(email, password)
      .then((token) => {
        localStorage.setItem("token", token);
        setToken(token);
      })
      .catch((err) => console.log(err));
  }

  return (
    <AppContext.Provider value={{ closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header userEmail={email} deleteToken={onSignOut} />

          <Routes>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="/sign-up" element={<Register
              onRegister={registerUser}
              onInfoTooltipClick={handleInfoTooltipClick}
            />}
            />
            <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute

                  element={Main}
                  loggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>


          <Footer />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegister={isRegister}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />


          <AddPlacePopup
           isOpen={isAddPlacePopupOpen}
           onAddPlace={handleAddPlaceSubmit}
           onClose={closeAllPopups}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            isOpen={selectedCard}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>


  );
}

export default App;

