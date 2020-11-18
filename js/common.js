const debtsControls = document.querySelectorAll('.debts__controls')
const burgerMenu = document.querySelector('.burger__content')
const burgerMenuOpen = document.querySelector('.burger__open')
const burgerMenuClose = document.querySelector('.burger__close')


function debtsControlsToggler() {
  if (debtsControls.length) {
    for(let i = 0; i < debtsControls.length; i++) {
      debtsControls[i].onclick = () => {
        debtsControls[i].classList.toggle('debts__controls--active')
      }
    }
  }
}

function burgerMenuToggler() {
  if(burgerMenu) {
    burgerMenuOpen.onclick = () => {
      burgerMenu.classList.toggle('burger__content--close')
    }
    burgerMenuClose.onclick = () => {
      burgerMenu.classList.toggle('burger__content--close')
    }
  }
}

document.addEventListener("DOMContentLoaded", burgerMenuToggler);
document.addEventListener("DOMContentLoaded", debtsControlsToggler);