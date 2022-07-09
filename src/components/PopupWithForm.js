import { popupFormSettings } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(
      popupFormSettings.formSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(popupFormSettings.inputSelector)
    );
    this._submitBtnElement = this._formElement.querySelector(
      popupFormSettings.submitButtonSelector
    );
    this._submitBtnText = this._submitBtnElement.textContent;
  }

  _getInputValues() {
    const inputsObj = {};
    this._inputList.forEach((inputElement) => {
      inputsObj[inputElement.name] = inputElement.value;
    });
    return inputsObj;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._formSubmit);
  }

  renderLoadingMsg(isLoading, message = "Saving...") {
    if (isLoading) {
      this._submitBtnElement.textContent = message;
    } else {
      this._submitBtnElement.textContent = this._submitBtnText;
    }
  }

  changeSubmitHandler(newHandler) {
    this._handleFormSubmit = newHandler;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _formSubmit = () => {
    this._handleFormSubmit(this._getInputValues());
  };
}
