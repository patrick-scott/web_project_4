// get all relevant elements from the DOM

const modalWindow = document.querySelector(".popup");

const editForm = document.querySelector(".popup__edit-form");

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");

const titleInputField = editForm.querySelector(".popup__input_type_name");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

// connecting functions to elements
editForm.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", toggleModalVisibility);
closeButton.addEventListener("click", toggleModalVisibility);

// --Arrays--
// initial cards

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// --Functions--
// function: toggle modal visibility

function toggleModalVisibility() {
  if (!modalWindow.classList.contains("popup_opened")) {
    titleInputField.value = profileTitle.textContent;
    descriptionInputField.value = profileDescription.textContent;
  }

  modalWindow.classList.toggle("popup_opened");
}

// function: submit button
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = titleInputField.value;
  profileDescription.textContent = descriptionInputField.value;

  toggleModalVisibility();
}

// Function: add cards on page load
window.onload = function () {
  //code to grab contents of template
  const newCardTemplate = document.querySelector("#card-template").content;
  //code to grab .elements class
  const elementSection = document.querySelector(".elements");

  // for each arrayElement..
  initialCards.forEach((item) => {
    // clone the content of the newCardTemplate
    const newCard = newCardTemplate.querySelector(".card").cloneNode(true);
    // add content
    newCard.querySelector(".card__image").src = item.link;
    newCard.querySelector(".card__location").textContent = item.name;
    // then append the card to <section class="elements">
    elementSection.append(newCard);
  });
};
