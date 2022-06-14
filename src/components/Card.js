export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardPhoto.ariaLabel = this._title;
    this._cardTitle.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard() {
    this._likeBtn.classList.toggle("card__like-btn_active");
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
      this._handleCardClick({ title: this._title, link: this._link });
    });
  }
}
