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
const formValidators = {};

const profileNameTxt = document.querySelector(".profile__name-title");
const profileDescTxt = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

const editProfilePopup = document.getElementById("edit-popup");
const editFormElement = document.getElementById("edit-form");

const addPlacePopup = document.getElementById("add-popup");
const addFormElement = document.getElementById("add-form");

export const photoPreviewPopup = document.getElementById("photo-viewer-popup");

const gallery = document.querySelector(".gallery__list");

function createCard(item) {
  const card = new Card(item, "#card-template");
  return card.generateCard();
}

function initiateGallery() {
  cards.forEach((item) => {
    const cardElement = createCard(item);
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
  const cardElement = createCard(newCardData);
  gallery.prepend(cardElement);
  closePopup(addPlacePopup);
}

function initiateFormValidators(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    formValidators[formElement.getAttribute("name")] = validator;
    console.log(formValidators);
    validator.enableValidation();
  });
}

editProfileBtn.addEventListener("click", function () {
  editFormElement["name"].value = profileNameTxt.textContent;
  editFormElement["description"].value = profileDescTxt.textContent;
  formValidators["edit-form"].resetValidation();
  openPopup(editProfilePopup);
});

addPlaceBtn.addEventListener("click", function () {
  addFormElement.reset();
  formValidators["add-form"].resetValidation();
  openPopup(addPlacePopup);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
initiateFormValidators(validationSettings);
setPopupCloseMouseEventListeners();
initiateGallery();
