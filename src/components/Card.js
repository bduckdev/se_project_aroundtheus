export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLikeButton,
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });
    this.cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  removeCard() {
    this._cardEl.remove();
    this._cardEl = null;
  }
  _checkLiked() {
    if (this.isLiked) {
      this._toggleLikedClass();
    }
  }
  _toggleLikedClass() {
    this._likeButton.classList.toggle("card__button_active");
  }
  likeCard() {
    this._toggleLikedClass();
    this.isLiked = !this.isLiked;
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
    this._checkLiked();
    this._setEventListeners();
    return this._cardEl;
  }
}
