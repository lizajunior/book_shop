const searchIcon = document.querySelector('.search-btn');
const header = document.getElementById('header-new');
const overlay = document.getElementById('overlay');

// Показать хедер и инпут по клику на иконку
searchIcon.addEventListener('click', () => {
    header.classList.add('active'); // Показываем хедер с инпутом
    overlay.style.display = 'block'; // Показываем затемнение фона
});

// Скрыть хедер и инпут по клику на затемнение
overlay.addEventListener('click', () => {
    header.classList.remove('active'); // Убираем хедер с инпутом вверх
    overlay.style.display = 'none'; // Убираем затемнение фона
});