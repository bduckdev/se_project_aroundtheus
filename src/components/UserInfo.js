export default class UserInfo {
  constructor({ name, description }) {
    this.name = name;
    this.description = description;
  }
  getUserInfo() {
    const userInfo = { name: this.name, description: this.description };
    return userInfo;
  }
  setUserInfo() {
    document.querySelector("#profile-name").textContent = this.name;
    document.querySelector("#profile-description").textContent =
      this.description;
  }
}
