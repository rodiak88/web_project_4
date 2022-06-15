export default class UserInfo {
  constructor({ selectors }) {
    this._nameElement = document.querySelector(selectors.name);
    this._descriptionElement = document.querySelector(selectors.description);
  }

  getUserInfo() {
    const info = {};
    info["name"] = this._nameElement.textContent;
    info["description"] = this._descriptionElement.textContent;
    return info;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
