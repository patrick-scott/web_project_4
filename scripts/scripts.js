// get all relevant elements from the DOM
//get profile elements
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
//get edit profile elements
const modalWindow = document.querySelector(".popup");
const modalContainer = document.querySelector(".popup__container");
const editForm = document.querySelector(".popup__edit-form");
const closeButton = document.querySelector(".popup__close-button");
const nameInputField = editForm.querySelector(".popup__input_type_name");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);
//get new card elements
const addNewModal = document.querySelector(".popup-add");
const closeAddForm = document.querySelector(".popup-add__close-button");
const addForm = document.querySelector(".popup-add__add-form");
const titleInputField = addForm.querySelector(".popup-add__input_type_title");
const linkInputField = addForm.querySelector(".popup-add__input_type_link");
//get the new card template
const newCardTemplate = document.querySelector("#card-template").content;
//get tje section that holds cards/images
const elementSection = document.querySelector(".elements");
// get the image popup modal
const imageModal = document.querySelector(".image-modal");
const imageModalWrapper = document.querySelector(".image-modal__wrapper");
const modalImg = document.querySelector(".image-modal__image");
const closeImage = document.querySelector(".image-modal__close");

// connecting functions to elements
editForm.addEventListener("submit", formSubmitHandler);
addForm.addEventListener("submit", addFormSubmitHandler);
editButton.addEventListener("click", () => {
  toggleModalVisibility(modalWindow);
});
addButton.addEventListener("click", () => {
  toggleModalVisibility(addNewModal);
});
closeButton.addEventListener("click", () => {
  toggleModalVisibility(modalWindow);
});
closeAddForm.addEventListener("click", () => {
  toggleModalVisibility(addNewModal);
});
closeImage.addEventListener("click", () => {
  imageModal.classList.toggle("transition-in");
  imageModalWrapper.classList.toggle("transition-in");
});

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
  const clickedImage = newCard.querySelector(".card__image");
  // add content
  newCard.querySelector(".card__image").src = item.link;
  newCard.querySelector(".card__location").textContent = item.name;
  clickedImage.alt = item.name;
  // toggle Like button on off
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-liked");
  });

  //delete card
  deleteButton.addEventListener("click", () => {
    newCard.remove();
  });

  //image popup modal
  clickedImage.addEventListener("click", () => {
    imageModal.style.display = "block";
    //transitions
    // toggleModalVisibility(imageModal);
    // toggleModalVisibility(imageModalWrapper);
    imageModal.classList.toggle("transition-in");
    imageModalWrapper.classList.toggle("transition-in");
    const image = document.querySelector(".image-modal__image");
    const modalCaption = document.querySelector(".image-modal__caption");
    modalCaption.textContent =
      newCard.querySelector(".card__location").textContent;
    image.src = newCard.querySelector(".card__image").src;
  });
  return newCard;
};

//update profile info on form submission
function formSubmitHandler(evt) {
  evt.preventDefault();
  //update name/tile & description
  profileTitle.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  toggleModalVisibility(modalWindow);
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
  toggleModalVisibility(addNewModal);
}

//load initial cards
initialCards.forEach((item) => {
  renderCard(item, elementSection);
});

//toggle visibility
function toggleModalVisibility(modal) {
  if (!modal.classList.contains("popup_opened")) {
    nameInputField.value = profileTitle.textContent;
    descriptionInputField.value = profileDescription.textContent;
  }
  modal.classList.toggle("popup_opened");
  modal.classList.toggle("transition-in");
}
