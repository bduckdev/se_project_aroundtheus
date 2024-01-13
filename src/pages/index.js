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
    "Content-Type": "application/json",
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
  cardRemovalHandler: handleCardRemoval,
  card: undefined,
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
  consts.profileEditDiv.querySelector(".modal__button").innerText = "Saving...";
  const name = inputValues["Name"];
  const description = inputValues["Description"];
  return api
    .updateProfileInfo(name, description)
    .then(() => {
      profileEl.setUserInfo(name, description);
      formValidation[1].disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleAvatarEditSubmit(e, inputValues) {
  e.preventDefault();
  consts.avatarEditDiv.querySelector(".modal__button").innerText = "Saving...";
  const avatar = inputValues["Avatar"];
  return api
    .updateAvatar(avatar)
    .then(() => {
      profileEl.setAvatar(avatar);
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleAddCardSubmit(e, inputValues) {
  e.preventDefault();
  consts.addCardModalDiv.querySelector(".modal__button").innerText =
    "Saving...";
  const name = inputValues["Title"];
  const link = inputValues["Image Link"];
  return api
    .addCard({ name, link })
    .then((card) => {
      return card;
    })
    .then((card) => {
      const cardEl = createCard(card);
      gallery.addItem(cardEl);
      formValidation[0].disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleDeleteButton(card) {
  deleteModal["card"] = card;
  deleteModal.open();
}
function handleCardRemoval(card) {
  consts.deleteModalDiv.querySelector(".modal__button").innerText = "Saving...";
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
// card handlers
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
consts.avatarContainer.addEventListener("click", () => {
  avatarEditModal.open();
});

// initial loading handlers

function handleProfileLoad({ name, about, avatar }) {
  profileEl.setUserInfo(name, about);
  profileEl.setAvatar(avatar);
}
function loadAll() {
  api
    .initialLoad()
    .then((data) => {
      handleProfileLoad(data[0]);
      return data;
    })
    .then((data) => {
      loadDefaultCards(data[1]);
    });
}
function loadDefaultCards(cardsArr) {
  if (cardsArr.length != 0) {
    gallery["items"] = cardsArr;
    gallery.renderItems();
  } else {
    console.log("Gallery empty. Loading default cards...");
    gallery["items"] = addDefaultCards();
    gallery.renderItems();
  }
}
function addDefaultCards() {
  const defaultCards = [];
  consts.initialCards.forEach((card) => {
    api.addCard(card);
    defaultCards.push(card);
  });
  return defaultCards;
}

// validation
const formValidation = [
  new FormValidator(consts.validatorConfig, consts.addCardModalDiv),
  new FormValidator(consts.validatorConfig, consts.profileEditDiv),
  new FormValidator(consts.validatorConfig, consts.avatarEditDiv),
];

formValidation.forEach((form) => {
  form.enableValidation();
});
// on page load

addCardModal.setEventListeners();
profileEditModal.setEventListeners();
imageModal.setEventListeners();
avatarEditModal.setEventListeners();

const gallery = new Section(
  { items: [], renderer: createCard },
  "#gallery-container",
);
loadAll();
