function EditAvatar () {
  return (
    <form className="popup__form" id="edit-avatar-form">
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Enlace a la imagen"
          type="url"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="avatar-input-error popup__input-error"></span>
      </label>
      <button className="button popup__button" type="submit">Guardar</button>
    </form>
  )
}

export default EditAvatar;