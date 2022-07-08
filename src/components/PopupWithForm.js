import { popupFormSettings } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(
      popupFormSettings.formSelector
    );
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popup.querySelectorAll(popupFormSettings.inputSelector)
    );
    const inputsObj = {};
    inputList.forEach((inputElement) => {
      inputsObj[inputElement.name] = inputElement.value;
    });
    return inputsObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      // this._formElement.reset();
    });
  }

  changeButtonText(text) {
    this._formElement.querySelector(".popup__submit-btn").textContent = text;
  }

  open() {
    this._formElement.reset();
    super.open();
  }
}
