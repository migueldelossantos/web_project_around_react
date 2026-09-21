import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

function NewCard () {

  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  const disabledSendButton = !place.trim() || !link.trim();

  const [errors, setErrors] = useState({});

  function validateForm () {
    const newErrors = {};

    setErrors(newErrors);

    if (place.length < 2) {
      newErrors.place = 'El campo Título debe de tener al menos 2 caracteres.'
    }

    if (link.length < 2) {
      newErrors.link = 'El campos debe de tener al menos 2 caracteres.'
    } else if (!URL.canParse(link)) {
      newErrors.link = 'El campo debe de ser una URL.'
    }

    return Object.keys(newErrors).length === 0
  }

  function handlePlaceChange (e) {
    setPlace(e.target.value);
  }

  function handleLinkChange (e) {
    setLink(e.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();

    if (validateForm()) {
      handleAddPlaceSubmit({ link, place })
    }
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          name="place"
          value={place}
          placeholder="Título"
          required
          type="text"
          minLength="1"
          maxLength="30"
          onChange={handlePlaceChange}
        />
        { errors.place && <span className="place-name-input-error popup__input-error popup__input-error_active">{ errors.place }</span> }
      </label>
      <label>
        <input
          className="popup__input popup__input_type_url"
          name="link"
          value={link}
          placeholder="Enlace a la imagen"
          required
          type="url"
          onChange={handleLinkChange}
        />
        { errors.link && <span className="link-input-error popup__input-error popup__input-error_active">{ errors.link }</span> }
      </label>
      <button
        className="button popup__button"
        type="submit"
        disabled={disabledSendButton}
      >
        Crear
      </button>
    </form>
  )
}

export default NewCard;