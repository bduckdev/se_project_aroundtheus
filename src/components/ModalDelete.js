import Modal from "./Modal.js";

export default class ModalDelete extends Modal {
  constructor({ modalSelector, handleCardRemoval }) {
    super({ modalSelector });
    this._deleteButton = document.getElementById("delete-image-confirm");
    this._handleCardRemoval = handleCardRemoval;
  }
  open(card) {
    this._setEventListeners(card);
    super.open();
  }
  _setEventListeners(card) {
    this._deleteButton.addEventListener("click", () => {
      this._handleCardRemoval(card);
      this.close();
    });
    super.setEventListeners();
  }
  close() {
    super.close();
  }
}
