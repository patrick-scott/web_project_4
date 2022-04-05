/** profile elements */
export const profileTitle = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__subtitle");
export const profilePopup = document.querySelector(".popup");
/** buttons */
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
/** popup - types */
export const editProfilePopup = document.querySelector(
  ".popup_type_edit-profile"
);
export const addImagePopup = document.querySelector(".popup_type_add-card");
const cardImagePopup = document.querySelector(".popup_type_image-modal");
/** popup - forms */
export const editForm = document.querySelector(".popup__form_type_edit");
export const addForm = document.querySelector(".popup__form_type_add");
/** popup - inputs */
export const nameInputField = editForm.querySelector(".popup__input_type_name");
export const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);
export const titleInputField = addForm.querySelector(
  ".popup__input_type_title"
);
export const linkInputField = addForm.querySelector(".popup__input_type_link");
/** popup - buttons */
export const addFormSubmitButton = addImagePopup.querySelector(
  ".popup__submit-form-btn"
);
/** popup - images */
const popupImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__image-caption");

/** import modules */
import FormValidator from "./formValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import Card from "./card.js";
import Section from "./Section.js";
import { initialCards, formSettings } from "../utils/constants.js";

/**  create an instance for each form */
const newImageFormValidation = new FormValidator(formSettings, addForm);
newImageFormValidation.enableValidation();
const editProfileFormValidation = new FormValidator(formSettings, editForm);
editProfileFormValidation.enableValidation();

/** new Popup class - Edit Profile  */
const editPopup = new PopupWithForm(
  {
    handleFormSubmit: (inputValues) => {
      const formData = new UserInfo({
        name: inputValues.name,
        job: inputValues.description,
      });

      const formDatatatat = formData.getUserInfo();
      formData.setUserInfo(formDatatatat);
    },
  },
  editProfilePopup
);

/** new Popup class - Add New Card  */
const newCardPopup = new PopupWithForm(
  {
    handleFormSubmit: (inputValues) => {
      const newCard = new Card(
        {
          handleCardClick: () => {
            /** transitions */
            // const deleteButton = newCardElement.querySelector(".card__like-button");
            // const likeButton = newCardElement.querySelector(".card__like-button");
            /** set event listener to delete button */

            imagePopup.open();
            /** add dom elements to popup */
            popupImage.src = newCard.link;
            popupImage.alt = newCard.name;
            modalCaption.textContent = newCard.name;
          },
        },
        inputValues,
        "#card-template"
      );
      /** create new card element */
      const newCardElement = newCard.createNewCard();
      /** add event listeners on click evt */
      newCardElement.addEventListener("click", () => {
        newCard.handleCardClick();
      });

      /** add card to section */
      popupSection.addItems(newCardElement);
      /** disbale button */
      newImageFormValidation.disableButton();
      /** reset form */
      addForm.reset();
    },
  },
  addImagePopup //css selector
);

/** new Popup class - Add New Card  */
const imagePopup = new PopupWithImage(cardImagePopup);

/** set event Listeners for popup forms*/
editPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();

/** set click event listeners for edit & add buttons*/
editProfileButton.addEventListener("click", () => {
  editProfilePopup.classList.add("popup_opened"); //this needs to call editProfile.open(); ?
  nameInputField.value = profileTitle.textContent;
  descriptionInputField.value = profileDescription.textContent;
});
addCardButton.addEventListener("click", () => {
  newImageFormValidation.disableButton();
  addImagePopup.classList.add("popup_opened"); //this needs to call /newCardPopup.open(); ?
});

/** create new Section class */
const popupSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(
        {
          handleCardClick: () => {
            imagePopup.open();
            /** add dom elements to popup */
            popupImage.src = newCard.link;
            popupImage.alt = newCard.name;
            modalCaption.textContent = newCard.name;
          },
        },
        item,
        "#card-template"
      );
      const newCardElement = newCard.createNewCard();

      document.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("card__image")) {
          newCard.handleCardClick();
        }
      });

      /** add card to section */
      popupSection.addItems(newCardElement);
    },
  },
  ".elements"
);

/** call renderer function - iterate through array */
popupSection.renderer();
