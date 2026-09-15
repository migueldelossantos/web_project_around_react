function EditProfile () {
  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile"
      noValidate
    >
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Nombre"
          type="text"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="name-input-error popup__input-error"></span>
      </label>
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_description"
          name="description"
          placeholder="Acerca de mí"
          type="text"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="description-input-error popup__input-error"></span>
      </label>
      <button className="button popup__button" type="submit" disabled>
        Guardar
      </button>
    </form>
  )
}

export default EditProfile;