// Vendors
import AOS from "aos";

// Helpers
import { Component } from "../helpers/component";
import { Lazyload } from "../helpers/lazyload";
import { Observe } from "../helpers/observe";
import { Utils } from "../helpers/utils";

// import { on, off, fire } from 'delegated-events';

const Base = () => {
  Utils.credits();

  // Creates a general purpose  "InView" observer (runs once per element when attached)
  Observe.handlers.InViewOnce = Observe.create();

  // On DOM ready
  document.addEventListener("DOMContentLoaded", () => {

    // if(AO)
    AOS.init();

    // Inits the helper module who lazy-load the images
    Lazyload.init();

    // Inits the components in page
    Component.initAll();
    Utils.getNS().config.helpers.component = Component;
  });

};

export default Base;
