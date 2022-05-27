import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { cards } from "./cardsData.js";
import {
  openPopup,
  closePopup,
  setPopupCloseMouseEventListeners,
} from "./utils.js";

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileNameTxt = document.querySelector(".profile__name-title");
const profileDescTxt = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

const editProfilePopup = document.getElementById("edit-popup");
const editFormElement = document.getElementById("edit-form");
const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);

const addPlacePopup = document.getElementById("add-popup");
const addFormElement = document.getElementById("add-form");
const addFormValidator = new FormValidator(validationSettings, addFormElement);

export const photoPreviewPopup = document.getElementById("photo-viewer-popup");

const gallery = document.querySelector(".gallery__list");

function initiateGallery() {
  cards.forEach((item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    gallery.append(cardElement);
  });
}

function handleProfileFormSubmit(evt) {
  profileNameTxt.textContent = editFormElement["name"].value;
  profileDescTxt.textContent = editFormElement["description"].value;
  closePopup(editProfilePopup);
}

function handleAddFormSubmit() {
  const newCardData = {
    name: addFormElement["title"].value,
    link: addFormElement["link"].value,
  };
  const card = new Card(newCardData, "#card-template");
  gallery.prepend(card.generateCard());
  closePopup(addPlacePopup);
}

editProfileBtn.addEventListener("click", function () {
  editFormElement["name"].value = profileNameTxt.textContent;
  editFormElement["description"].value = profileDescTxt.textContent;
  editFormValidator.resetValidation();
  openPopup(editProfilePopup);
});

addPlaceBtn.addEventListener("click", function () {
  addFormElement.reset();
  addFormValidator.resetValidation();
  openPopup(addPlacePopup);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
setPopupCloseMouseEventListeners();
initiateGallery();
