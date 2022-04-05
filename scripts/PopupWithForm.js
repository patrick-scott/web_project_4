import Popup from "./Popup.js";
import {
  titleInputField,
  linkInputField,
  nameInputField,
  descriptionInputField,
} from "../scripts/index.js";

const titleInput = document.querySelector(".popup__input_type_title");

const popupForm = document.querySelector(".popup__form");
const popup = document.querySelector(".popup");

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
  }

  /** get values from form inputs; return as object */
  _getInputValues() {
    /** collects data from all the input fields and returns that data as an object. */
    if (this._popupSelector.classList.contains("popup_type_edit-profile")) {
      const profileData = {
        name: nameInputField.value,
        description: descriptionInputField.value,
      };
      return profileData;
    } else {
      const cardData = {
        name: titleInput.value,
        link: linkInputField.value,
      };
      return cardData;
    }
  }

  open() {
    super.open();
    popup.classList.add(".popup_opened");
  }
  close() {
    super.close();
    //reset form
    popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      /** handle form submission */
      evt.preventDefault();
      /** get input values */
      const inputValues = this._getInputValues();
      console.log(inputValues);
      /**callBack function - HandleFormSubmit */
      this.handleFormSubmit(inputValues);
      this.close();
    });
  }
}
