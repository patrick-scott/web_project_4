/** imports */
import { profileTitle, profileDescription, profilePopup } from "./index.js";

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
export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    toggleModalVisibility(openedPopup);
  }
}

/** Function - open profile popup */
export function openProfilePopup(name, description) {
  /** fill in the form fields */
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  /** toggle popup */
  toggleModalVisibility(profilePopup);
}
