import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const _modalInputs = [...this._modalForm.querySelectorAll(".modal__input")];
    const inputValues = {};
    _modalInputs.forEach((input) => {
      const key = input.name;
      const value = input.value;
      inputValues[key] = value;
    });
    return inputValues;
  }
  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      const inputValues = this._getInputValues();
      this._handleFormSubmit(e, inputValues);
    });
    super.setEventListeners();
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
