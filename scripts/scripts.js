// get all relevant elements from the DOM
//proile
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");

// Edit Profile modal
const modalWindow = document.querySelector(".popup");
const editForm = document.querySelector(".popup__edit-form");
const closeButton = document.querySelector(".popup__close-button");
const nameInputField = editForm.querySelector(".popup__input_type_name");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);

// Add Image modal
const addNewModal = document.querySelector(".popup-add");
const closeAddForm = document.querySelector(".popup-add__close-button");
const addForm = document.querySelector(".popup__add-form");
const titleInputField = addForm.querySelector(".popup__input_type_title");
const linkInputField = addForm.querySelector(".popup__input_type_link");

const newCardTemplate = document.querySelector("#card-template").content;
const elementSection = document.querySelector(".elements");

// connecting functions to elements
editForm.addEventListener("submit", formSubmitHandler);
addForm.addEventListener("submit", addFormSubmitHandler);

editButton.addEventListener("click", toggleModalVisibility);
addButton.addEventListener("click", toggleAddNewlVisibility);
closeButton.addEventListener("click", toggleModalVisibility);
closeAddForm.addEventListener("click", toggleAddNewlVisibility);

// Initial Cards Array
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

//Functions
//render card
const renderCard = (item, elementSection) => {
  const newCard = getNewCard(item);
  elementSection.append(newCard);
};

//get card data
const getNewCard = (item) => {
  const newCard = newCardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = newCard.querySelector(".card__like-button");
  const deleteButton = newCard.querySelector(".card__delete-button");

  // add content
  newCard.querySelector(".card__image").src = item.link;
  newCard.querySelector(".card__location").textContent = item.name;

  // toggle Like button on off
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-liked");
  });

  deleteButton.addEventListener("click", () => {
    // create variable to get the correct card to delete
    const cardToDelete = deleteButton.closest(".card");
    // remove card from dom
    cardToDelete.remove();
  });

  return newCard;
};

//update profile info on form submission
function formSubmitHandler(evt) {
  evt.preventDefault();
  //update name/tile & description
  profileTitle.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  toggleModalVisibility();
}

//Add New Image Card
function addFormSubmitHandler(evt) {
  evt.preventDefault();

  //declare variable for form data
  const newPlace = {};
  newPlace.name = titleInputField.value;
  newPlace.link = linkInputField.value;

  // clone a new card/template
  renderCard(newPlace, elementSection);

  // close modal
  toggleAddNewlVisibility();
}

// toggle profile modal visibility
function toggleModalVisibility() {
  if (!modalWindow.classList.contains("popup_opened")) {
    nameInputField.value = profileTitle.textContent;
    descriptionInputField.value = profileDescription.textContent;
  }
  modalWindow.classList.toggle("popup_opened");
}

// toggle 'Add New Image' modal visibility
function toggleAddNewlVisibility() {
  addNewModal.classList.toggle("popup-add_opened");
}

//load initial cards
initialCards.forEach((item) => {
  renderCard(item, elementSection);
});
