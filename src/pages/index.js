import * as consts from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
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
  nameSelector: "#profile-name",
  descriptionSelector: "#profile-description",
});

// submission handlers

function handleProfileEditSubmit(e, inputValues) {
  e.preventDefault();
  const name = inputValues["Name"];
  const description = inputValues["Description"];
  profileEl.setUserInfo(name, description);
  profileEditValidator.disableSubmitButton();
}
function handleAddCardSubmit(e, inputValues) {
  e.preventDefault();
  const name = inputValues["Title"];
  const link = inputValues["Image Link"];
  const cardEl = createCard({ name, link });
  gallery.addItem(cardEl);
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
  const profileData = profileEl.getUserInfo();
  consts.profileNameInput.value = profileData["name"];
  consts.profileDescriptionInput.value = profileData["description"];
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

profileEditValidator.enableValidation();

// on page load

addCardModal.setEventListeners();

profileEditModal.setEventListeners();

imageModal.setEventListeners();

const gallery = new Section(
  { items: consts.initialCards, renderer: createCard },
  "#gallery-container",
);

gallery.renderItems();
