const ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
  initRatings();
}

//основная функция
function initRatings(){
  let ratingActive, ratingValue;
  //бегаем по всем рейтингам на странице
  for(let i = 0; i < ratings.length; i++){
    const rating = ratings[i];
    initRating(rating);
  }

  //инициализируем конкретный рейтинг
  function initRating(rating){
    initRatingVars(rating);
    setRatingActiveWidth();
    generateRandomRating(rating)
  }

  //инициализация переменных
  function initRatingVars(rating){
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
  }

  //Изменяем ширину активных звезд
  function setRatingActiveWidth(index = ratingValue.innerHTML){
    const ratingActiveWidth = (index / 5) * 100;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }


  function generateRandomRating() {
    // Генерируем случайное число от 1 до 5 с плавающей точкой
    const randomRating = (Math.random() * 4 + 1).toFixed(1);
    //Math.random() генерирует случайное число в диапазоне от 0 (включительно) до 1 (не включая 1).
    //умножая на 4 диапазон [0;4]
    //+1 [1;5]
    //.toFixed(1); - округляем результат до 1 знака после запятой
  
    if (ratingValue) {
      // Вставляем сгенерированное число в элемент
      ratingValue.textContent = randomRating;
  
      // Обновляем активные звезды
      if (ratingActive) {
        const ratingActiveWidth = (randomRating / 5) * 100;
        ratingActive.style.width = `${ratingActiveWidth}%`;
      }
    }
  }
}