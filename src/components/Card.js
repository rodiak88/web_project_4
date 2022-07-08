import { api } from "../utils/constants.js";

export default class Card {
  constructor(
    { cardData, userId, handleCardClick, handleLikeCard, handleDeleteCard },
    cardSelector
  ) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
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
    const cardTitle = this._element.querySelector(".card__title");
    this._deleteBtn = this._element.querySelector(".card__delete-btn");
    this._cardPhoto.style.backgroundImage = `url(${this._link})`;
    this._cardPhoto.ariaLabel = this._title;
    cardTitle.textContent = this._title;
    if (!this.isOwner()) {
      this._deleteBtn.remove();
    }
    this.setCardLikes(this._likes);
    this._setEventListeners();
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
    this._cardTitle = null;
    this._cardPhoto = null;
    this._likeBtn = null;
    this._cardLikesElement = null;
  }

  setCardLikes(likesArray) {
    this._likes = likesArray;
    this._isLiked = this.isLiked();
    this._likeBtn = this._element.querySelector(".card__like-btn");
    this._cardLikesElement = this._element.querySelector(".card__like-count");
    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-btn_active");
    } else {
      this._likeBtn.classList.remove("card__like-btn_active");
    }
    this._cardLikesElement.textContent = this._likes.length;
  }

  isLiked() {
    return this._likes.find((user) => user._id === this._userId) ? true : false;
  }

  isOwner() {
    return this._userId === this._owner._id;
  }

  getId() {
    return this._cardId;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._handleDeleteCard();
    });

    this._likeBtn.addEventListener("click", this._handleLikeCard);

    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick({ title: this._title, link: this._link });
    });
  }
}
