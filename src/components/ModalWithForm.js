import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const _modalInputs = [...this._modalForm.querySelectorAll(".modal__input")];
    const inputs = {};
    _modalInputs.forEach((input) => {
      const key = input.name;
      const value = input.value;
      inputs[key] = value;
    });
    return inputs;
  }
  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      const inputs = this._getInputValues();
      this._handleFormSubmit(e, inputs);
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
