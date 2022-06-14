import { popupFormSettings } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
    this._formElement = this._popup.querySelector(
      popupFormSettings.formSelector
    );
    this._formElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
