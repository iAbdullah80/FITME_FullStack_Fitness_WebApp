window.addEventListener('scroll', function () {
  const header = document.querySelector('.header')
  if (window.pageYOffset > 0) {
    header.classList.add('header-hidden')
  } else {
    header.classList.remove('header-hidden')
  }
})
