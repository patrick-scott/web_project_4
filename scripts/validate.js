//functions to control visual input error
const showInputError = (formElement, inputElement, errorMessage) => {
  console.log(`#${inputElement.id}-error`);
  console.log(inputElement);
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input-error");
  errorElement.classList.remove("popup__form-error_active");
  errorElement.textContent = "";
};

//check if input is valid
const checkInputValidity = (formElement, inputElement, enums) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, enums);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-form-btn-disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__submit-form-btn-disabled");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//start
const enableValidation = ({ formSelector, ...rest }) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-form-btn",
  inactiveButtonClass: ".popup__submit-form-btn-disabled",
  inputErrorClass: ".popup__form-error",
  ErrorClass: ".popup__error_visible",
});
