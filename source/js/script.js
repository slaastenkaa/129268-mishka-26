let navOpen = document.querySelector('.navigation__opened');
let navButton = document.querySelector('.navigation__button');

navOpen.classList.remove('navigation__nojs');

navButton.addEventListener('click', function () {
  if (navOpen.classList.contains('navigation__closed')) {
    navOpen.classList.remove('navigation__closed');
    navOpen.classList.add('navigation__opened');
  } else {
    navOpen.classList.add('navigation__closed');
    navOpen.classList.remove('navigation__opened');
  }
});

