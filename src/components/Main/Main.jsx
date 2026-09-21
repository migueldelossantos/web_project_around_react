import { useContext } from 'react';

import Popup from './components/Popup/Popup';
import NewCard from './components/Popup/NewCard/NewCard';

import editIcon from '../../images/edit-icon.svg'
import Card from './components/Card/Card';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfile from './components/Popup/EditProfile/EditProfile';
import EditAvatar from './components/Popup/Avatar/EditAvatar';

function Main (props) {
  const {
    onOpenPopup,
    onClosePopup,
    popup,
    cards,
    onCardLike,
    onCardDelete
  } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: 'Nuevo Lugar', children: <NewCard/>}
  const editProfilePopup = { title: 'Editar Perfil', children: <EditProfile/> }
  const editAvaterPopup = { title: 'Editar Avatar', children: <EditAvatar/> }

  if (currentUser === null || currentUser === undefined) {
    return <p>Cargando datos del contexto...</p>;
  }

  return (
    <>
      <main className="content">
        <section className="profile page__section">
          <div className="profile__avatar-container">
            <img className="profile__image" src={currentUser.avatar} alt="Avatar" />
            <img
              className="profile__image-edit"
              src={editIcon}
              alt="Editar avatar"
              onClick={() => onOpenPopup(editAvaterPopup)}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={() => onOpenPopup(editProfilePopup)}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => onOpenPopup(newCardPopup)}
          ></button>
        </section>
        <section className="cards page__section">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                onOpenPopup={onOpenPopup}
                onCardLike={onCardLike}
                onDeleteCard={onCardDelete}
                key={card._id}
                card={card}
              />
            ))}
          </ul>
        </section>

        {popup && (
          <Popup onClose={onClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  )
}

export default Main;