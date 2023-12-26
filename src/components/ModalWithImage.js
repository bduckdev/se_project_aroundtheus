import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
  }
  open(card) {
    document.querySelector("#image-modal-image").src = card.cardImageEl.src;

    document.querySelector("#image-modal-image").alt = card.cardImageEl.alt;

    document.querySelector("#image-modal-text").textContent =
      card.cardTitleEl.textContent;

    super.open();
  }
}
