const navClose = document.querySelector('.page-header__closed');
const navButton = document.querySelector('.navigation__button');
const modalButton = document.querySelectorAll('.modal-button');
const modalClose = document.querySelector('.modal-close');

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

modalButton.forEach(element => element.addEventListener('click', event => {
  if (modalClose.classList.contains('modal-close')) {
    event.preventDefault();
    modalClose.classList.remove('modal-close');
  }
}));

modalClose.addEventListener('click', event => {
  if (event.target == modalClose && modalClose.classList.contains('modal')) { 
    modalClose.classList.add('modal-close');
  }
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    modalClose.classList.add('modal-close');
  }
});
