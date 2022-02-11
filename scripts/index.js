/**  get all relevant elements from the DOM */
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
export const editForm = document.querySelector(".popup__form_type_edit");

export const nameInputField = editForm.querySelector(".popup__input_type_name");
export const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);
export const addNewModal = document.querySelector(".popup_type_add-card");
export const addForm = document.querySelector(".popup__form_type_add");
export const addFormSubmitButton = addNewModal.querySelector(
  ".popup__submit-form-btn"
);
export const profileTitle = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__subtitle");
export const profilePopup = document.querySelector(".popup");
const titleInputField = document.querySelector(".popup__input_type_title");
const linkInputField = document.querySelector(".popup__input_type_link");
const cardSection = document.querySelector(".elements");
/** close popups on "X" button click */
const popups = document.querySelectorAll(".popup");

/** import modules */
import Card from "./card.js";
import { toggleModalVisibility, openProfilePopup } from "./utils.js";
import FormValidator from "./formValidator.js";

/**  Event Listeners */
editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleNewImageFormSubmit);
editProfileButton.addEventListener("click", () => {
  openProfilePopup(nameInputField, descriptionInputField);
});
addCardButton.addEventListener("click", () => {
  const addCardForm = new FormValidator(formSettings, addForm);
  addCardForm.disableButton();
  toggleModalVisibility(addNewModal);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      toggleModalVisibility(popup);
    } else if (evt.target.classList.contains("popup__close-button")) {
      toggleModalVisibility(popup);
    }
  });
});

/**  Arrays - Initial cards */
const initialCards = [
  {
    name: "Olympic National Park",
    link: "https://images.unsplash.com/photo-1625229250317-071640d8f9ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80",
  },
  {
    name: "Arches National Park",
    link: "https://images.unsplash.com/photo-1605999212421-3f0bf43857ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    name: "Glacier National Park",
    link: "https://images.unsplash.com/photo-1517909568143-3eea286ca180?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    name: "Grand Canyon National Park",
    link: "https://images.unsplash.com/photo-1564375704710-5d2d049998ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=894&q=80",
  },
  {
    name: "Colorado, USA",
    link: "https://images.unsplash.com/photo-1423450822265-fcd97e52ecb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=904&q=80",
  },
  {
    name: "Great Sand Dunes National Park",
    link: "https://images.unsplash.com/photo-1619408506946-a3caaf4e4d35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80",
  },
];

//JUST PASted

/** Function | event - update profile info on form submission */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  /** update name/tile & description */
  profileTitle.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  toggleModalVisibility(profilePopup);
}

/** Function | event - add new image Card */
function handleNewImageFormSubmit(evt) {
  evt.preventDefault();

  /** declare variable for form */
  const newPlace = {};
  newPlace.name = titleInputField.value;
  newPlace.link = linkInputField.value;
  /** clone a new card/template */
  renderCard(newPlace, "#card-template");
  toggleModalVisibility(addNewModal);

  /** disbale button */
  addFormSubmitButton.classList.add("popup__submit-form-btn-disabled");
  addFormSubmitButton.disabled = true;

  /** reset form */
  addForm.reset();
}

export const renderCard = (item, elementSection) => {
  const card = new Card(item, elementSection);
  const cardElement = card.createNewCard();
  cardSection.prepend(cardElement);
};

/**  load inital cards */
initialCards.forEach((item) => {
  renderCard(item, "#card-template");
});

/**  form Settings */
const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-form-btn",
  inactiveButtonClass: "popup__submit-form-btn-disabled",
  inputErrorClass: "popup__form-error_active",
  errorClass: ".popup__input-error",
};

/**  create an instance for each form */
const newImageFormValidation = new FormValidator(formSettings, addForm);
newImageFormValidation.enableValidation();
const editProfileFormValidation = new FormValidator(formSettings, editForm);
editProfileFormValidation.enableValidation();
