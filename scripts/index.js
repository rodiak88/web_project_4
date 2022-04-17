const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileNameTxt = document.querySelector(".profile__name-title");
const profileDescTxt = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-btn");

const editPopup = document.getElementById("edit-popup");
const editFormElement = document.getElementById("edit-form");
const editFormInputs = editFormElement.querySelectorAll(".popup__input");

const addPopup = document.getElementById("add-popup");
const addFormElement = document.getElementById("add-form");
const addFormInputs = addFormElement.querySelectorAll(".popup__input");

const photoPreviewPopup = document.getElementById("photo-viewer-popup");

const popupCloseBtn = document.querySelectorAll(".popup__close-btn");

const gallery = document.querySelector(".gallery__list");

function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
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

function openPopup(popupID) {
  popupID.classList.add("popup__active");
}

function closePopup(evt) {
  evt.target.closest(".popup__active").classList.remove("popup__active");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameTxt.textContent = editFormInputs[0].value;
  profileDescTxt.textContent = editFormInputs[1].value;
  closePopup(evt);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addFormInputs[0].value,
    link: addFormInputs[1].value,
  };
  gallery.prepend(createCard(newCard));
  closePopup(evt);
}

initiateGallery();

profileEditBtn.addEventListener("click", function () {
  editFormInputs[0].value = profileNameTxt.textContent;
  editFormInputs[1].value = profileDescTxt.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", function () {
  addFormElement.reset();
  openPopup(addPopup);
});

popupCloseBtn.forEach((item) => {
  item.addEventListener("click", closePopup);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
