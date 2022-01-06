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
