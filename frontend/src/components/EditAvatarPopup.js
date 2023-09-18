import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef(null)

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: avatarRef.current.value });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    });

    return (
        <PopupWithForm
            name={"avatar"}
            title={"Обновить аватар"}
            submitButtonText={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    className="popup__input popup__input_type_url"
                    placeholder="Ссылка на картинку"
                    id="avatar-source_link"
                    type="url"
                    name="avatar"
                    required
                    aria-label="Ссылка на картинку"
                    ref={avatarRef}
                />
                <span
                    className="popup__input-error avatar-input-error"
                    id="avatar-source_link-input-error"
                ></span>
            </label>
        </PopupWithForm>
    )

}

export default EditAvatarPopup