function addToCart(book) {
  if (!book || !book.id || !book.title || !book.price) {
    console.error('Некорректный объект книги');
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingBook = cart.find(item => item.id === book.id);

  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Обновляем корзину на странице
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function removeFromCart(bookId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== bookId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Обновляем корзину на странице
}

function clearCart() {
  localStorage.removeItem('cart');
  renderCart(); // Обновляем корзину на странице
}

function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.textContent = 'Корзина пуста';
    return;
  }

  cart.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.textContent = `${book.title} — ${book.quantity} шт. — ${book.price * book.quantity} ₽`;
    cartContainer.appendChild(bookElement);
  });
}
