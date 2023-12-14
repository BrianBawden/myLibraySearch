const results = document.querySelector(".results");

// build the cards for each book in the favBooks localStorage.
function buildFavBooks() {
  const favBookString = localStorage.getItem("favBooks");
  let favBooks = {};

  if (favBookString) {
    favBooks = JSON.parse(favBookString);

    favBooks.forEach((book) => {
      const bookLink = "https://openlibrary.org" + book.bookKey;
      results.innerHTML += `
        <div class="result">
        <div class="coverImg">
        <a class="coverLink" href="${bookLink}" target="blank"><img class="cover" src="${book.bookCover}" alt="Cover of ${book.bookTitle}"></a>
        </div>
        <div class="info">
          <div>
          <a class="coverLink" href="${bookLink}" target="blank"><p class="resultTitle infoTxt">"${book.bookTitle}"</p></a>
            <p class="author infoTxt">Author: ${book.bookAuthor}</p>
            <p class="published infoTxt">Published Year: ${book.bookPublished}</p>
            <p class="pages infoTxt">Number of Pages: ${book.bookPages}</p>
            <button id="addFav" onclick='removeFromFavs("${book.bookTitle}")'>remove from Favorites</button>
          </div>
        </div>
      </div>
      `;
    });
  }
}

function removeFromFavs(delTitle) {
  let books = JSON.parse(localStorage.getItem("favBooks"));

  books = books.filter((book) => book.bookTitle != delTitle);

  localStorage.setItem("favBooks", JSON.stringify(books));
  results.innerHTML = "";
  buildFavBooks();
}

buildFavBooks();
