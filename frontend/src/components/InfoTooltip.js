import React from "react";
import successCheckin from '../images/successCheckin.svg';
import errorCheckin from '../images/errorCheckin.svg';

export default function InfoTooltip({ isOpen, onClose, isRegister }) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }
  
  return (
    <section className={`popup ${isOpen && ("popup_opened")}`} onMouseDown={handleClickClose}>
      <div className="popup__container popup__container_reg">
          <img className="popup__picture" src={isRegister.status ? successCheckin : errorCheckin} />
          <h3 className="popup__text">{isRegister.message}</h3>
        <button className="popup__close-icon" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}