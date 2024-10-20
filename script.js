const trendbooks = document.getElementById("trend-books");
const populerbooks = document.getElementById("populer-books");

const renderTrendBook = (book) => {
  const bookHTML1 = `
    <div class="book">
              <img src="${book.img}" alt="Colose Horizon" />
              <h5>${book.bookName}</h5>
              <p>${book.author}</p>
              <span class="status">${
                book.read == true ? "Done" : "not Done"
              }</span>
              <span class="rating">${book.rate}</span>
            </div>
    `;
  trendbooks.insertAdjacentHTML("beforeend", bookHTML1);
};
const renderPopulerBook = (book) => {
  const bookHTML2 = `
      <div class="book">
                <img src="${book.img}" alt="Colose Horizon" />
                <h5>${book.bookName}</h5>
                <p>${book.author}</p>
                <span class="status">${
                  book.read == true ? "Done" : "not Done"
                }</span>
                <span class="rating">${book.rate}</span>
              </div>
      `;
  populerbooks.insertAdjacentHTML("beforeend", bookHTML2);
};
const renderAllTrendBooks = () => {
  trendbooks.innerHTML = "";
  Books.Trending.forEach((book) => {
    renderTrendBook(book);
  });
};

const renderAllPopulerBooks = () => {
  populerbooks.innerHTML = "";
  Books.popular.forEach((book) => {
    renderPopulerBook(book);
  });
};
renderAllTrendBooks();
renderAllPopulerBooks();
