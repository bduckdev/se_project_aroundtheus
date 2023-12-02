export default class FormValidator {
  constructor(config, targetForm) {
    this._config = config;
    this._targetForm = targetForm;
  }
  _showInputError(inputEl) {
    const errorMessageEl = this._targetForm.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._config.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._config.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._targetForm.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._config.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._config.errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _toggleButtonState(inputEls, submitButton) {
    let foundInvalid = false;
    inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      this.disableSubmitButton();
    } else {
      submitButton.classList.remove(this._config.inactiveButtonClass);
      submitButton.disabled = false;
    }
    //disable and enable the submit button
  }
  _setEventListeners() {
    const inputSelector = this._config.inputSelector;
    const inputEls = [...this._targetForm.querySelectorAll(inputSelector)];
    const submitButton = this._targetForm.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState(inputEls, submitButton);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });
  }
  enableValidation() {
    const formEl = this._targetForm;
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners(formEl);
  }
  disableSubmitButton() {
    const submitButton = this._targetForm.querySelector(
      this._config.submitButtonSelector
    );
    submitButton.classList.add(this._config.inactiveButtonClass);
    submitButton.disabled = true;
  }
}
