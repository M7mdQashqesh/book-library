const allBooks = document.getElementById("all-books-page");

const renderAllBooks = (book) => {
  // Get books from local storage
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  // Check if the book is already in local storage
  const isBookInStorage = storedBooks.some(
    (storedBook) => storedBook.bookName === book.bookName
  );

  // Determine the button text based on whether the book is in local storage
  const buttonText = isBookInStorage
    ? "Remove From My Library"
    : "Add To My Library";

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
        <button onClick="addToLocal('${book.bookName}')">${buttonText}</button>
      </div>
    </div>
  `;

  allBooks.insertAdjacentHTML("beforeend", bookHTML3);
};

const renderAllBooksSection = () => {
  allBooks.innerHTML = "";
  books
    .filter((book) => book.category === "All")
    .forEach((book) => renderAllBooks(book));
};

renderAllBooksSection();

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

    if (isBookInStorage) {
      // Remove the book from local storage if it exists
      const updatedBooks = storedBooks.filter(
        (book) => book.bookName !== bookToSave.bookName
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      // Update the button text after removing the book
      renderAllBooksSection();
    } else {
      // Add the book to the array if it's not already in local storage
      storedBooks.push(bookToSave);
      localStorage.setItem("books", JSON.stringify(storedBooks));

      // Update the button text after adding the book
      renderAllBooksSection();
    }
  }
};
