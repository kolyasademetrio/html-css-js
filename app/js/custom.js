
$(window).load(function () {

   if ($('.js-related-slider').length) {
      $('.js-related-slider').slick({
         dots: false,
         infinite: true,
         speed: 300,
         slidesToShow: 1,
         slidesToScroll: 1,
         mobileFirst: true,
         nextArrow: '<button type="button" class="slick-next related__arrow related__arrow_right"></button>',
         prevArrow: '<button type="button" class="slick-prev related__arrow related__arrow_left"></button>',
         responsive: [
            {
               breakpoint: 715,
               settings: "unslick"
            }
         ]
      });
   };

   $(window).resize(function () {
      $('.js-related-slider').slick('resize');
   });

});


// IE support
window.onload = function (e) {

   function addEvent(evnt, elem, func) {
      if (elem.addEventListener)  // W3C DOM
         elem.addEventListener(evnt, func, false);
      else if (elem.attachEvent) { // IE DOM
         elem.attachEvent("on" + evnt, func);
      }
      else { // No much to do
         elem[evnt] = func;
      }
   }

   var shareOpenBtn = document.getElementById('js-share-open-btn'),
       shareCloseBtn = document.getElementById('js-share-close-btn'),
       shareInner = document.getElementById('js-share-inner');

   function showShare() {
      shareInner.classList.add('show');
   }

   function hideShare() {
      shareInner.classList.remove('show');
   }

   addEvent('click', shareOpenBtn, showShare);
   addEvent('click', shareCloseBtn, hideShare);

}

