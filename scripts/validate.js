//functions to control visual input error
const showInputError = (errorElement, inputElement, formData) => {
  inputElement.classList.add(formData.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(formData.inputErrorClass);
};

const hideInputError = (errorElement, inputElement, formData) => {
  inputElement.classList.remove(formData.errorClass);
  errorElement.classList.remove(formData.inputErrorClass);
  errorElement.textContent = "";
};

//check if input is valid
const checkInputValidity = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, formData);
  } else {
    hideInputError(errorElement, inputElement, formData);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function resetForm(form, formData) {
  const button = form.querySelector(formData.submitButtonSelector);
  button.disabled = true;
  form.reset();
}

const toggleButtonState = (inputList, buttonElement, formData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formData.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formData.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, formData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formData.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, formData);
      toggleButtonState(inputList, buttonElement, formData);
    });
  });
};

//start
const enableValidation = (formData) => {
  const getFormList = Array.from(
    document.querySelectorAll(formData.formSelector)
  );
  getFormList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formData);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-form-btn",
  inactiveButtonClass: "popup__submit-form-btn-disabled",
  inputErrorClass: "popup__form-error_active",
  errorClass: ".popup__input-error",
});
