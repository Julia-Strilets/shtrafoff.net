const debtsControls = document.querySelectorAll('.debts__controls')
console.log(debtsControls)


function debtsControlsToggler() {
  if (debtsControls.length) {
    for(let i = 0; i < debtsControls.length; i++) {
      debtsControls[i].onclick = () => {
        debtsControls[i].classList.toggle('debts__controls--active')
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", debtsControlsToggler);