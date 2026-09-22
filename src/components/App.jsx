import { useEffect, useState } from 'react'
import Footer from './Footer/Footer.jsx'
import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx'
import api from '../utils/api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      await api.getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    })();
  }, [])

  useEffect(() => {
    (async () => {
      await api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    })();
  }, [])

  async function handleCardLike(card) {
      const isLiked = card.isLiked;
  
      await api.changeLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
        })
        .catch((err) => console.log(err))
    }
  
    async function handleCardDelete(cardId) {
      await api.deleteCard(cardId)
        .then(() => {
          setCards((state) => state.filter((currentCard) => currentCard._id !== cardId));
          handleClosePopup();
        })
        .catch((err) => console.log(err));
    }

  function handleOpenPopup (popup) {
    setPopup(popup);
  }

  function handleClosePopup () {
    setPopup(null);
  }

  function handleUpdateUser (data) {
    api.updateProfileInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateAvatar (avatar) {
    api.updateProfileAvatar({ avatar })
      .then((newData) => {
        setCurrentUser({...currentUser, avatar: newData.avatar});
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="page__content">
        <CurrentUserContext.Provider 
          value={{
            currentUser,
            handleUpdateUser,
            handleUpdateAvatar,
            handleAddPlaceSubmit
          }}
        >
          <Header/>
          <Main
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            popup={popup}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer/>
        </CurrentUserContext.Provider>
      </div>
    </>
  )
}

export default App
