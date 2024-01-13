import Modal from "./Modal.js";

export default class ModalDelete extends Modal {
  constructor({ modalSelector, cardRemovalHandler }, card) {
    super({ modalSelector });
    this._deleteButton = document.getElementById("delete-image-confirm");
    this._cardRemovalHandler = cardRemovalHandler;
    this.card = card;
  }
  open(card) {
    super.open();
    this._deleteButton.innerText = "Yes";
    this.card = card;
  }
  _handleCardRemoval = () => {
    this._cardRemovalHandler(this.card);
  };
  setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleCardRemoval);
    super.setEventListeners();
  }
  close() {
    this.card = undefined;
    super.close();
  }
}
