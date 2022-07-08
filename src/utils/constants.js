import Api from "../components/Api.js";

export const cardsGallerySelector = ".gallery__list";
export const cardTemplateSelector = "#card-template";

export const popupFormSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const formValidators = {};
export const editFormElement = document.getElementById("edit-form");

export const editProfileBtn = document.querySelector(".profile__edit-btn");
export const addPlaceBtn = document.querySelector(".profile__add-btn");
export const avatarEditBtn = document.querySelector(".avatar__editBtn");

export const popupImage = document.querySelector(".popup__photo");
export const popupCaption = document.querySelector(".popup__photoTitle");

export const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "e9954642-7ca9-42fe-b8e5-fe91e4314998",
    "Content-Type": "application/json",
  },
});
