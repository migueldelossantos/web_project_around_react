import { useContext } from "react";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/RemoveCard/RemoveCard";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function Card (prop) {

  const { currentUser } = useContext(CurrentUserContext);
  
  const { onOpenPopup, onCardLike, onDeleteCard, card } = prop
  const { name, link, isLiked } = card;

  const imagePopup = { children: <ImagePopup card={card}/> }
  const deletePopup = { title: '¿Estás seguro/a?', children: <RemoveCard cardId={card._id} onDeleteCard={onDeleteCard}/> }

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onOpenPopup(imagePopup)}
      />
      { currentUser._id === card.owner && <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={() => onOpenPopup(deletePopup)}
      ></button> }
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
          type="button"
        ></button>
      </div>
    </li>
  )
}

export default Card;