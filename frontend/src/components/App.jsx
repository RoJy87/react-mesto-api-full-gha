import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup.jsx";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth";
import Navbar from "./Navbar";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isSpinnerPopupOpen, setSpinnerPopupOpen] = useState(false);
  const [isLoadingButton, setLoadingButton] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadingSpinner(true);
    Auth.getAuthInfo()
      .then((res) => {
        if (res) {
          Promise.all([api.getUserInfo(), api.getItems()]).then(
            ([userData, cardData]) => {
              setCurrentUser(userData);
              setCards(cardData);
              setEmail(userData.email);
              setLoggedIn(true);
              navigate("/", { replace: true });
            }
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => loadingSpinner(false))
  }, [loggedIn]);

  function loadingSpinner(isLoading) {
    setSpinnerPopupOpen(isLoading);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    setLoadingButton(true);
    api
      .setUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleUpdateAvatar(user) {
    setLoadingButton(true);
    api
      .setUserAvatar(user)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setLoadingButton(true);
    api
      .setItems(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setDeletePlacePopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDeleteSubmit(card) {
    setLoadingButton(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter((c) => {
            const newCard = c._id !== card._id;
            return newCard;
          });
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleRegister(values) {
    setLoadingButton(true);
    if (values.email && values.password) {
      const { email, password } = values;
      Auth.register(email, password)
        .then((res) => {
          if (res) {
            setSuccessful(true);
            setInfoTooltipPopupOpen(true);
            navigate("/signin", { replace: true });
          }
        })
        .catch((err) => {
          setSuccessful(false);
          setInfoTooltipPopupOpen(true);
          console.log(err);
        })
        .finally(() => {
          setLoadingButton(false);
        });
    }
  }

  function handleLogin(values, setValues) {
    setLoadingButton(true);
    if (!values.password || !values.email) {
      return;
    }
    const { email, password } = values;
    Auth.authorize(email, password)
      .then((data) => {
        if (data) {
          setEmail(email);
          setValues({ email: "", password: "" });
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setSuccessful(false);
        setInfoTooltipPopupOpen(true);
        console.log(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  }

  function handleSignout() {
    Auth.logout();
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  const handleClickMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="app">
          <Navbar
            email={email}
            onSignOut={handleSignout}
            isMenuVisible={isMenuVisible}
          />
          <Header onClickMenu={handleClickMenu} isMenuVisible={isMenuVisible} />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRoute
                  isLoggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onLoadingSpinner={loadingSpinner}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  element={Main}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  isLoadingButton={isLoadingButton}
                  onLogin={handleLogin}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  isLoadingButton={isLoadingButton}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoadingButton={isLoadingButton}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoadingButton={isLoadingButton}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoadingButton={isLoadingButton}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            name="info-tooltip"
            isSuccessful={successful}
            message={
              successful
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }
          />
          <DeletePlacePopup
            card={deletedCard}
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onDeletePlace={handleCardDeleteSubmit}
            isLoadingButton={isLoadingButton}
          />
          <ImagePopup
            name="image"
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <Spinner name="spinner" isOpen={isSpinnerPopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
