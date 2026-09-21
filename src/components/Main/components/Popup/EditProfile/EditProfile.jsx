import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

function EditProfile () {

  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  const disabledSendButton = !name.trim() || !about.trim();

  const [errors, setErrors] = useState({});
  

  function validateForm () {
    const newErrors = {};

    if (name.length < 2) {
      newErrors.name = 'La nombre debe tener al menos 2 caracteres'
    }

    if (about.length < 2) {
      newErrors.about = 'La descripción debe tener al menos 2 caracteres'
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();

    if (validateForm()) {
      handleUpdateUser({ name, about });
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          value={name}
          placeholder="Nombre"
          type="text"
          minLength="2"
          maxLength="40"
          required
          onChange={handleNameChange}
        />
        { errors?.name && <span className="name-input-error popup__input-error popup__input-error_active">{errors.name}</span> }
      </label>
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_description"
          name="description"
          value={about}
          placeholder="Acerca de mí"
          type="text"
          minLength="2"
          maxLength="200"
          required
          onChange={handleAboutChange}
        />
        { errors?.about && <span className="description-input-error popup__input-error popup__input-error_active">{errors.about}</span> }
      </label>
      <button
        className="button popup__button"
        type="submit"
        disabled={disabledSendButton}
      >
        Guardar
      </button>
    </form>
  )
}

export default EditProfile;