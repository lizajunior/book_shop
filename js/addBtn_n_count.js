import { apiKey, apiUrl, fetchBooks } from './bookApi.js';

const addBtns = document.querySelectorAll('.add-to-bag');
const bagCountElement = document.querySelector('.products-count');

let index = 0; 
function changedStyleAddBtn(){
  addBtns.forEach((addBtn) => {
    addBtn.addEventListener('click', () => {
      addBtn.classList.toggle('add-to-bag-active');
      if(addBtn.classList.contains('add-to-bag-active')){
        index++;
      }else{
        index--;
      }
    
      if(index > 0){
        bagCountElement.style.display = 'block';
        bagCountElement.textContent = index;
      }else{
        bagCountElement.style.display='none';
      }
    });
  });
}

// Вызываем функцию после рендеринга книг
fetchBooks(apiUrl).then(() => {
  if (addBtns.length > 0) {
    changedStyleAddBtn(); 
  } 
});
