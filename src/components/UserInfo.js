export default class UserInfo {
  constructor({ selectors }) {
    this._nameElement = document.querySelector(selectors.name);
    this._descriptionElement = document.querySelector(selectors.description);
    this._avatarElement = document.querySelector(selectors.avatar);
  }

  getUserInfo() {
    const info = {};
    info["name"] = this._nameElement.textContent;
    info["about"] = this._descriptionElement.textContent;
    info["avatar"] = this._avatarElement.style.backgroundImage;
    return info;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.about;
  }

  setAvatar(avatar) {
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
}
