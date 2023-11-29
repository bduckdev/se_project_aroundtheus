export default class FormValidator {
  constructor(config, targetForm) {
    this._config = config;
    this._targetForm = targetForm;
  }
  _showInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._config.errorClass);
  }

  _hideInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._config.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._config.errorClass);
  }
  _checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(formEl, inputEl);
    } else {
      this._hideInputError(formEl, inputEl);
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
      submitButton.classList.add(this._config.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._config.inactiveButtonClass);
      submitButton.disabled = false;
    }
    //disable and enable the submit button
  }
  _setEventListeners(formEl) {
    const inputSelector = this._config.inputSelector;
    const inputEls = [...this._targetForm.querySelectorAll(inputSelector)];
    const submitButton = this._targetForm.querySelector(
      this._config.submitButtonSelector,
    );
    this._toggleButtonState(inputEls, submitButton);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(formEl, inputEl);
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
      this._config.submitButtonSelector,
    );
    submitButton.classList.add(this._config.inactiveButtonClass);
    submitButton.disabled = true;
  }
}
