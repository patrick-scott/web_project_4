//declare variables
const profilePopup = document.querySelector(".popup");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
const titleInputField = document.querySelector(".popup__input_type_title");
const linkInputField = document.querySelector(".popup__input_type_link");

//imports
import {
  renderCard,
  addNewModal,
  addFormSubmitButton,
  addForm,
  nameInputField,
  descriptionInputField,
} from "./index.js";

//Function - toggle visibility
export function toggleModalVisibility(modal) {
  //toggle popup
  modal.classList.toggle("popup_opened");
  //if popup is opened add event listener if opened, remove if not open
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keydown", closeByEscape);
  } else {
    document.removeEventListener("keydown", closeByEscape);
  }
}

//Function | event - update profile info on form submission
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //update name/tile & description
  profileTitle.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  toggleModalVisibility(profilePopup);
}

//Function | event - add new image Card
export function handleNewImageFormSubmit(evt) {
  evt.preventDefault();

  //declare variable for form
  const newPlace = {};
  newPlace.name = titleInputField.value;
  newPlace.link = linkInputField.value;
  // clone a new card/template
  renderCard(newPlace, "#card-template");
  // renderCard(newPlace, ".popup_type_add-card");

  toggleModalVisibility(addNewModal);

  //disbale button
  addFormSubmitButton.classList.add("popup__submit-form-btn-disabled");
  addFormSubmitButton.disabled = true;

  //reset form
  addForm.reset();
}

//Function | event - close on escape button click
export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    toggleModalVisibility(openedPopup);
  }
}

//Function - open profile popup
export function openProfilePopup(name, description) {
  // fill in the form fields
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  //toggle popup
  toggleModalVisibility(profilePopup);
}
