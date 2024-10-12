const addBtns = document.querySelectorAll('.add-to-bag');
const bagCountElement = document.querySelector('.products-count');

let index = 1; 
function changedStyleAddBtn(){
  addBtns.forEach((addBtn) => {
    addBtn.addEventListener('click', () => {
      addBtn.classList.toggle('add-to-bag-active');
      bagCountElement.style.display = 'block';
      bagCountElement.textContent = index++;
    });
  });
}

changedStyleAddBtn();