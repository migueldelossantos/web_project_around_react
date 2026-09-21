import { useContext, useRef, useState } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

function EditAvatar () {

  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef();
  const [error, setError] = useState(null);

  function hadleSubmit (event) {
    event.preventDefault();

    const value = avatarRef.current.value;
    
    if (value.length < 3) {
      setError("Avatar debe tener al menos 3 caracteres");
      return;
    }
    if (!URL.canParse(value)) {
      setError("Avatar debe de ser una url");
      return;
    }
    
    handleUpdateAvatar(value);
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      onSubmit={hadleSubmit}
    >
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          ref={avatarRef}
          placeholder="Enlace a la imagen"
          type="url"
          minLength="2"
          maxLength="200"
          required
        />
        { error && <span className="avatar-input-error popup__input-error popup__input-error_active">{error}</span> }
      </label>
      <button
        className="button popup__button"
        type="submit"
      >
        Guardar
      </button>
    </form>
  )
}

export default EditAvatar;