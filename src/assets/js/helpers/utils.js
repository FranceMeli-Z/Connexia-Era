export class Utils {

  static credits() {
    console.log(`%c     ______     ______     __  __     __
    /\\___  \\   /\\  __ \\   /\\ \\/ /    /\\ \\
    \\/_/  /__  \\ \\  __ \\  \\ \\  _"-.  \\ \\ \\
      /\\_____\\  \\ \\_\\ \\_\\  \\ \\_\\ \\_\\  \\ \\_\\
      \\/_____/   \\/_/\\/_/   \\/_/\\/_/   \\/_/

        Creative Digital Agency —— zaki.it

              Communicate. Better.\n`, "font-family:monospace;color:#cd2d45;");
  }

  static getVarNS(capitalized = false, namespaceName = 'zaux') {
    return capitalized ? this.capitalize(namespaceName) : namespaceName;
  }

  static getNS() {
    return window[this.getVarNS()] = window[this.getVarNS()] || {};
  }

  static get isDebug() {
    return Utils.getNS().config.debug === true;
  }

  static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /*!
   * Sanitize and encode all HTML in a user-submitted string
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  static sanitize(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

}
