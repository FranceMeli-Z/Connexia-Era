import { Dom } from "../../assets/js/helpers/dom";
import { Utils } from "../../assets/js/helpers/utils";

export class Menu {
  static cssClass = "c-menu";

  constructor(el = null) {
    this.$el = $(el);
    this.setupEvents();
  }

  setupEvents() {
    $(document).on('click', `.${Menu.cssClass}__btn-toggle`, (e) => {
      e.preventDefault();
      const _this = $(`.${Menu.cssClass}`)[0].instance;
      _this.toggleMenu();
    });

  }

  toggleMenu(doOpen) {
    const $btnsToggle = $(`.${Menu.cssClass}__btn-toggle`);
    const cssClassActive = `${Utils.getVarNS()}-menu-active`;
    const bodyClassList = document.body.classList;

    if (doOpen === undefined) {
      doOpen = !bodyClassList.contains(cssClassActive);
    }

    if (doOpen) {
      $btnsToggle.addClass('is-active');
      bodyClassList.add(cssClassActive);

    } else if (!doOpen) {
      $btnsToggle.removeClass('is-active');
      bodyClassList.remove(cssClassActive);
      // _this.closeSubpanelsOfLevel();
      // _this.handleBackdrop();
      // _this.stack.pop();
      //console.log(_this.stack);
    }
  }

}
