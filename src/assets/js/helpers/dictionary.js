import { Utils } from "./utils"

export class Dictionary {

  static get(keyLabel) {
    try {
      return Utils.getNS().dict[keyLabel];
    } catch (error) {
      console.error(`Warning: Label key doesn't exists.`);
    }
    return "";
  }

}
