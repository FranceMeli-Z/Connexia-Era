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
    const $btns = $(`.${Menu.cssClass}__btn-toggle`);
    const $navlist = $(`.${Menu.cssClass}__content__navlist`);
    const cssClassActive = `${Utils.getVarNS()}-menu-active`;
    const bodyClassList = document.body.classList;

    if (doOpen === undefined) {
      doOpen = !bodyClassList.contains(cssClassActive);
    }

    if (doOpen) {
      $btns.addClass('is-active');
      bodyClassList.add(cssClassActive);

    } else if (!doOpen) {
      $btns.removeClass('is-active');
      $navlist.removeClass('open');
      bodyClassList.remove(cssClassActive);
    }
  }

}
