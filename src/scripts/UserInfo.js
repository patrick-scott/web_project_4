import { profileTitle, profileDescription } from "../index.js";

export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  /** public methods */
  getUserInfo() {
    /** return object w/user data */
    const userData = {
      name: this._name,
      job: this._job,
    };
    return userData;
  }
  setUserInfo(userData) {
    /**add new user data to page */
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.job;
  }
}
