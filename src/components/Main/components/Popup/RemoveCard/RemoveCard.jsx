function RemoveCard (props) {

  const { cardId, onDeleteCard } = props;

  return (
    <>
      <button
        className="button popup__button"
        onClick={() => onDeleteCard(cardId)}
      >
        Si
      </button>
    </>
  )
}

export default RemoveCard;