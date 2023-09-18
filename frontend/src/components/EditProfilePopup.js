import { React, useContext, useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState(currentUser.name)
    const [description, setDescription] = useState(currentUser.about)

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ profileName: name, profileJob: description });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);


    return (
        <PopupWithForm
            name={"profile"}
            title={"Редактировать профиль"}
            submitButtonText={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    className="popup__input popup__input_type_name"
                    placeholder="Имя"
                    id="profile_name"
                    type="text"
                    name="name"
                    aria-label="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span
                    className="popup__input-error name-input-error"
                    id="profile_name-input-error"
                ></span>
            </label>
            <label>
                <input
                    className="popup__input popup__input_type_description"
                    placeholder="Занятие"
                    id="Job"
                    type="text"
                    name="about"
                    aria-label="Занятие"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleChangeDescription}
                />
                <span className="popup__input-error discription-input-error " id="Job-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;