const trendbooks = document.getElementById("trend-books");
const populerbooks = document.getElementById("populer-books");

const renderTrendBook = (book) => {
  const bookHTML1 = `
    <div class="book">
      <img src="${book.img}" alt="${book.bookName}" />
      <h5>${book.bookName}</h5>
      <p>${book.author}</p>
      <span class="status">${book.read ? "Read" : "Unread"}</span>
      <span class="rating">${book.rate}</span>
      <button onClick="addToLocal('${
        book.bookName
      }')">Add To My Library</button>
    </div>
  `;
  trendbooks.insertAdjacentHTML("beforeend", bookHTML1);
};

const renderPopulerBook = (book) => {
  const bookHTML2 = `
    <div class="book">
      <img src="${book.img}" alt="${book.bookName}" />
      <h5>${book.bookName}</h5>
      <p>${book.author}</p>
      <span class="status">${book.read ? "Read" : "Unread"}</span>
      <span class="rating">${book.rate}</span>
      <button onClick="addToLocal('${
        book.bookName
      }')">Add To My Library</button>
    </div>
  `;
  populerbooks.insertAdjacentHTML("beforeend", bookHTML2);
};

const renderAllTrendBooks = () => {
  trendbooks.innerHTML = "";
  books
    .filter((book) => book.category === "Trending")
    .forEach((book) => renderTrendBook(book));
};

const renderAllPopulerBooks = () => {
  populerbooks.innerHTML = "";
  books
    .filter((book) => book.category === "Popular")
    .forEach((book) => renderPopulerBook(book));
};


renderAllTrendBooks();
renderAllPopulerBooks();

const addToLocal = (bookN) => {
  // Get existing books from local storage or set an empty array if none exist
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  // Find the book by its name
  const bookToSave = books.find((book) => book.bookName === bookN);

  if (bookToSave) {
    // Check if the book is already in local storage
    const isBookInStorage = storedBooks.some(
      (book) => book.bookName === bookToSave.bookName
    );

    if (!isBookInStorage) {
      // Add the book to the array
      storedBooks.push(bookToSave);
      // Save the updated array back to local storage
      localStorage.setItem("books", JSON.stringify(storedBooks));

      alert(`"${bookN}" has been added to your library.`);
    } else {
      alert(`"${bookN}" is already in your library.`);
    }
  } else {
    alert("Book not found.");
  }
};
