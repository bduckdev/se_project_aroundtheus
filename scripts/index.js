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

/* ELEMENTS */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector("#profile-edit-close");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);
const profileForm = document.forms["profile-edit-form"];
const galleryListEl = document.querySelector("#gallery-container");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileAddButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector("#add-card-close");
const addCardName = document.querySelector("#add-card-title-input");
const addCardLink = document.querySelector("#add-card-image-input");
const addCardForm = document.forms["add-card-form"];

const imageModal = document.querySelector("#view-image-modal");
const imageModalText = document.querySelector("#image-modal-text");
const imageModalImage = document.querySelector("#image-modal-image");
const imageModalCloseButton = document.querySelector("#view-image-close");

const modalContainers = document.querySelectorAll(".modal__container");
const modals = document.querySelectorAll(".modal");

/* FUNCTIONS */

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardTitleEl = cardElement.querySelector("#card-title");
  const likeButton = cardElement.querySelector("#card-button");
  const deleteButton = cardElement.querySelector("#card-delete");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    imageModalImage.src = cardImageEl.src;
    imageModalImage.alt = cardImageEl.alt;
    imageModalText.textContent = cardTitleEl.innerText;
    openModal(imageModal);
  });
  cardTitleEl.innerText = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (e) => handleEscapeKey(e));
}
/* event handlers */

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
  const cardElement = getCardElement({ name, link });
  galleryListEl.prepend(cardElement);
  e.target.reset();
  closeModal(addCardModal);
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
/* event listeners */

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileNameInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
});

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

profileAddButton.addEventListener("click", () => openModal(addCardModal));

addCardModal.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryListEl.append(cardElement);
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => handleModalCloseClick(e, modal));
});
