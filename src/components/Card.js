export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteButton,
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });
    this.cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__button_active");
  }
  getView() {
    this._cardEl = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true)
      .querySelector(".card");

    this._id;
    this.cardImageEl = this._cardEl.querySelector("#card-image");
    this.cardTitleEl = this._cardEl.querySelector("#card-title");
    this._likeButton = this._cardEl.querySelector("#card-button");
    this._deleteButton = this._cardEl.querySelector("#card-delete");
    this.cardTitleEl.innerText = this._name;
    this.cardImageEl.src = this._link;
    this.cardImageEl.alt = this._name;
    this._setEventListeners();
    return this._cardEl;
  }
}
