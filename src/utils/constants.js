export const initialCards = [
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

export const validatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// ELEMENTS

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditDiv = document.querySelector("#profile-edit-modal");
export const profileName = document.querySelector("#profile-name");
export const profileDescription = document.querySelector(
  "#profile-description",
);
export const profileNameInput = document.querySelector("#profile-name-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input",
);

export const profileAddButton = document.querySelector(".profile__add-button");
export const addCardModalDiv = document.querySelector("#add-card-modal");
export const addCardName = document.querySelector("#add-card-title-input");
export const addCardLink = document.querySelector("#add-card-image-input");

export const imageModalDiv = document.querySelector("#view-image-modal");
export const imageModalText = document.querySelector("#image-modal-text");
export const imageModalImage = document.querySelector("#image-modal-image");

export const modals = document.querySelectorAll(".modal");

export const formEls = [...document.querySelectorAll("form")];

export const galleryContainer = document.querySelector(".gallery__container");

export const avatar = document.querySelector("#avatar");
export const avatarEditDiv = document.querySelector("#avatar-edit-modal");
