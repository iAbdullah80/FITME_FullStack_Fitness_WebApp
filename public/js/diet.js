window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 0) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
  });

function search(){
    let searchBar=document.querySelector('.search1').value.toUpperCase();
    let foodList=document.querySelector('.foodList');
    let food=document.querySelectorAll('.a1');
    let foodName=document.getElementsByTagName('h3');

    for(let i=0;i<foodName.length;i++){
        if(foodName[i].innerHTML.toUpperCase().indexOf(searchBar)>=0){
            food[i].style.display="";
        }else{
            food[i].style.display="none";
        }
    }
}
