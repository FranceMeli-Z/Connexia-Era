export class Device {
  /**
   * @see https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
   *
   * @static
   * @returns
   * @memberof Device
   */
  static get isIOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  static get isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  }
}
