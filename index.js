const results = document.querySelector(".results");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");
const userSearch = document.querySelector("#userSearch");
const search = document.querySelector("#search");

const backupImage =
  "https://unsplash.com/photos/assorted-title-of-books-piled-in-the-shelves-NIJuEQw0RKg";

// go to openLibrary API to get the requested json file.
async function dataRequest(url) {
  try {
    const response = await fetch(url);
    const data = response.json();
    return await data;
  } catch (e) {
    console.log("dataRequest failed: ", e);
  }
}

// this function gets the number used by the API to find images of the cover.
function getIsbn(isbns) {
  if (isbns) {
    return "https://covers.openlibrary.org/b/isbn/" + isbns[0] + "-L.jpg";
  } else {
    return backupImage;
  }
}

function urlRequest(url) {
  dataRequest(url).then((data) => {
    data.docs.forEach((book) => {
      const bookLink = "https://openlibrary.org" + book.key;
      const coverImg = getIsbn(book.isbn);
      results.innerHTML += `
        <div class="result">
        <div class="coverImg">
          <a class="coverLink" href="${bookLink}" target="blank"><img class="cover" src="${coverImg}" alt="Cover of ${book.title}"></a>
        </div>
        <div class="info">
          <div>
            <a class="coverLink" href="${bookLink}" target="blank"><p class="resultTitle infoTxt">"${book.title}"</p></a>
            <p class="author infoTxt">Author: ${book.author_name}</p>
            <p class="published infoTxt">Published Year: ${book.first_publish_year}</p>
            <p class="pages infoTxt">Number of Pages: ${book.number_of_pages_median}</p>
            <button id="addFav" onclick='addToFavs("${book.title}", "${book.author_name}", "${book.first_publish_year}", "${book.number_of_pages_median}", "${coverImg}", "${book.key}")'>Add to Favorites</button>
          </div>
        </div>
      </div>
      `;
    });
  });
}

function addToFavs(title, author, published, pages, cover, key) {
  console.log(key);
  book = {
    bookTitle: title,
    bookAuthor: author,
    bookPublished: published,
    bookPages: pages,
    bookCover: cover,
    bookKey: key,
  };

  const favBookLS = localStorage.getItem("favBooks");

  if (favBookLS) {
    const oldFavBooks = JSON.parse(favBookLS);
    const newFavBooks = [...oldFavBooks, book];

    localStorage.setItem("favBooks", JSON.stringify(newFavBooks));
  } else {
    localStorage.setItem("favBooks", JSON.stringify([book]));
  }
}

// listen to see which search parameter is being clicked. Category is the div area the search type buttons are located.
category.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    categorySpan.forEach((item) => item.classList.remove("active"));
    event.target.classList.add("active");
  }
});

// when the search button is clicked the active class is found and used in conjunction with the text from the search to build a url for the search.
search.addEventListener("click", (event) => {
  const search = userSearch.value;
  const replaceSearch = search.trim().replace(/\s/g, "+");
  const activeSearch = document.querySelector(".active").dataset.url;
  const url = activeSearch + replaceSearch;
  results.innerHTML = "";
  urlRequest(url);

  userSearch.value = "";
});
