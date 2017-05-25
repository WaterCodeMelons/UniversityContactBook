/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  // Init method
  (function () {
    var options = {
        'bgcolor': '#083061',
      'fontcolor': '#fff', 
      // parallax: true|false, 
      // parallaxBackgroundImage: 'http://lorempixel.com/900/600/nightlife/2/', // parallax default background image
      // parallaxBackground: '-23%', // parallax default background effect
      /* parallaxSlideElements: {
            title: -100, 
            subtitle: -300, 
            text: -500
      }, */
      'onOpened': function () {
        console.log("welcome screen opened");
      },
      'onClosed': function () {
        console.log("welcome screen closed");
      }
    },
    welcomescreen_slides = [
      {
        id: 'slide0', 
        title: '<div class="photo"><img src="js/myapp/pages/logo2.png"></div>',
        picture: 'Witamy w Księdze Kontaktowej UE!',
        text: 'Przesuń w lewo aby poznać lepiej aplikację'
      },
      {
        id: 'slide1',
        title: '<div class="photo"><img src="js/myapp/pages/screen.png"></div>',
        picture: 'Klikając na profil wyświetlasz informację na temat danego pracownika',
        text: 'Przesuń dalej'
      },
      {
        id: 'slide2',
        title: '<div class="photo"><img src="js/myapp/pages/logo2.png"></div>',
        picture: '<div class="item-title label">Podaj swój numer albumu aby ułatwić wyszukiwanie Twoich wykładowców <p>Wszyscy Twoi prowadzący zostaną automatycznie dodani do ulubionych:</p></div><div class="item-input"><input type="text" placeholder="Numer Albumu"></div><br><a class="tutorial-close-btn" href="#">Prześlij numer albumu</a>',
        text: '<a class="tutorial-close-btn" href="#">Albo przejdź do aplikacji bez podawania numeru</a>'
      }
    ],
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    
    $$(document).on('click', '.tutorial-close-btn', function () {
      welcomescreen.close();
    });

    $$('.tutorial-open-btn').click(function () {
      welcomescreen.open();  
    });
    
    $$(document).on('click', '.tutorial-next-link', function (e) {
      welcomescreen.next(); 
    });
    
    $$(document).on('click', '.tutorial-previous-slide', function (e) {
      welcomescreen.previous(); 
    });
  
  }());

};