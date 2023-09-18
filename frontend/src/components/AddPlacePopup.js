import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup(props) {
    const { isOpen, onAddPlace, onClose } = props;
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
  
    function handleChangeTitle(e) {
      setName(e.target.value);
    }
  
    function handleChangeLink(e) {
      setLink(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
        name,
        link,
      });
    }
  
    React.useEffect(() => {
      setName('');
      setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name={"photo"}
            title={"Новое место"}
            submitButtonText={"Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    className="popup__input popup__input_type_place"
                    placeholder="Название"
                    id="place_name"
                    type="text"
                    name="name"
                    aria-label="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name || ""}
                    onChange={handleChangeTitle}
                />
                <span
                    className="popup__input-error title-input-error"
                    id="place_name-input-error"
                ></span>
            </label>
            <label>
                <input
                    className="popup__input popup__input_type_url"
                    placeholder="Ссылка на картинку"
                    id="source_link"
                    type="url"
                    name="link"
                    required
                    aria-label="Ссылка на картинку"
                    value={link || ""}
                    onChange={handleChangeLink}
                />
                <span
                    className="popup__input-error link-input-error"
                    id="source_link-input-error"
                ></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup