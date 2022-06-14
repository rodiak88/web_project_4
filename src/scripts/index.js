import "../pages/index.css";

import {
  cards,
  cardsGallerySelector,
  cardTemplateSelector,
  popupFormSettings,
  formValidators,
  addPlaceBtn,
  editProfileBtn,
  addFormElement,
  editFormElement,
} from "../utils/constants.js";

import { initiateFormValidators } from "../utils/utils.js";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const userInfoPanel = new UserInfo({
  selectors: {
    name: ".profile__name-title",
    description: ".profile__description",
  },
});

const cardsGallery = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (item) => {
            const cardPopup = new PopupWithImage(item, "#photo-viewer-popup");
            cardPopup.open();
            cardPopup.setEventListeners();
          },
        },
        cardTemplateSelector
      );
      const cardElement = card.generateCard();
      cardsGallery.addItem(cardElement);
    },
  },
  cardsGallerySelector
);

const addFormPopoup = new PopupWithForm("#add-popup", (inputsObj) => {
  const card = new Card(
    {
      data: inputsObj,
      handleCardClick: (inputsObj) => {
        const cardPopup = new PopupWithImage(inputsObj, "#photo-viewer-popup");
        cardPopup.open();
        cardPopup.setEventListeners();
      },
    },
    cardTemplateSelector
  );
  cardsGallery.addItem(card.generateCard());
});

const editFormPopup = new PopupWithForm("#edit-popup", (inputsObj) => {
  userInfoPanel.setUserInfo(inputsObj);
});

editProfileBtn.addEventListener("click", function () {
  editFormElement["name"].value = userInfoPanel.getUserInfo().name;
  editFormElement["description"].value =
    userInfoPanel.getUserInfo().description;
  formValidators["edit-form"].resetValidation();
  editFormPopup.open();
});

addPlaceBtn.addEventListener("click", function () {
  formValidators["add-form"].resetValidation();
  addFormPopoup.open();
});

initiateFormValidators(popupFormSettings);
addFormPopoup.setEventListeners();
editFormPopup.setEventListeners();
cardsGallery.renderItems();
