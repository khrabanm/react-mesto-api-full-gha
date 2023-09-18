function PopupWithForm({ name, title, submitButtonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button
          type="button"
          className="popup__close-icon"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="Сохранить"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm