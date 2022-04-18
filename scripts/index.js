const profileNameTxt = document.querySelector(".profile__name-title");
const profileDescTxt = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");

const editProfilePopup = document.getElementById("edit-popup");
const editFormElement = document.getElementById("edit-form");
const editProfileCloseBtn = editProfilePopup.querySelector(".popup__close-btn");

const addPlacePopup = document.getElementById("add-popup");
const addFormElement = document.getElementById("add-form");
const addFormInputs = addFormElement.querySelectorAll(".popup__input");
const addPlaceCloseBtn = addPlacePopup.querySelector(".popup__close-btn");

const cardTemplate = document.querySelector("#card-template").content;

const photoPreviewPopup = document.getElementById("photo-viewer-popup");
const photoPreviewCloseBtn =
  photoPreviewPopup.querySelector(".popup__close-btn");

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
}

function closePopup(popup) {
  popup.classList.remove("popup__active");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameTxt.textContent = editFormElement["name"].value;
  profileDescTxt.textContent = editFormElement["description"].value;
  closePopup(editProfilePopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addFormElement["title"].value,
    link: addFormElement["link"].value,
  };
  gallery.prepend(createCard(newCard));
  closePopup(addPlacePopup);
}

initiateGallery();

editProfileBtn.addEventListener("click", function () {
  editFormElement["name"].value = profileNameTxt.textContent;
  editFormElement["description"].value = profileDescTxt.textContent;
  openPopup(editProfilePopup);
});

addPlaceBtn.addEventListener("click", function () {
  addFormElement.reset();
  openPopup(addPlacePopup);
});

editProfileCloseBtn.addEventListener("click", function () {
  closePopup(editProfilePopup);
});

addPlaceCloseBtn.addEventListener("click", function () {
  closePopup(addPlacePopup);
});

photoPreviewCloseBtn.addEventListener("click", function () {
  closePopup(photoPreviewPopup);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
