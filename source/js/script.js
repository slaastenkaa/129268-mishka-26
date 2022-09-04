let navClose = document.querySelector('.page-header__closed');
let navButton = document.querySelector('.navigation__button');

navClose.classList.remove('page-header__nojs');

navButton.addEventListener('click', function () {
  if (navClose.classList.contains('page-header__opened')) {
    navClose.classList.remove('page-header__opened');
    navClose.classList.add('page-header__closed');
  } else {
    navClose.classList.add('page-header__opened');
    navClose.classList.remove('page-header__closed');
  }
});
