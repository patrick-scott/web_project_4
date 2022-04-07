export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  /** Toggle Open & Close */
  open() {
    document.addEventListener("click", this._handleEscClose);
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("click", this._handleEscClose());
  }

  /** handle 'esc' click evt to close popup */
  _handleEscClose() {
    document.addEventListener("keyup", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners() {
    //adds click event listner to X button & shaded area around to close
    document.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
      this._handleEscClose();
    });
  }
}
