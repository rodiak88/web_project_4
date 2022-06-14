export const cards = [
  {
    title: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

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
export const addFormElement = document.getElementById("add-form");
export const editFormElement = document.getElementById("edit-form");

export const editProfileBtn = document.querySelector(".profile__edit-btn");
export const addPlaceBtn = document.querySelector(".profile__add-btn");

export const popupImage = document.querySelector(".popup__photo");
export const popupCaption = document.querySelector(".popup__photoTitle");
