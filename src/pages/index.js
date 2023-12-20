import * as consts from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";

// modals
const profileEditModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});

const addCardModal = new ModalWithForm({
  modalSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardSubmit,
});

const imageModal = new ModalWithImage({
  modalSelector: "#view-image-modal",
});

// profile section

const profileEl = new UserInfo({
  name: "Jacques Cousteau",
  description: "Explorer",
});

profileEl.getUserInfo();
profileEl.setUserInfo();
// submission handlers

function handleProfileEditSubmit(e, inputs) {
  const name = inputs["Name"];
  const description = inputs["Description"];
  e.preventDefault();
  consts.profileName.innerText = name;
  consts.profileDescription.innerText = description;
  profileEditValidator.disableSubmitButton();
}
function handleAddCardSubmit(e, inputs) {
  e.preventDefault();
  const name = inputs["Title"];
  const link = inputs["Image Link"];
  const cardEl = createCard({ name, link });
  consts.galleryContainer.prepend(cardEl);
  e.target.reset();
  addCardValidator.disableSubmitButton();
}
// random handlers
function handleImageClick(card) {
  imageModal.open(card);
}
function createCard({ name, link }) {
  const cardEl = new Card({ name, link }, "#card-template", handleImageClick);
  return cardEl.getView();
}
// event listeners

consts.profileEditButton.addEventListener("click", () => {
  profileEditModal.open();
  consts.profileNameInput.value = consts.profileName.innerText;
  consts.profileDescriptionInput.value = consts.profileDescription.innerText;
});

consts.profileAddButton.addEventListener("click", () => {
  addCardModal.open();
});

// validation

const addCardValidator = new FormValidator(
  consts.validatorConfig,
  consts.addCardModalDiv,
);
addCardValidator.enableValidation();

const profileEditValidator = new FormValidator(
  consts.validatorConfig,
  consts.profileEditDiv,
);
addCardValidator.enableValidation();
profileEditValidator.enableValidation();

// on page load
consts.initialCards.forEach(({ name, link }) => {
  const cardEl = createCard({ name, link });
  consts.galleryContainer.append(cardEl);
});

addCardModal.setEventListeners();

profileEditModal.setEventListeners();

imageModal.setEventListeners();
