import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageElement = this._popup.querySelector(".popup__photo");
    this._popupCaptionElement = this._popup.querySelector(".popup__photoTitle");
  }

  open(imageData) {
    this._popupImageElement.src = imageData.link;
    this._popupImageElement.alt = imageData.title;
    this._popupCaptionElement.textContent = imageData.title;
    super.open();
  }
}
