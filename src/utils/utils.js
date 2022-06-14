import { FormValidator } from "../components/FormValidator.js";
import { formValidators } from "./constants.js";

export function initiateFormValidators(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    formValidators[formElement.getAttribute("name")] = validator;
    validator.enableValidation();
  });
}
