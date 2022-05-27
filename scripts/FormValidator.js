export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setInputEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputEventListeners(this._formElement);
  }

  resetValidation() {
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((input) => {
      if (input.classList.contains(this._settings.inputErrorClass)) {
        input.classList.remove(this._settings.inputErrorClass);
        this._hideInputError(input);
      }
    });
  }
}
