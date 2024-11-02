function changedStyleAddBtn(){
  
  const bagCountElement = document.querySelector('.products-count');
  let index = 0; 

  document.addEventListener('click',(el)=>{
    if(el.target.classList.contains('add-to-bag')){
      el.target.classList.toggle('add-to-bag-active');
      if(el.target.classList.contains('add-to-bag-active')){
        index++;
      } else {
        index--;
      }
    
      if(index > 0){
        bagCountElement.style.display = 'block';
        bagCountElement.textContent = index;
      } else {
        bagCountElement.style.display='none';
      }
    }
  });
}


changedStyleAddBtn()
