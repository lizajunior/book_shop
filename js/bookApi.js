const apiKey='AIzaSyCTdVNdNjdYLWLRMEZaueMFT24UCra-18I';
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
//maxResults=6 - благодаря этому параметру на экране отображаются максимум 6 книг
//q="subject:Business" — поисковый запрос, ограничивающий результаты книгами по теме бизнеса.
//startIndex=0 —  начальный индекс для получения книг. Указав 0, запрашиваются первые результаты.
//langRestrict=en — ограничение по языку

const articleDiv = document.querySelector('.articles');
const btnLoadMore = document.querySelector('.btn__load'); 

function createBookTemplate(book){
  return `
    <div class="article-book">
      <div class="book__pic">
      <img class="book__portrait" src="${book.volumeInfo.imageLinks.thumbnail} alt="Book Portrait""/>
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
          
          <p class="book__description">${book.volumeInfo.infoLink || 'No description available'}</p>
          <p class="book__price">${book.volumeInfo.pageCount || 'Price not available'}$</p>
          <button class="add-to-bag">Buy now</button>
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

function fetchBooks(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.items && data.items.length > 0) {//если пришли данные с fetch запроса 
        renderBooks(data.items);
      }
    })
    .catch((error) => {
      console.error('Error from API:', error);
    });
}

btnLoadMore.addEventListener('click', () => {
  const startIndex = document.querySelectorAll('.article-book').length;
  const newApiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;

  fetchBooks(newApiUrl);
});

fetchBooks(apiUrl);

export { apiKey, apiUrl, fetchBooks};
