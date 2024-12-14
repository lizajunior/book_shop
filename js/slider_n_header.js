const images = [
  { url: 'images/slide1.png' },
  { url: 'images/slide2.png' },
  { url: 'images/slide3.png' }
];

document.addEventListener('DOMContentLoaded', function pageLoaded() {
  const sliderImages = document.querySelector('.slider__images');
  const sliderDots = document.querySelector('.slider__dots');
  const menuItems = document.querySelectorAll('.header__menu-item');
  const genreItems = document.querySelectorAll('.genre-item');

  let currentIndex = 0;
  let intervalId;

  initMenuItemLink();
  initImages();
  initDots();
  moveSlider(currentIndex);

  function initMenuItemLink() {
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener('click', () => {
        menuItems.forEach(m => m.classList.remove('text-active'));
        menuItem.classList.add('text-active');
      });
    });
  }

  function initImages() {
    images.forEach((image, index) => {
      const imageDiv = `
        <div class="image n${index} ${index === 0 ? 'image-active' : ''}" 
        style="background-image:url(${image.url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      const dot = `
        <div class="slider__dots-item n${index} ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot; //создаем точку для каждого img и добавляем в общий div
    });

    sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
      dot.addEventListener('click', function () {
        moveSlider(+this.dataset.index); //передвижение слайдов с помощью точек
      });
    });
  }

  function moveSlider(num) {
    // Удаляем класс активности у текущего изображения
    const currentImage = sliderImages.querySelector('.image-active');
    currentImage.classList.remove('image-active');

    // Обновляем текущий индекс
    currentIndex = num; // Устанавливаем новый индекс

    // Проверяем границы индекса
    if (currentIndex < 0) {
      currentIndex = images.length - 1; // Переход к последнему слайду
    }
    if (currentIndex >= images.length) {
      currentIndex = 0; // Переход к первому слайду
    }

    const offset = -currentIndex * 100; // Рассчитываем сдвиг
    sliderImages.style.transform = `translateX(${offset}%)`; // Применяем сдвиг

    // Обновляем новое изображение и добавляем эффект появления
    const newImage = sliderImages.querySelector('.n' + currentIndex);
    newImage.classList.add('image-active');
    // Переключаем активные точки (dots)
    sliderDots.querySelector('.active')?.classList.remove('active'); // Удаляем класс активной точки
    sliderDots.querySelector('.n' + currentIndex).classList.add('active'); // Добавляем класс активной точки
  }

  function startAutoplay() {
    intervalId = setInterval(() => {
      // Переключаем на следующий слайд
      let nextIndex = (currentIndex + 1) % images.length; // Увеличиваем индекс или обнуляем его
      moveSlider(nextIndex);
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(intervalId);
  }

  document.querySelector('.slider').addEventListener('mouseover', stopAutoplay);
  document.querySelector('.slider').addEventListener('mouseout', startAutoplay);

  startAutoplay();
});



  
    