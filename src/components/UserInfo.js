export default class UserInfo {
  constructor({ selectors }) {
    this._nameSelector = selectors.name;
    this._descriptionSelector = selectors.description;
  }

  getUserInfo() {
    const info = {};
    info["name"] = document.querySelector(this._nameSelector).textContent;
    info["description"] = document.querySelector(
      this._descriptionSelector
    ).textContent;
    return info;
  }

  setUserInfo(data) {
    document.querySelector(this._nameSelector).textContent = data.name;
    document.querySelector(this._descriptionSelector).textContent =
      data.description;
  }
}
