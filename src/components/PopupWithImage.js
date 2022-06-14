import { popupCaption, popupImage } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(imageData, popupSelector) {
    super(popupSelector);
    this._link = imageData.link;
    this._title = imageData.title;
  }

  open() {
    popupImage.src = this._link;
    popupImage.alt = this._title;
    popupCaption.textContent = this._title;
    super.open();
  }
}
