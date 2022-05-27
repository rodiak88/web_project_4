import { photoPreviewPopup } from "./index.js";
import { openPopup } from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    console.log(this._cardSelector);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardPhoto = this._element.querySelector(".card__photo-container");
    const cardTitle = this._element.querySelector(".card__title");
    cardPhoto.style.backgroundImage = `url(${this._link})`;
    cardPhoto.ariaLabel = this._name;
    cardTitle.textContent = this._name;
    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard(likeBtn) {
    likeBtn.classList.toggle("card__like-btn_active");
  }

  _handleOpenPopup() {
    const popupPhoto = document.querySelector(".popup__photo");
    const popupTitle = document.querySelector(".popup__photoTitle");
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupTitle.textContent = this._name;
    openPopup(photoPreviewPopup);
  }

  _setEventListeners() {
    const cardPhoto = this._element.querySelector(".card__photo-container");
    const deleteBtn = this._element.querySelector(".card__delete-btn");
    const likeBtn = this._element.querySelector(".card__like-btn");

    deleteBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._handleDeleteCard();
    });

    likeBtn.addEventListener("click", () => {
      this._handleLikeCard(likeBtn);
    });

    cardPhoto.addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }
}
