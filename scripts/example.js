/*-----------------------------------------------------------------------------------------*
 *                                           Cards
 *-----------------------------------------------------------------------------------------*/
// Sets the cards' template.
const cardSelector = "#card-template";

const popupWithImage = new PopupWithImage({
  popupSelector: popupImage,
});

popupWithImage.setEventListeners();

const handleOpenPopup = (link, text) => {
  popupWithImage.open(link, text);
};
//example code

//function to create card
const createNewCard = (data) => {
  const card = new Card(data, cardSelector, handleOpenPopup);
  placeCards.addItem(card.getView());
  return card;
};

//new class of Section //calls above function in renderer();
const placeCards = new Section({
  renderer: (item) => {
    createNewCard(item);
  },
  containerSelector: "places__list",
});
//render items on pages
placeCards.renderItems(initialCards);

const handleFormEdit = (values) => {
  userInfo.setUserInfo(values.name, values.description);
  editPopupPreview.close();
};

const handleFormAdd = (data) => {
  createNewCard(data);
  addPopupPreview.close();
};

/*-----------------------------------------------------------------------------------------*
 *                                     Classes
 *-----------------------------------------------------------------------------------------*/

const addPopupPreview = new PopupWithForm({
  popupElement: popupAdd,
  handleFormSubmit: handleFormAdd,
});
const editPopupPreview = new PopupWithForm({
  popupElement: popupEdit,
  handleFormSubmit: handleFormEdit,
});
