import trashCanSrc from "../images/trash-can.png";
import likeButtonSrc from "../images/like-button.svg";

export default class Card {
  constructor({ handleCardClick }, item, newCardTemplate) {
    this.handleCardClick = handleCardClick;
    this.name = item.name;
    this.link = item.link;
    this._newCardTemplate = newCardTemplate;
  }

  /** _private method - working with markup */
  _getTemplate() {
    //const cardElement = document.querySelector(this._newCardTemplate).content;
    const cardElement = document.querySelector("#card-template").content;
    const card = cardElement.querySelector(".card").cloneNode(true);
    return card;
  }

  /** public method - toggle Like button on & off */
  _handleLikeButton = (likeButton) => {
    likeButton.classList.toggle("card__like-button-liked");
  };
  /** public method -  delete card */
  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    /** set event listener to delete button */
    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    /** set event listener to Like button */
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeButton(likeButton);
    });
  }

  /** public method - Return a fully functional populated card */
  createNewCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    /** get dome elements */
    const cardImage = this._element.querySelector(".card__image");
    const cardLocation = this._element.querySelector(".card__location");

    const trashCanIcon = this._element.querySelector(
      "#card__delete-button-icon"
    );
    trashCanIcon.src = trashCanSrc;
    const likeButtonIcon = this._element.querySelector(
      "#card__like-button-icon"
    );
    likeButtonIcon.src = likeButtonSrc;

    /** add content to new card */
    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardLocation.textContent = this.name;

    /** return fully functional card */
    return this._element;
  }
}
