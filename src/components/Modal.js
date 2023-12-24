export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }
  open() {
    this._modalElement.classList.add("modal_opened");
  }
  close() {
    this._modalElement.classList.remove("modal_opened");
  }
  _handleCloseClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
    if (e.target.classList.contains("modal__close")) {
      this.close();
    }
  }
  _handleEscClose(e) {
    if (e.key === "Escape") {
      document.removeEventListener("keydown", this._handleEscClose);
      this.close();
    }
  }
  setEventListeners() {
    this._modalElement.addEventListener("click", (e) => {
      this._handleCloseClick(e);
    });
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }
}
