/** image imports */
import "./styles/index.css";
import addCardSrc from "./images/add-button.svg";
import closeIcon from "./images/Close-Icon.png";
import editProfileIcon from "./images/edit-button.svg";
import headshotSrc from "./images/headshot.png";
import likeButtonLiked from "./images/like-button-liked.svg";
import likeButtonDark from "./images/like-button-dark.svg";
import logoSrc from "./images/logo.svg";
/** images connectors*/
const addCardIcon = document.getElementById("profile__add-button");
addCardIcon.src = addCardSrc;

const logo = document.getElementById("header__logo");
logo.src = logoSrc;

const profileAvatar = document.getElementById("profile__avatar");
profileAvatar.src = headshotSrc;

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
import FormValidator from "../src/scripts/formValidator.js";
import PopupWithForm from "../src/scripts/PopupWithForm.js";
import PopupWithImage from "../src/scripts/PopupWithImage.js";
import UserInfo from "../src/scripts/UserInfo.js";
import Card from "../src/scripts/card.js";
import Section from "../src/scripts/Section.js";
import { initialCards, formSettings } from "../src/utils/constants.js";

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
      const addPopupCard = new Card(
        {
          handleCardClick: () => {
            imagePopup.open();
            /** add dom elements to popup */
            popupImage.src = addPopupCard.link;
            popupImage.alt = addPopupCard.name;
            modalCaption.textContent = addPopupCard.name;
          },
        },
        inputValues,
        "#card-template"
      );
      /** create new card element */
      const newCardElement = addPopupCard.createNewCard();
      /** add event listeners on click evt */
      document.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("card__image")) {
          addPopupCard.handleCardClick();
        }
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
