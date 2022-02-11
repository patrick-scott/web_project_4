// imports
import { toggleModalVisibility } from "./utils.js";

export default class Card {
  constructor(data, newCardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._newCardTemplate = newCardTemplate;
  }

  //_private methods - working with markup
  _getTemplate() {
    const cardElement = document.querySelector(this._newCardTemplate).content;
    const card = cardElement.querySelector(".card").cloneNode(true);
    return card;
  }
  //_privateMethod - toggle Like button on & off
  _handleLikeButton() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button-liked");
    });
  }
  //_privateMethod - delete card
  _handleDeleteButton() {
    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });
  }
  //_privateMethod - image popup modal
  _handleImagePopup() {
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      const imageModal = document.querySelector(".popup_type_image-modal");
      const imagePopup = document.querySelector(".popup__image");
      const modalCaption = document.querySelector(".popup__image-caption");
      //transitions
      toggleModalVisibility(imageModal);

      modalCaption.textContent = this._name;
      imagePopup.src = this._link;
      imagePopup.alt = this._name;
    });
  }

  //public method - Return a fully functional populated card
  createNewCard() {
    this._element = this._getTemplate();
    this._handleLikeButton();
    this._handleDeleteButton();
    this._handleImagePopup();

    // add content to new card
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__location").textContent = this._name;

    //return fully functional card
    return this._element;
  }
}
