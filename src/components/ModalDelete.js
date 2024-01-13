import Modal from "./Modal.js";

export default class ModalDelete extends Modal {
  constructor({ modalSelector, cardRemovalHandler }, card) {
    super({ modalSelector });
    this._deleteButton = document.getElementById("delete-image-confirm");
    this._cardRemovalHandler = cardRemovalHandler;
    this.card = card;
  }
  open() {
    this._setEventListeners();
    super.open();
  }
  _handleCardRemoval = () => {
    this._cardRemovalHandler(this.card);
    this.close();
  };
  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleCardRemoval);
    super.setEventListeners();
  }
  close() {
    this._deleteButton.removeEventListener("click", this._handleCardRemoval);
    this.card = undefined;
    super.close();
  }
}
