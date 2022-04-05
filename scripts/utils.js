/** Function - toggle visibility */
export function toggleModalVisibility(modal) {
  /** toggle popup */
  modal.classList.toggle("popup_opened");

  /** if popup is opened add event listener if opened, remove if not open */
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keydown", closeByEscape);
  } else {
    document.removeEventListener("keydown", closeByEscape);
  }
}

/** Function | event - close on escape button click */
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    toggleModalVisibility(openedPopup);
  }
}
