export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  /** public methods */
  renderer() {
    /** renter items on page */
    this._items.forEach((item) => this._renderer(item));
  }

  addItems(element) {
    /** add dom elements to container */
    this._containerSelector.prepend(element);
  }
}
