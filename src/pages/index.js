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

const avatarEditModal = new ModalWithForm({
  modalSelector: "#avatar-edit-modal",
  handleFormSubmit: handleAvatarEditSubmit,
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
  avatarSelector: "#avatar",
});

// submission handlers

function handleProfileEditSubmit(e, inputValues) {
  e.preventDefault();
  const name = inputValues["Name"];
  const description = inputValues["Description"];
  return api
    .updateProfileInfo(name, description)
    .then(() => {
      document.querySelector(".modal__button").innerText = "Saving...";
    })
    .then(() => {
      profileEl.setUserInfo(name, description);
      profileEditValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleAvatarEditSubmit(e, inputValues) {
  e.preventDefault();
  const avatar = inputValues["Avatar"];
  return api
    .updateAvatar(avatar)
    .then(() => {
      document.querySelector(".modal__button").innerText = "Saving...";
    })
    .then(() => {
      profileEl.setAvatar(avatar);
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleAddCardSubmit(e, inputValues) {
  e.preventDefault();
  const name = inputValues["Title"];
  const link = inputValues["Image Link"];
  return api
    .addCard({ name, link })
    .then(() => {
      document.querySelector(".modal__button").innerText = "Saving...";
    })
    .then(() => {
      const cardEl = createCard({ name, link });
      gallery.addItem(cardEl);
      addCardValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    });
}
// random handlers
function handleDeleteButton(card) {
  deleteModal.open(card);
}
function handleCardRemoval(card) {
  return api
    .deleteCard(card._id)
    .then(() => {
      document.querySelector(".modal__button").innerText = "Saving...";
    })
    .then(() => {
      card.removeCard();
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleLikeButton(card) {
  if (!card.isLiked) {
    return api
      .likeCard(card._id)
      .then(() => {
        card.likeCard();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    return api
      .unlikeCard(card._id)
      .then(() => {
        card.likeCard();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
function handleImageClick(card) {
  imageModal.open(card);
}
function handleInitialLoad(data) {
  const userData = data[0];

  const cards = data[1];
}
function createCard({ name, link, _id, isLiked }) {
  const cardEl = new Card(
    { name, link, _id, isLiked },
    "#card-template",
    handleImageClick,
    handleDeleteButton,
    handleLikeButton,
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
consts.avatar.addEventListener("click", () => {
  avatarEditModal.open();
});

// initial loading handlers

function handleInitialCards(cardData) {
  cardData.forEach((card) => {
    const cardEl = createCard(card);
    gallery.addItem(cardEl);
  });
}

function handleProfileLoad({ name, about, avatar }) {
  profileEl.setUserInfo(name, about);
  profileEl.setAvatar(avatar);
}
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
avatarEditModal.setEventListeners();

const gallery = new Section(
  { items: [], renderer: createCard },
  "#gallery-container",
);

api
  .initialLoad()
  .then((data) => {
    handleProfileLoad(data[0]);
    return data;
  })
  .then((data) => {
    handleInitialCards(data[1]);
  });
