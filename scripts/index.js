const profileNameTxt = document.querySelector(".profile__name-title");
const profileDescTxt = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

const editProfilePopup = document.getElementById("edit-popup");
const editFormElement = document.getElementById("edit-form");

const addPlacePopup = document.getElementById("add-popup");
const addFormElement = document.getElementById("add-form");
const addFormInputs = addFormElement.querySelectorAll(".popup__input");

const cardTemplate = document.querySelector("#card-template").content;

const photoPreviewPopup = document.getElementById("photo-viewer-popup");

const gallery = document.querySelector(".gallery__list");

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardPhoto = cardElement.querySelector(".card__photo-container");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  const likeBtn = cardElement.querySelector(".card__like-btn");
  const photoPreview = document.querySelector(".popup__photo");
  const photoPreviewTitle = document.querySelector(".popup__photoTitle");
  cardPhoto.style.backgroundImage = `url(${cardData.link})`;
  cardPhoto.ariaLabel = cardData.name;
  cardTitle.textContent = cardData.name;
  cardPhoto.addEventListener("click", function () {
    photoPreview.src = cardData.link;
    photoPreviewTitle.textContent = cardData.name;
    photoPreview.alt = cardData.name;
    openPopup(photoPreviewPopup);
  });
  deleteBtn.addEventListener("click", function (evt) {
    evt.stopPropagation();
    cardElement.remove();
  });
  likeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_active");
  });
  return cardElement;
}

function initiateGallery() {
  cards.forEach((item) => {
    gallery.append(createCard(item));
  });
}

function openPopup(popup) {
  popup.classList.add("popup__active");
  document.addEventListener("keydown", handleEscKey);
  setPopupCloseMouseEventListeners();
}

function closePopup(popup) {
  popup.classList.remove("popup__active");
  document.removeEventListener("keydown", handleEscKey);
  removePopupCloseMouseEventListeners();
  if (popup.id !== "photo-viewer-popup") {
    resetValidation(popup, validationConfig);
  }
}

function handleProfileFormSubmit(evt) {
  profileNameTxt.textContent = editFormElement["name"].value;
  profileDescTxt.textContent = editFormElement["description"].value;
  closePopup(editProfilePopup);
}

function handleAddFormSubmit(evt) {
  const newCard = {
    name: addFormElement["title"].value,
    link: addFormElement["link"].value,
  };
  gallery.prepend(createCard(newCard));
  closePopup(addPlacePopup);
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector(".popup__active");
    closePopup(popupToClose);
  }
}

function handlePopupCloseMouseEvent(evt) {
  if (evt.target.classList.contains("popup__active")) {
    closePopup(evt.target);
  }
  if (evt.target.classList.contains("popup__close-btn")) {
    closePopup(evt.currentTarget);
  }
}

function setPopupCloseMouseEventListeners() {
  const popupsList = document.querySelectorAll(".popup");
  popupsList.forEach((popup) => {
    popup.addEventListener("mousedown", handlePopupCloseMouseEvent);
  });
}

function removePopupCloseMouseEventListeners() {
  const popupsList = document.querySelectorAll(".popup");
  popupsList.forEach((popup) => {
    popup.removeEventListener("mousedown", handlePopupCloseMouseEvent);
  });
}

editProfileBtn.addEventListener("click", function () {
  const editSubmitBtn = editFormElement.querySelector(
    validationConfig.submitButtonSelector
  );
  const editInputList = Array.from(
    editFormElement.querySelectorAll(validationConfig.inputSelector)
  );
  editFormElement["name"].value = profileNameTxt.textContent;
  editFormElement["description"].value = profileDescTxt.textContent;
  toggleButtonState(editInputList, editSubmitBtn, validationConfig);
  openPopup(editProfilePopup);
});

addPlaceBtn.addEventListener("click", function () {
  addFormElement.reset();
  enableValidation(validationConfig);
  openPopup(addPlacePopup);
});

enableValidation(validationConfig);
editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
initiateGallery();
