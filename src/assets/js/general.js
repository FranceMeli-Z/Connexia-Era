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
Component.register("Slider1", Slider);
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
  $(".divTable").click(function() {
    $(this).toggleClass("closed");
    $(this).toggleClass("open");
    // $(".c-accordion").toggleClass("closed");
    // $(".c-accordion").toggleClass("open");
  });

});


//Apertura- chiusura Menu principale
$(".hamburger").click(function() {
  $(".c-menu").toggleClass("closed");
  $(".c-menu").toggleClass("open");
  $(this).toggleClass("closed");
  $(this).toggleClass("open");
  // $(".c-accordion").toggleClass("closed");
  // $(".c-accordion").toggleClass("open");
});

//Accordion interno a ogni elemento del menu principale
$(".c-menu__content__navlist--click").click(function() {
  $(this).parents(".c-menu__content__navlist").toggleClass("closed");
  $(this).parents(".c-menu__content__navlist").toggleClass("open");
  // $(".c-accordion").toggleClass("closed");
  // $(".c-accordion").toggleClass("open");
});
