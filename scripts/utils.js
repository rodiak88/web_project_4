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

export function setPopupCloseMouseEventListeners() {
  const popupsList = document.querySelectorAll(".popup");
  popupsList.forEach((popup) => {
    popup.addEventListener("mousedown", handlePopupCloseMouseEvent);
  });
}

export function openPopup(popup) {
  popup.classList.add("popup__active");
  document.addEventListener("keydown", handleEscKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup__active");
  document.removeEventListener("keydown", handleEscKey);
}
