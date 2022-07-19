//Vendors
import { Modal } from "bootstrap";

// Common
import { default as init } from "./common/base";

// Helpers
import { Component } from "./helpers/component";

// Components
import { Slider } from "../../components/slider/slider";
import { HeroVideo } from "../../components/herovideo/herovideo";

// Registering components
Component.register("Slider", Slider);
Component.register("HeroVideo", HeroVideo);

init();

document.addEventListener('DOMContentLoaded', () => {

  //Accordion
  $(".c-accordion__head").click(function() {
    console.log("AAA");
    $(this).parents(".c-accordion").toggleClass("closed");
    $(this).parents(".c-accordion").toggleClass("open");
    // $(".c-accordion").toggleClass("closed");
    // $(".c-accordion").toggleClass("open");
  });




});
