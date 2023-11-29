import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);

const profileAddButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardName = document.querySelector("#add-card-title-input");
const addCardLink = document.querySelector("#add-card-image-input");

const imageModal = document.querySelector("#view-image-modal");
const imageModalText = document.querySelector("#image-modal-text");
const imageModalImage = document.querySelector("#image-modal-image");

const modals = document.querySelectorAll(".modal");

const formEls = [...document.querySelectorAll("form")];

// FUNCTIONS

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}
// event handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.innerText = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardName.value;
  const link = addCardLink.value;
  const cardElement = new Card(
    { name, link },
    "#card-template",
    handleImageClick,
  );
  cardElement.getView();
  e.target.reset();
  closeModal(addCardModal);
  addCardValidator.disableSubmitButton();
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
function handleModalCloseClick(e, modal) {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(modal);
  }
  if (e.target.classList.contains("modal__close")) {
    closeModal(modal);
  }
}
function handleImageClick(card) {
  imageModalImage.src = card.cardImageEl.src;
  imageModalImage.alt = card.cardImageEl.alt;
  imageModalText.textContent = card.cardTitleEl.innerText;
  openModal(imageModal);
}
// event listeners

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileNameInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
});

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

profileAddButton.addEventListener("click", () => openModal(addCardModal));

addCardModal.addEventListener("submit", handleAddCardSubmit);

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => handleModalCloseClick(e, modal));
});

initialCards.forEach((cardData) => {
  const cardEl = new Card(cardData, "#card-template", handleImageClick);
  cardEl.getViewInitial();
});

// validation

const validatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardValidator = new FormValidator(validatorConfig, addCardModal);
addCardValidator.enableValidation();

const profileEditValidator = new FormValidator(
  validatorConfig,
  profileEditModal,
);
addCardValidator.enableValidation();
profileEditValidator.enableValidation();
