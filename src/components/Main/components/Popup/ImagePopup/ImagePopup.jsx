function ImagePopup (prop) {
  const { name, link } = prop.card;
  return (
    <>
      <img alt={name} className="popup__image" src={link} />
      <p className="popup__caption">{name}</p>
    </>
  )
}

export default ImagePopup;