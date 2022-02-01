// get all relevant elements from the DOM
//get profile elements
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
//get edit profile elements
const profilePopup = document.querySelector(".popup");
const modalContainer = document.querySelector(".popup__container");
const editForm = document.querySelector(".popup__form_type_edit");
const profileCloseButton = document.querySelector(
  ".popup__close-button_type_edit"
);
const nameInputField = editForm.querySelector(".popup__input_type_name");
const descriptionInputField = editForm.querySelector(
  ".popup__input_type_description"
);
//get new card elements
const addNewModal = document.querySelector(".popup_type_add-card");
const closeAddForm = document.querySelector(".popup__close-button_type_add");
const addForm = document.querySelector(".popup__form_type_add");
const titleInputField = addForm.querySelector(".popup__input_type_title");
const linkInputField = addForm.querySelector(".popup__input_type_link");
const addFormInput = addNewModal.querySelector("popup__input");
const addFormSubmitButton = addNewModal.querySelector(
  ".popup__submit-form-btn"
);
//get the new card template
const newCardTemplate = document.querySelector("#card-template").content;
//get section that holds cards/images
const elementSection = document.querySelector(".elements");

//get popup elements
const closeImage = document.querySelector(".popup__close-button_type_image");
const imagePopup = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__image-caption");
const imageModal = document.querySelector(".popup_type_image-modal");
const imageModalWrapper = document.querySelector(
  ".popup__container_type_image-modal"
);

// Event Listeners
editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleNewImageFormSubmit);
editProfileButton.addEventListener("click", () => {
  openProfilePopup(nameInputField, descriptionInputField);
});
addCardButton.addEventListener("click", () => {
  addFormSubmitButton.classList.add("popup__submit-form-btn-disabled");
  addFormSubmitButton.disabled = true;
  toggleModalVisibility(addNewModal);
});

imagePopup.addEventListener("click", (evt) => {
  handleOverlayClick(evt, imagePopup);
});

//close popups on "X" button click
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      toggleModalVisibility(popup);
    } else if (evt.target.classList.contains("popup__close-button")) {
      toggleModalVisibility(popup);
    }
  });
});

// Arrays - Initial cards
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

//Function - render card
const renderCard = (item, elementSection) => {
  const newCard = getNewCard(item);
  elementSection.prepend(newCard);
};

//Function - close on escape button click
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    toggleModalVisibility(openedPopup);
    removeActiveImageClass(openedPopup);
  }
}

//Function - close when overlay clicked
const handleOverlayClick = (evt, openedPopup) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__container")
  ) {
    toggleModalVisibility(openedPopup);
  }
};

//Function - remove active image modal class
const removeActiveImageClass = (clickedImagePopup) => {
  if (clickedImagePopup.classList.contains("popup_type_image-modal-active")) {
    clickedImagePopup.classList.toggle("popup_type_image-modal-active");
  }
};

//Function - get card data
const getNewCard = (item) => {
  const newCard = newCardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = newCard.querySelector(".card__like-button");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const cardImage = newCard.querySelector(".card__image");
  // add content
  cardImage.src = item.link;
  newCard.querySelector(".card__location").textContent = item.name;
  cardImage.alt = item.name;
  // toggle Like button on off
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-liked");
  });
  //delete card
  deleteButton.addEventListener("click", () => {
    newCard.remove();
  });
  //image popup modal
  cardImage.addEventListener("click", () => {
    imageModal.classList.toggle("popup_type_image-modal-active");
    //transitions
    toggleModalVisibility(imageModal);

    modalCaption.textContent = item.name;
    imagePopup.src = item.link;
    imagePopup.alt = item.name;
  });
  return newCard;
};

//Function - update profile info on form submission
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  //update name/tile & description
  profileTitle.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  toggleModalVisibility(profilePopup);
}

//Function - Add New Image Card
function handleNewImageFormSubmit(evt) {
  evt.preventDefault();

  //declare variable for form data
  const newPlace = {};
  newPlace.name = titleInputField.value;
  newPlace.link = linkInputField.value;
  // clone a new card/template
  renderCard(newPlace, elementSection);

  toggleModalVisibility(addNewModal);

  //disbale button
  addFormSubmitButton.classList.add("popup__submit-form-btn-disabled");
  addFormSubmitButton.disabled = true;

  //reset form
  addForm.reset();
}

//load initial cards
initialCards.forEach((item) => {
  renderCard(item, elementSection);
});

//Function - toggle visibility
function toggleModalVisibility(modal) {
  //toggle popup
  modal.classList.toggle("popup_opened");
  //if popup is opened add event listener if opened, remove if not open
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keydown", closeByEscape);
  } else {
    document.removeEventListener("keydown", closeByEscape);
  }
}

//Function - open profile popup
function openProfilePopup(name, description) {
  // fill in the form fields
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  //toggle popup
  toggleModalVisibility(profilePopup);
}
