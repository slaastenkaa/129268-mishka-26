let navClose = document.querySelector('.page-header__closed');
let navButton = document.querySelector('.navigation__button');
let modalButton = document.querySelector('.modal-button');
let modal = document.querySelector('.modal');
let modalClose = document.querySelector('.modal-close');

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

modalButton.addEventListener('click', function () {
  if (modalClose.classList.contains('modal-close')) {
    modalClose.classList.remove('modal-close');
    modalClose.classList.add('modal');
  } else {
    modal.addEventListener('click', function () {
      if (modalClose.classList.contains('modal')) {
        modalClose.classList.add('modal-close'); 
        modalClose.classList.remove('modal'); 
      }
    });
  }
});
