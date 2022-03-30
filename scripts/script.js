const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileNameTxt = document.querySelector(".profile__name-title");
const profileDescTxt = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const formInputs = formElement.querySelectorAll(".popup__input");
const popupCloseBtn = document.querySelector(".popup__close-btn");
const popupWindow = document.querySelector(".popup");

function openPopup() {
  formInputs[0].value = profileNameTxt.textContent;
  formInputs[1].value = profileDescTxt.textContent;
  popupWindow.classList.add("popup__active");
}

function closePopup() {
  popupWindow.classList.remove("popup__active");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameTxt.textContent = formInputs[0].value;
  profileDescTxt.textContent = formInputs[1].value;
  closePopup();
}

profileEditBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
