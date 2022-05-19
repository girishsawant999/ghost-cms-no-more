// ================================
// Theme Options
// ================================
if (typeof themeConfig == "undefined") {
  themeConfig = {};
}

var ghosthunter_key = themeConfig.ghostSearchKey;

(function ($) {
  "use strict";

  // =====================
  // Koenig Gallery
  // =====================
  var gallery_images = document.querySelectorAll('.kg-gallery-image img');

  gallery_images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
  // =====================
  // Decode HTML entities returned by Ghost translations
  // Input: Plus d&#x27;articles
  // Output: Plus d'articles
  // =====================

  function decoding_translation_chars(string) {
    return $('<textarea/>').html(string).text();
  }
  // =====================
  // Images zoom
  // =====================

  $('.entry-content img').attr('data-action', 'zoom');

  // If the image is inside a link, remove zoom
  $('.entry-content a img').removeAttr('data-action');
  // =====================
  // Fixed Header
  // =====================

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 210) {
      $(".header-navbar-bottom").addClass("fixed");
    } else {
      $(".header-navbar-bottom").removeClass("fixed");
    }
  });


  // =====================
  // Featured Slider
  // =====================
  $('.feature-slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });
  // =====================
  // Newsticker
  // =====================
  $('.newsticker-list').ticker({
    random: false,
    itemSpeed: 30000,
    cursorSpeed: 50,
    pauseOnHover: true,
    finishOnHover: false,
    cursorOne: '_',
    cursorTwo: '-',
    fade: true,
    fadeInSpeed: 600,
    fadeOutSpeed: 300
  });
  // =====================
  // AOS
  // =====================
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 800,
    easing: 'ease',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',

  });
  // =====================
  // Scroll to top
  // =====================
  function scrolltop() {


    var wind = $(window);

    wind.on("scroll", function () {

      var scrollTop = wind.scrollTop();

      if (scrollTop >= 500) {

        $(".footer-back").addClass("show");

      } else {

        $(".footer-back").removeClass("show");
      }

    });

    $(".footer-back").on("click", function () {

      var bodyTop = $("html, body");

      bodyTop.animate({
        scrollTop: 0
      }, 500, "easeOutCubic");
    });

  }
  scrolltop();

  // =====================
  // Tooltip
  // =====================
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })


  // =====================
  // Footer Year
  // =====================
  $('#spanYear').html(new Date().getFullYear());


  // =====================
  // Search
  // =====================
 

  var searchHint = '';
  if (typeof themeConfig.searchHint !== 'undefined' && themeConfig.searchHint != '') {
    $('#ghost-search-field').attr('placeholder', themeConfig.searchHint);
  }

  var includeBodyInSearch = false;
  if (typeof themeConfig.includeBodyInSearch !== 'undefined' && themeConfig.includeBodyInSearch != '' && typeof themeConfig.includeBodyInSearch === "boolean") {
    includeBodyInSearch = themeConfig.includeBodyInSearch;
  }

  var searchField = $('#gh-search-text').ghostHunter({
    results: '#gh-search-results',
    onKeyUp: true,
    displaySearchInfo: true,
    zeroResultsInfo: true,
    includebodysearch: includeBodyInSearch,
    result_template: "<a id='gh-id-{{ref}}' class='gh-search-item' href='{{link}}'><p class='search-post-title'>{{title}}</p></a>",
    info_template: "<p> Number of posts found: {{amount}}</p>",
    onComplete: function (results) {
      $('#gh-search-results').fadeIn();
      $('.search-modal-extension').empty();
    }
  });
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      searchField.clear();
      $('#gh-search-text').val('').blur();
      $('#gh-search-results').fadeOut();

    }
  });


 
   


  const attrTitle = $('.kg-embed-card iframe').attr('title');
  $("[title*='Twitter Tweet']").addClass('nf-emmbed-twitter');
  $('.kg-embed-card iframe:not(.nf-emmbed-twitter)').each(function () {
    $(this).wrap("<div class='nf-emmbed-video'/>");
  });

  $('article.tag-hash-faq').remove();

  $("button#nf-navbar-toggler").on("click", function () {
    $(this).toggleClass("nf-mainNav-open");
    $("div#main_nav").slideToggle();
  });
  $(document.body).on("click", "span.nf-toggle-iocn", function () {
    if ($(this).text().includes("-")) {
      $(this).text("+")
    }
    else {
      $(this).text("-")
    }
    $(this).siblings(".dropdown-menu").slideToggle();
  });


  jQuery(function () { // the document ready handler shorthand
    $(".mL-has-submenu").append("<span class='nf-toggle-iocn'>+</span>");
  });





}(jQuery));