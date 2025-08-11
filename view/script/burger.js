'use strict';

(function() {
  var body = document.body;
  var burgerMenu = document.getElementsByClassName('b-menu')[0];
  var burgerContain = document.getElementsByClassName('b-container')[0];
  var burgerNav = document.getElementsByClassName('b-nav')[0];

  burgerMenu.addEventListener('click', function toggleClasses() {
    [body, burgerContain, burgerNav].forEach(function (el) {
      el.classList.toggle('open');
    });
  }, false);
})();





(function () {
  const burgerMenu = document.querySelector('.b-menu');
  const burgerNav = document.querySelector('.b-nav');

  // Esconde o menu ao carregar
  burgerNav.classList.add('hidden');

  burgerMenu.addEventListener('click', () => {
    burgerNav.classList.toggle('hidden');
    burgerNav.classList.toggle('nav-vertical'); // ativa layout vertical
  });
})();


