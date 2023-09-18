function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_image`}>
        <button
          type="button"
          className="popup__close-icon"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__heading">{card?.name}</h2>
      </div>
    </div>
  )
};

export default ImagePopup