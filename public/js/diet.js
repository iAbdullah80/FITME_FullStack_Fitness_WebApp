window.addEventListener('scroll', function () {
  const header = document.querySelector('.header')
  if (window.pageYOffset > 0) {
    header.classList.add('header-hidden')
  } else {
    header.classList.remove('header-hidden')
  }
})

function search () {
  const searchBar = document.querySelector('.search1').value.toUpperCase()
  const foodList = document.querySelector('.foodList')
  const food = document.querySelectorAll('.a1')
  const foodName = document.getElementsByTagName('h3')

  for (let i = 0; i < foodName.length; i++) {
    if (foodName[i].innerHTML.toUpperCase().indexOf(searchBar) >= 0) {
      food[i].style.display = ''
    } else {
      food[i].style.display = 'none'
    }
  }
}
