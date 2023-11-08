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

const modalContainer = document.querySelectorAll(".modal__container");

/* FUNCTIONS */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

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

function openModal(modal) {
  modal.classList.add("modal_opened");
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

/* event listeners */

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileNameInput.value = profileName.innerText;
  profileDescriptionInput.value = profileDescription.innerText;
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

profileEditModal.addEventListener("click", (e) => {
  if (e.target === profileEditModal) {
    closeModal(profileEditModal);
  }
});

profileAddButton.addEventListener("click", () => openModal(addCardModal));

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeModal(imageModal);
  }
});
imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

addCardModal.addEventListener("click", (e) => {
  if (e.target === addCardModal) {
    closeModal(addCardModal);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(profileEditModal);
    closeModal(addCardModal);
    closeModal(imageModal);
  }
});

addCardModal.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryListEl.append(cardElement);
});
