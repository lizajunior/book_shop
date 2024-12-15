import { addToCart, getCart, removeFromCart } from "./localStorage.js";

export function changedStyleAddBtn() {
  const bagCountElement = document.querySelector('.products-count');
  if (!bagCountElement) {
    console.error('Элемент .products-count не найден!');
    return;
  }

  // Функция для обновления счетчика товаров в корзине
  function updateBagCount() {
    const cart = getCart(); // Получаем актуальные данные из localStorage
    const count = cart.reduce((sum, item) => sum + item.quantity, 0); // Суммируем количество всех товаров

    if (count > 0) {
      bagCountElement.style.display = 'block';
      bagCountElement.textContent = count; // Обновляем DOM счетчика
    } else {
      bagCountElement.style.display = 'none';
    }
  }

  // Обработчик кликов по кнопке "Добавить в корзину"
  document.addEventListener('click', (el) => {
    if (el.target.classList.contains('add-to-bag')) {
      const id = el.target.getAttribute('data-id');
      const title = el.target.getAttribute('data-title') || 'No title'; // Дефолтное значение
      const price = parseFloat(el.target.getAttribute('data-price')) || 0; // Дефолтное значение

      if (!id || isNaN(price)) {
        console.error('Некорректные данные для добавления в корзину');
        return;
      }

      const cart = getCart();
      const isInCart = cart.some(item => item.id === id);

      if (isInCart) {
        // Если товар в корзине, удаляем его
        el.target.classList.remove('add-to-bag-active');
        el.target.textContent = 'buy now';
        removeFromCart(id);
      } else {
        // Если товара нет в корзине, добавляем его
        el.target.classList.add('add-to-bag-active');
        el.target.textContent = 'in the cart';
        addToCart({ id, title, price });
      }

      updateBagCount(); // Обновляем счетчик корзины
    }
  });

  // Инициализация стилей и счетчика при загрузке страницы
  function initializeButtons() {
    const cart = getCart();
    const buttons = document.querySelectorAll('.add-to-bag');

    buttons.forEach(button => {
      const id = button.getAttribute('data-id');
      if (cart.some(item => item.id === id)) {
        button.classList.add('add-to-bag-active');
        button.textContent = 'in the cart';
      } else {
        button.classList.remove('add-to-bag-active');
        button.textContent = 'buy now';
      }
    });
  }

  initializeButtons(); // Инициализация стилей кнопок
  updateBagCount(); // Инициализация счетчика
}
