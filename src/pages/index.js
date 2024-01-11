import * as consts from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalDelete from "../components/ModalDelete.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "32a0da8c-2dd8-41c5-9cc6-63c733b86137",
  },
});
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

const deleteModal = new ModalDelete({
  modalSelector: "#delete-image-modal",
  handleCardRemoval: handleCardRemoval,
});

// profile section

const profileEl = new UserInfo({
  nameSelector: "#profile-name",
  descriptionSelector: "#profile-description",
}); // submission handlers

function handleProfileEditSubmit(e, inputValues) {
  e.preventDefault();
  const name = inputValues["Name"];
  const description = inputValues["Description"];
  // return api.updateProfileInfo
  // then do dom stuff
  // catch error
  api.updateProfileInfo(name, description);
  profileEl.setUserInfo(name, description);
  profileEditValidator.disableSubmitButton();
}
function handleAddCardSubmit(e, inputValues) {
  e.preventDefault();
  const name = inputValues["Title"];
  const link = inputValues["Image Link"];
  api.addCard({ name, link });
  const cardEl = createCard({ name, link });
  gallery.addItem(cardEl);
  addCardValidator.disableSubmitButton();
}
// random handlers
function handleDeleteButton(card) {
  deleteModal.open(card);
}
function handleCardRemoval(card) {
  console.log(card._id);
  api.deleteCard(card._id);
  renderCards();
}
function handleImageClick(card) {
  imageModal.open(card);
}
function createCard({ name, link, _id }) {
  const cardEl = new Card(
    { name, link, _id },
    "#card-template",
    handleImageClick,
    handleDeleteButton,
  );
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
  { items: [], renderer: createCard },
  "#gallery-container",
);

function renderCards() {
  gallery.items = [];
  api.getInitialCards().then((cardData) => {
    cardData.forEach((card) => {
      console.log(card);
      const cardEl = createCard(card);
      gallery.addItem(cardEl);
    });
  });
}
renderCards();

api.getUserData().then(({ name, about }) => {
  profileEl.setUserInfo(name, about);
});

function renderAll() {
  consts.initialCards.forEach((card) => {
    api.addCard(card);
  });
}
