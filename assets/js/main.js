$(window).on('scroll', function () {
  if ($(window).scrollTop() >= 120) {
    $(".main-header").removeClass("bg-transparent");
    $(".main-header").addClass("bg-white");
  } else {
    $(".main-header").removeClass("bg-white");
  }
});

$(document).ready(function () {
  window.setTimeout(function () {
    $(".toast").alert('close');
  }, 4000);
});

$('.price-input').on('focusin',function(){
  $('.price-check').prop('checked', false);
});

$('.price-check').on('change',function(e){
  $('.price-input').val(e.target.value);
});

var swiper = new Swiper(".bannerSwiper", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let progressBarr = document.querySelectorAll('.progress-bar');
progressBarr.forEach((i, v) => {
  var attr = i.getAttribute("data-w");
  i.style.width = `${attr}` + "%";
});
let barImage = document.querySelectorAll(".bar-image");
barImage.forEach((i, v) => {
  var r = i.getAttribute('data-r');
  i.style.filter = `blur(${r}px)`;
})