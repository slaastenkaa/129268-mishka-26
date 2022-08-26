let navClose = document.querySelector('.navigation__closed');
let navButton = document.querySelector('.navigation__button');

navClose.classList.remove('navigation__nojs');

navButton.addEventListener('click', function () {
  if (navClose.classList.contains('navigation__opened')) {
    navClose.classList.remove('navigation__opened');
    navClose.classList.add('navigation__closed');
  } else {
    navClose.classList.add('navigation__opened');
    navClose.classList.remove('navigation__closed');
  }
});

