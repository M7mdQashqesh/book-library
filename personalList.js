const personalBooks = document.getElementById("personal-books-page");

const menuBars = document.getElementById("menu-bars");

menuBars.addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  navbar.classList.add("show");
  sidebar.classList.add("show");
});
const closeSidebar = document.getElementById("close-sidebar");

closeSidebar.addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  navbar.classList.remove("show");
  sidebar.classList.remove("show");
});

const renderPersonalBooks = () => {
  personalBooks.innerHTML = "";
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  storedBooks.forEach((book) => {
    const bookHTML3 = `
          <div class="book">
            <div class="image">
              <img src="${book.img}" alt="${book.bookName}" />
            </div>
            <div class="info">
              <h5>${book.bookName}</h5>
              <p>${book.author}</p>
              <span class="status">${book.read ? "Read" : "Unread"}</span>
              <span class="rating">${book.rate}</span>
              <button onClick="removeFromLocal('${
                book.bookName
              }')">Remove From My Library</button>
            </div>
          </div>
        `;

    personalBooks.insertAdjacentHTML("beforeend", bookHTML3);
  });
};
const removeFromLocal = (bookName) => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  const updatedBooks = storedBooks.filter((book) => book.bookName !== bookName);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  renderPersonalBooks();
};
window.onload = renderPersonalBooks;
