import { Utils } from "./utils"

export class Language {

  /**
   * Returns the label assigned to the key in on language.
   * @param {*} key
   * @returns
   */
  static label(key) {
    try {
      return Utils.getNS().lang[key];
    } catch (error) {
      console.error(`Warning: Label for '${key}' doesn't exists in language file.`);
    }
    return "";
  }

}
