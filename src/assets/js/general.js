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

  function resizeHighlight(viewport) {
    var min_height;

        $('.c-card1__inner--highlight').each(function(){
          if ( $(".c-card1__head--abstract") ) {
            if (viewport < 992){
              min_height=250;
            }
            else {
              min_height=300;
            }
        var height = ( $( this ).outerHeight(true) );
        if (height > min_height) {
          min_height = height;
        }
        $(".c-card1__inner--highlight").css("min-height", min_height);
      }
    else {
      $(".c-card1__inner--highlight").addClass("min-highlight-title");
    }
  });

  }
  function removeProperty(id,property) {
    $(id).css(property,"");
  }

  var viewportWidth = $(window).width();
  resizeHighlight(viewportWidth);
  // resizeMenu(viewportWidth);

//  $(".c-menu__content__navlist--show").each(function() {
//   var maxH = 0
//   var height = ( $(this).height(true) );
//   if ( height > maxH ) {
//     maxH = height;
//   }

//  });

  if (viewportWidth < 992){
    $(".c-menu__content__navlist").removeClass("open");
  }

  $("button.dropbtn").on("click", function() {
    $(this).siblings("div.dropdown-content").toggle();
    // $(".option-list").children('li').toggle();
  });


$("ul.option-list li").on("click", function() {
    var allOptions = $("ul.option-list").children("li");
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $(this).parents("div.dropdown-content").siblings("button.dropbtn").children("span").html($(this).html());
    $(this).parents("div.dropdown-content").toggle();
});

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


//Apertura- chiusura Menu principale
$(".c-menu__btn-toggle").click(function() {
  event.preventDefault();
  $(".c-menu").toggleClass("closed");
  $(".c-menu").toggleClass("open");
});

//Accordion interno al menu principale
var viewportWidth = $(window).width();
if (viewportWidth < 992 ) {
  $(".c-menu__content__navlist--click").click(function() {
  event.preventDefault();
    $(this).parents(".c-menu__content__navlist").toggleClass("closed");
    $(this).parents(".c-menu__content__navlist").toggleClass("open");
  })
}
  else {
    $(".c-menu__content__navlist--click").mouseover(function() {
      $(".c-menu__content__navlist").removeClass("open");
      $(this).parents(".c-menu__content__navlist").addClass("open");
    });

};

// $(".c-menu__content__navlist--click").click(function() {
//   event.preventDefault();
//   var viewportWidth = $(window).width();
//   if (viewportWidth < 992 ) {
//     // // $(this).parents(".c-menu__content__navlist").toggleClass("closed");
//     // $(this).parents(".c-menu__content__navlist").toggleClass("open");
//     if ( $(this).parents(".c-menu__content__navlist").hasClass("open")) {
//       $(this).parents(".c-menu__content__navlist").removeClass("open");
//   }
//   else{
//   $(".c-menu__content__navlist").removeClass("open");
//   // $(this).parents(".c-menu__content__navlist").toggleClass("closed");
//   $(this).parents(".c-menu__content__navlist").addClass("open");
//   }
//   }
//   else {
//     if ( $(this).parents(".c-menu__content__navlist").hasClass("open")) {
//         $(this).parents(".c-menu__content__navlist").removeClass("open");
//     }
//     else{
//     $(".c-menu__content__navlist").removeClass("open");
//     // $(this).parents(".c-menu__content__navlist").toggleClass("closed");
//     $(this).parents(".c-menu__content__navlist").addClass("open");

//     }
//   }
// });



// $(".c-menu__content__navlist--click").click(function() {
//   event.preventDefault();
//   var viewportWidth = $(window).width();
//   if (viewportWidth < 992 ) {
//     $(this).parents(".c-menu__content__navlist").toggleClass("closed");
//     $(this).parents(".c-menu__content__navlist").toggleClass("open");
//   }
//   else {
//     if ( $(this).parents(".c-menu__content__navlist").hasClass("open")) {
//         $(this).parents(".c-menu__content__navlist").removeClass("open");
//     }
//     else{
//     $(".c-menu__content__navlist").removeClass("open");
//     $(this).parents(".c-menu__content__navlist").toggleClass("closed");
//     $(this).parents(".c-menu__content__navlist").toggleClass("open");
//     }
//   }
// });

// function resizeMenu(viewport){
// if (viewport > 992){
// $('.c-menu__content__navlist').click(function(){
//   if($(this.open)) {
//     var h = $(this).find('.c-menu__content__navlist--show .c-nav').height();
//     if ( h > 530) {
//     var hg = h - 30;
//     $(this).parents('.c-menu__content__nav').removeClass('h-100');
//     $(this).parents('.c-menu__content__nav').height(hg);
//     }
//     else {
//       // $(this).parents('.c-menu__content__nav').addClass('h-100');
//       $(this).parents('.c-menu__content__nav').css('height','');

//     }
//   }
//   if(!$(this.open)) {
//     // $(this).parents('.c-menu__content__nav').addClass('h-100');
//   }
// })
// }
// else {
//   $('.c-menu__content__navlist').click(function(){
//   if($(this.open)){
//     $(this).parents('.c-menu__content__nav').addClass('h-100');
//   }
// });
// }
// }


var resizeTimer;
$(window).resize(function() {
  var viewportWidth = $(window).width();
    if (viewportWidth < 992) {
    //  $(".c-menu__content__navlist").removeClass("open");
     $(".c-header__inner").height('65px');
    }
    else {
      //  $(".c-menu__content__navlist:first-child").addClass("open");
       var scrollTop = $(window).scrollTop();
       if ( scrollTop > 50) {
        $(".c-header__inner").height('80px');
       }
       else{
        $(".c-header__inner").height('154px');
        }
    }

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
     removeProperty(".c-card1__inner--highlight","min-height");
     resizeHighlight(viewportWidth);
    //  resizeMenu(viewportWidth);
    }, 100);

 });


//  $('.c-menu__search--result').hide();

//  $('.c-form__search--field').on('input', function() {
//   $('.c-menu__search--result').show();
// });

//Share dei pulsanti social
$(".c-share--fb").click(function(e) {
  e.preventDefault();
  let url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href);
  console.log(url);
  popupCenter(url, 'Condividi su Facebook', dialogWidth, dialogHeight)
  return false;
});

$(".c-share--tw").click(function(e) {
  e.preventDefault();
  let url = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href)
  console.log(url);
  popupCenter(url, 'Condividi su Twitter', dialogWidth, dialogHeight)
  return false;
});

$(".c-share--ln").click(function(e) {
  e.preventDefault();
  let url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(location.href)
  console.log(url);
  popupCenter(url, 'Condividi su Linkedin', dialogWidth, dialogHeight)
  return false;
});

// $(".c-share--ig").click(function(e) {
//   e.preventDefault();
//   let url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(location.href)
//   console.log(url);
//   popupCenter(url, 'Condividi su Linkedin', dialogWidth, dialogHeight)
//   return false;
// });

$(".c-share--wh").click(function(e) {
  e.preventDefault();
  let url = 'https://wa.me/?text=' + encodeURIComponent(location.href)
  console.log(url);
  popupCenter(url, 'Condividi su Linkedin', dialogWidth, dialogHeight)
  return false;
});

function popupCenter(myURL, title, myWidth, myHeight) {
var left = (screen.width - myWidth) / 2;
var top = (screen.height - myHeight) / 4;
var myWindow = window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
}

let dialogWidth = 600;
let dialogHeight = 350;


  // $(".c-card1__contentbox").each(function(){
  //   var actualheight = 380;
  //   var newminheight = $(this).outerHeight();
  //   if (newminheight > actualheight ) {
  //     actualheight = newminheight;
  //     setMinheight(actualheight)
  //   }
  // })
  // function setMinheight(minheight){
  //   $(".c-card1__contentbox").parents(".c-card1__inner").css("min-height", minheight);
  // }

  $(".c-nav3--layout1 ul").on("click", function() {
    $(this).toggleClass("dropopen");
  });

    $(".c-nav3--layout1 ul li").on("click", function() {
    var allOptions = $(".c-nav3 ul").children("li");
    allOptions.removeClass('is-active');
    $(this).addClass('is-active');
    // $(this).parents("div.dropdown-content").siblings("button.dropbtn").children("span").html($(this).html());
    // $(this).parents("div.dropdown-content").toggle();
});

//   $(".c-nav3--layout1 ul").on("click", function() {
//     console.log(this);
//     $(this).css("display","block");
//     var allOptions = $(".c-nav3 ul").children("li");
//     allOptions.removeClass('is-active');
//     $(this).addClass('is-active');
//     $(this).parents("div.dropdown-content").siblings("button.dropbtn").children("span").html($(this).html());
//     $(this).parents("div.dropdown-content").toggle();
// });

// Countdown for Paris Congress
var cDate = $('.countdown-date').text();
var countDownDate = new Date(cDate).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

// Get today's date and time
var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $('.countdown-d').text(days);
  $('.countdown-h').text(hours);
  $('.countdown-m').text(minutes);
  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  // + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    $('.countdown-d').text("0");
    $('.countdown-h').text("0");
    $('.countdown-m').text("0");
  }
}, 1000);

});

  //Aggiungere o diminuire i tag
  $(".c-cta__viewtag").click(function() {
    $(this).toggleClass("closed");
    $(this).toggleClass("open");
    var active = $('div.tag-list').hasClass('is-active');
    if (active) {
      $('div.tag-list').removeClass('is-active');
    }
    else {
      $('div.tag-list').addClass('is-active');
    }
  });

$(window).scroll(function(){
    var viewportWidth = $(window).width();
    if (viewportWidth > 992) {
      var scrollTop = $(window).scrollTop();
      if ( scrollTop > 50) {
        $(".c-header__inner").height('76px');
        $(".c-header__item1").addClass('zaux-pos-header1');
        $(".c-header__item2").addClass('zaux-pos-header2');
        $(".c-header__item3").addClass('zaux-pos-header3');
        $(".c-header__logo").addClass('is-sticky');
        if ( scrollTop > 290) {
          $(".c-nav2").addClass('zaux-pos-nav');
        }
        else {
          $(".c-nav2").removeClass('zaux-pos-nav');
        }
      }
      else {
        $(".c-header__inner").height('160px');
        $(".c-header__item1").removeClass('zaux-pos-header1');
        $(".c-header__item2").removeClass('zaux-pos-header2');
        $(".c-header__item3").removeClass('zaux-pos-header3');
        $(".c-header__logo").removeClass('is-sticky');
        $(".c-nav2").removeClass('zaux-pos-nav');
      }
  }
  else {
    var scrollTop = $(window).scrollTop();
    if (  scrollTop > 50 ) {
      $(".c-header__item1").addClass('zaux-pos-header1');
        $(".c-header__item2").addClass('zaux-pos-header2');
        $(".c-header__item3").addClass('zaux-pos-header3');
      if ( scrollTop > 354) {
        $(".c-nav2").addClass('zaux-pos-nav');
      }
      else {
        $(".c-nav2").removeClass('zaux-pos-nav');
      }
    }
    else {
      $(".c-header__item1").removeClass('zaux-pos-header1');
      $(".c-header__item2").removeClass('zaux-pos-header2');
      $(".c-header__item3").removeClass('zaux-pos-header3');
    }
  }
});


$(".print-chart").click(function(){
    var src = $(".swiper-slide-active img").attr('src');
    var left = (screen.width - 600) / 2;
    var top = (screen.height - 480) / 4;
    var a = window.open('','Print_Chart','width=640, height=480, top=' + top + ', left=' + left);
    a.document.open('text/html');
    a.document.write('<html><head></head><body>');
    a.document.write('<div> <img src="' + src + '" alt="" /></div>');
    a.document.write('</body></html>');
    a.document.close();
    a.print();
})







