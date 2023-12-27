import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._image = document.querySelector("#image-modal-image");
    this._caption = document.querySelector("#image-modal-text");
  }
  open(card) {
    this._image.src = card.cardImageEl.src;

    this._image.alt = card.cardImageEl.alt;

    this._caption.textContent = card.cardTitleEl.textContent;

    super.open();
  }
}
