// get all relevant elements from the DOM

const modalWindow = document.querySelector('.popup');

const editForm = document.querySelector('.popup__edit-form');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

const profileTitle = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');


const titleInputField = editForm.querySelector('.popup__input_type_name');
const descriptionInputField = editForm.querySelector('.popup__input_type_description');



//write functions to toggle modal visibility & submit button

function toggleModalVisibility () {
  if (!modalWindow.classList.contains('popup_opened')) {
    titleInputField.value = profileTitle.textContent;
    descriptionInputField.value = profileDescription.textContent;
  }


  modalWindow.classList.toggle('popup_opened');

}

function formSubmitHandler (evt) {
  evt.preventDefault ();

  profileTitle.textContent = titleInputField.value;
  profileDescription.textContent = descriptionInputField.value;

  toggleModalVisibility ();
}

// connecting functions to elements

editForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', toggleModalVisibility);
closeButton.addEventListener('click', toggleModalVisibility);

