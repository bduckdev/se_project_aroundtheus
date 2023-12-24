export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this.nameEl = document.querySelector(nameSelector);
    this.descriptionEl = document.querySelector(descriptionSelector);
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
}
