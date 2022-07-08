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
  }

  changeButtonText(text) {
    this._formElement.querySelector(".popup__submit-btn").textContent = text;
  }

  changeSubmitHandler(newHandler) {
    this._handleFormSubmit = newHandler;
  }

  open() {
    super.open();
    this._formElement.reset();
    this._formElement.addEventListener("submit", this._formSubmit);
  }

  close() {
    this._formElement.removeEventListener("submit", this._formSubmit);
    super.close();
  }

  _formSubmit = () => {
    this._handleFormSubmit(this._getInputValues());
  };
}
