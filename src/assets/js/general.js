//Vendors
import { Modal } from "bootstrap";

// Common
import { default as init } from "./common/base";

// Helpers
import { Component } from "./helpers/component";

// Components
import { Slider } from "../../components/slider/slider";
import { HeroVideo } from "../../components/herovideo/herovideo";
import { Menu } from "../../components/menu/menu";

// Registering components
Component.register("Slider", Slider);
Component.register("Menu", Menu);
Component.register("HeroVideo", HeroVideo);

init();

document.addEventListener('DOMContentLoaded', () => {
  var viewportWidth = $(window).width();
  if (viewportWidth < 992){
    $(".c-menu__content__navlist").removeClass("open");
  }
  // else {
  //   $(".c-menu__content__navlist:firstChild").addClass("open");
  // }
  //Accordion
  $(".c-accordion__head").click(function() {
    $(this).parents(".c-accordion").toggleClass("closed");
    $(this).parents(".c-accordion").toggleClass("open");
  });

  $(".divTable").click(function() {
    $(this).toggleClass("closed");
    $(this).toggleClass("open");
  });

  //Menu secondari Congresso Parigi
  $(".c-nav3__item").click(function() {
    $(".c-nav3__item").removeClass("is-active");
    $(this).addClass("is-active");
  });
  $(".c-nav2__item").click(function() {
    $(".c-nav2__item").removeClass("is-active");
    $(this).addClass("is-active");
  });

  //Aggiungere o diminuire i tag
  $(".c-cta__viewtag").click(function() {
    $(this).toggleClass("closed");
    $(this).toggleClass("open");
  });


//Apertura- chiusura Menu principale
$(".c-menu__btn-toggle").click(function() {
  $(".c-menu").toggleClass("closed");
  $(".c-menu").toggleClass("open");
});


//Accordion interno a ogni elemento del menu principale
$(".c-menu__content__navlist--click").click(function() {
  var viewportWidth = $(window).width();
  if (viewportWidth < 992 ) {
    $(this).parents(".c-menu__content__navlist").toggleClass("closed");
    $(this).parents(".c-menu__content__navlist").toggleClass("open");
  }
  else {
  $(".c-menu__content__navlist").removeClass("open");
  $(this).parents(".c-menu__content__navlist").addClass("open");
  }
});

$(window).resize(function() {
  var viewportWidth = $(window).width();
   if (viewportWidth < 992) {
     $(".c-menu__content__navlist").removeClass("open");
   }
   else {
       $(".c-menu__content__navlist:first-child").addClass("open");
       console.log("aaa");
     }
 });

});

