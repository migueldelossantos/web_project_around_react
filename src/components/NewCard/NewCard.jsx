function NewCard () {
  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
    >
      <label className="popup_field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          name="place-name"
          placeholder="Título"
          required
          type="text"
          minLength="1"
          maxLength="30"
        />
        <span className="place-name-input-error popup__input-error"></span>
      </label>
      <label>
        <input
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Enlace a la imagen"
          required
          type="url"
        />
        <span className="link-input-error popup__input-error"></span>
      </label>
      <button className="button popup__button" type="submit" disabled>
        Crear
      </button>
    </form>
  )
}

export default NewCard;