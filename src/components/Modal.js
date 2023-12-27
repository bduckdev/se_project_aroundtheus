export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleCloseClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
    if (e.target.classList.contains("modal__close")) {
      this.close();
    }
  };
  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._modalElement.addEventListener("click", this._handleCloseClick);
  }
}
