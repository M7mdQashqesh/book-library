const allBooks = document.getElementById("all-books-page");
const menuBars = document.getElementById("menu-bars");

menuBars.addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  const sidebar = document.querySelector(".sidebar");

  navbar.classList.add("show");
  sidebar.classList.add("show");
});

// Function to toggle the read status
const toggleReadStatus = (bookName) => {
  // Find the book in the list
  const book = books.find((b) => b.bookName === bookName);

  if (book) {
    // Toggle the read status
    book.read = !book.read;

    // Update local storage
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = storedBooks.map((storedBook) => {
      if (storedBook.bookName === bookName) {
        return { ...storedBook, read: book.read };
      }
      return storedBook;
    });
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    // Re-render the book list
    const searchText = document.querySelector("#search-form input").value;
    renderAllBooksSection(searchText);
  }
};

// Render each book's HTML
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

  // Create the book's HTML
  const bookHTML3 = `
    <div class="book">
      <div class="image">
        <img src="${book.img}" alt="${book.bookName}" />
      </div>
      <div class="info">
        <h5>${book.bookName}</h5>
        <p>${book.author}</p>
        <span class="status" onClick="toggleReadStatus('${book.bookName}')">
          ${book.read ? "Read" : "Unread"}
        </span>
        <span class="rating">${book.rate}</span>
        <button onClick="addToLocal('${book.bookName}')">${buttonText}</button>
      </div>
    </div>
  `;

  allBooks.insertAdjacentHTML("beforeend", bookHTML3);
};

// Render the section with all books
const renderAllBooksSection = (searchText = "") => {
  allBooks.innerHTML = ""; // Clear the books container

  books
    .filter((book) => {
      // Return books where the name or author matches the search text
      return (
        book.bookName.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .forEach((book) => renderAllBooks(book)); // Render filtered books
};

// Load books from session storage when the page loads
const loadBooksFromSession = () => {
  const sessionBooks = JSON.parse(localStorage.getItem("books added"));
  if (sessionBooks) {
    books = sessionBooks;
  }
  renderAllBooksSection();
};

window.onload = loadBooksFromSession; // Trigger loading books from session on page load

// Search functionality
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  const searchText = event.target.querySelector("input").value; // Get the search text
  renderAllBooksSection(searchText); // Re-render books based on search text
});

// Add or remove books from local storage
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

    // Reapply the search filter after adding/removing a book
    const searchText = document.querySelector("#search-form input").value;
    renderAllBooksSection(searchText);
  }
};

// Add a new book
const addNewBook = () => {
  const bookNameInput = document.getElementById("bookName-input");
  const authorInput = document.getElementById("author-input");
  const imgInput = document.getElementById("img-input");
  const bookRate = document.getElementById("rate-input");

  const newBook = {
    bookName: bookNameInput.value,
    author: authorInput.value,
    img: imgInput.value,
    read: false,
    rate: bookRate.value + "/5",
    category: "All",
  };

  // Add the new book to the list
  books.unshift(newBook);

  // Save to session storage
  localStorage.setItem("books added", JSON.stringify(books));

  // Re-render books
  renderAllBooksSection();

  bookNameInput.value = "";
  authorInput.value = "";
  imgInput.value = "";
  bookRate.value = "";

  // Close modal
  toggleModal();
};

const toggleModal = () => {
  const modalElement = document.getElementById("addModal");
  modalElement.classList.toggle("shown");
};
