function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

  const cardContent = `
      <div class="card">
        <img src="${book.img}" class="card-img-top" alt="Copertina del libro">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.price} €</p>
          <button class="btn btn-danger me-2" onclick="removeCard(this)">Scarta</button>
          <button class="btn btn-success" onclick="addToCart(this)">Compra ora</button>
        </div>
      </div>
    `;

  card.innerHTML = cardContent;
  return card;
}

function removeCard(button) {
  const card = button.closest(".card");
  card.remove();
}

function addToCart(button) {
  const card = button.closest(".card");
  const bookTitle = card.querySelector(".card-title").textContent;

  const cartItem = document.createElement("li");
  cartItem.textContent = bookTitle;

  document.getElementById("cart").appendChild(cartItem);

  saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
  const cartItems = document.querySelectorAll("#cart li");
  const cartArray = Array.from(cartItems).map((item) => item.textContent);

  localStorage.setItem("cart", JSON.stringify(cartArray));
}

function loadCartFromLocalStorage() {
  const cart = localStorage.getItem("cart");

  if (cart) {
    const cartArray = JSON.parse(cart);
    const cartList = document.getElementById("cart");

    cartArray.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.textContent = item;
      cartList.appendChild(cartItem);
    });
  }
}

async function fetchBooks() {
  try {
    const response = await fetch("https://striveschool-api.herokuapp.com/books");
    const books = await response.json();
    const booksList = document.getElementById("booksList");

    books.forEach((book) => {
      const bookCard = createBookCard(book);
      booksList.appendChild(bookCard);
    });
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}

window.onload = function () {
  fetchBooks();
  loadCartFromLocalStorage();
};
