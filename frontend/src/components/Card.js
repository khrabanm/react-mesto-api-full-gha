import { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleCardClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card._id)
  }

  return (
    <div className="element">
      <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick} />
      {isOwn && <button type="button" className="element__trash" aria-label="Удалить" onClick={handleCardDelete} />}
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <div className="elements__like-section">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card