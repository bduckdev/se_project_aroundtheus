export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this.nameEl = document.querySelector(nameSelector);
    this.descriptionEl = document.querySelector(descriptionSelector);
    this.avatarEl = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const userData = {
      name: this.nameEl.innerText,
      description: this.descriptionEl.innerText,
    };
    return userData;
  }
  setUserInfo(name, description) {
    this.nameEl.textContent = name;
    this.descriptionEl.textContent = description;
  }
  setAvatar(avatar) {
    this.avatarEl.src = avatar;
  }
}
