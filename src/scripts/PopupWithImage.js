import Popup from "./Popup.js";

/** get dom elements */
const popupToOpen = document.querySelector(".popup_type_image-modal");

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  /** open - modified*/
  open() {
    super.open();
    popupToOpen.classList.add("popup_opened");
  }
}
