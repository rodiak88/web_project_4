import { photoPreviewPopup } from "./index.js";
import { openPopup } from "./utils.js";

const popupPhoto = document.querySelector(".popup__photo");
const popupTitle = document.querySelector(".popup__photoTitle");

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._cardPhoto = this._element.querySelector(".card__photo-container");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardPhoto.style.backgroundImage = `url(${this._link})`;
    this._cardPhoto.ariaLabel = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard() {
    this._likeBtn.classList.toggle("card__like-btn_active");
  }

  _handleOpenPopup() {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupTitle.textContent = this._name;
    openPopup(photoPreviewPopup);
  }

  _setEventListeners() {
    this._deleteBtn = this._element.querySelector(".card__delete-btn");
    this._likeBtn = this._element.querySelector(".card__like-btn");

    this._deleteBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._handleDeleteCard();
    });

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._cardPhoto.addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }
}
