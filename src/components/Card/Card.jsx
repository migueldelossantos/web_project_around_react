import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";

function Card (prop) {
  const { onOpenPopup, card } = prop
  const { name, link } = card;

  const imagePopup = { children: <ImagePopup card={card}/> }
  const deletePopup = { title: '¿Estás seguro/a?', children: <RemoveCard/> }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        onClick={() => onOpenPopup(imagePopup)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={() => onOpenPopup(deletePopup)}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className="card__like-button"
          type="button"
        ></button>
      </div>
    </li>
  )
}

export default Card;