export default class FormValidator {
  constructor(settings, formElement) {
    /** formElement is the specific formClass - add or edit */
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  /**  _privateMethods - toggle input error */
  _showInputError(errorElement, inputElement) {
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorClass);
  }
  _hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(this._errorClass);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  /**  _privateMethods - check if input is valid */
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  /**  _privateMethods - check if input is invalid */
  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => !inputElement.validity.valid);

  /**  _privateMethod - changing the state of the Submit button */
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton();
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  /**  _privateMethod - adding all the needed handlers */
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  /** public method - disable button */
  disableButton() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  /** public Enable Validation function */
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }
}
