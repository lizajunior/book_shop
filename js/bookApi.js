import {initRatings} from './ratingBook.js';
import {changedStyleAddBtn} from './addBtn_n_count.js';
const apiKey='AIzaSyCTdVNdNjdYLWLRMEZaueMFT24UCra-18I';

const maxResult = 6 // - благодаря этому параметру на экране отображаются максимум 6 книг
//q="subject:Business" — поисковый запрос, ограничивающий результаты книгами по теме бизнеса.
let startIndex = 0 // —  начальный индекс для получения книг. Указав 0, запрашиваются первые результаты.
let selectCategory = 'Business';//по умолчанию
//langRestrict=en — ограничение по языку

const articleDiv = document.querySelector('.articles');
const btnLoadMore = document.querySelector('.btn__load'); 
const localStr = JSON.parse(localStorage.getItem('cart')) ?? [];

function createBookTemplate(book){
  console.log(localStr);
  return `
    <div class="article-book">
      <div class="book__pic">
      <img class="book__portrait" src="${book.volumeInfo.imageLinks?.thumbnail ?? "./images/no-photo.png"}" alt="Book Portrait"/>
    </div>
      <div class="book__info-container">
        <div class="book__info">
          <p class="book__author">${book.volumeInfo.authors || 'Unknown Author'}</p>
          <h3 class="book__title">${book.volumeInfo.title || 'No Title'}</h3>

          <div class="rating">
            <div class="rating__body">
              <div class="rating__active"></div>
              <div class="rating__items">
                <input type="radio" class="rating__item" value="1" name="rating">
                <input type="radio" class="rating__item" value="2" name="rating">
                <input type="radio" class="rating__item" value="3" name="rating">
                <input type="radio" class="rating__item" value="4" name="rating">
                <input type="radio" class="rating__item" value="5" name="rating">
              </div>
              <div class="rating__value"></div>
            </div>
          </div>

          <p class="book__description">${book.volumeInfo.description || 'No description available'}</p>
          <p class="book__price"> ${book.volumeInfo.pageCount || 'Price not available'}$</p>
          <button class="add-to-bag ${localStr.find(item => item.id === book.id) ? 'add-to-bag-active':''}" data-id="${book.id}">
          ${localStr.find(item => item.id === book.id) ? 'in the cart' : 'buy now'}
          </button>
        </div>
      </div>
    </div>
    `;  
}

// Функция для рендеринга книг(создание шаблона книги на html странице)
function renderBooks(books){
  books.forEach(book =>{
    const bookHTML = createBookTemplate(book);
    articleDiv.innerHTML += bookHTML;
  });
}

document.addEventListener('click',(event) => {
  if (event.target.classList.contains('genre-item')) {
    document.querySelector('.genre-active').classList.remove('genre-active');
    event.target.classList.add('genre-active');
    selectCategory = event.target.innerText;
    articleDiv.innerHTML = '' //при переключении категории очищается поле книг чтобы добавились именно те которые нужно
    startIndex = 0;//тк обновляем категорию
    fetchBooks();
  }
});

function fetchBooks(url) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${selectCategory}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResult}&langRestrict=en`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.items && data.items.length > 0) {//если пришли данные с fetch запроса 
        renderBooks(data.items);
        initRatings(); // Перезапуск для новых элементов
      }
    })
    .catch((error) => {
      console.error('Error from API:', error);
    });
}

btnLoadMore.addEventListener('click', () => {
  startIndex += 6;
  fetchBooks();
});

document.addEventListener('DOMContentLoaded',()=>{
  fetchBooks();
  changedStyleAddBtn();
})
export {fetchBooks};
