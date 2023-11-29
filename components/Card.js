export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this.cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__button_active");
  }
  _handleDeleteButton() {
    this._cardEl.remove();
    this._cardEl = null;
  }
  getViewInitial() {
    this._cardEl = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true)
      .querySelector(".card");

    this.cardImageEl = this._cardEl.querySelector("#card-image");
    this.cardTitleEl = this._cardEl.querySelector("#card-title");
    this._likeButton = this._cardEl.querySelector("#card-button");
    this._deleteButton = this._cardEl.querySelector("#card-delete");
    this.cardTitleEl.innerText = this._name;
    this.cardImageEl.src = this._link;
    this.cardImageEl.alt = this._name;
    document.querySelector(".gallery__container").append(this._cardEl);
    this._setEventListeners();
  }
  getView() {
    this._cardEl = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true)
      .querySelector(".card");

    this.cardImageEl = this._cardEl.querySelector("#card-image");
    this.cardTitleEl = this._cardEl.querySelector("#card-title");
    this._likeButton = this._cardEl.querySelector("#card-button");
    this._deleteButton = this._cardEl.querySelector("#card-delete");
    this.cardTitleEl.innerText = this._name;
    this.cardImageEl.src = this._link;
    this.cardImageEl.alt = this._name;
    document.querySelector(".gallery__container").prepend(this._cardEl);
    this._setEventListeners();
  }
}
