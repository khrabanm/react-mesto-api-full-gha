import React, { useContext } from 'react';
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext.js';



function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="аватарка пользователя" />
          <button
            type="button"
            aria-label="edit-avatar"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          />
        </div>
        <div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" onClick={onEditProfile} className="profile__edit-button" />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить фото" className="profile__add-button" onClick={onAddPlace} />
      </section>
      <section className="elements" aria-label="Картинки красивых мест">

        {cards.map((card) => (
          <Card key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />))}

      </section>
    </main>
  );
}

export default Main;
