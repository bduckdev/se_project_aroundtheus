import * as consts from "../utils/constants.js";
import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
  }
  open(card) {
    consts.imageModalImage.src = card.cardImageEl.src;

    consts.imageModalImage.alt = card.cardImageEl.alt;

    consts.imageModalText.textContent = card.cardTitleEl.textContent;

    super.open();
  }
}
