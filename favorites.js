const results = document.querySelector(".results")
const rmvBtn = document.querySelector
// const favBookString = localStorage.getItem("favBooks")
// let favBooks = {}

// if (favBookString){
//   favBooks = JSON.parse(favBookString)
// }
// favBooks.forEach(book => {
//   console.log(book)
// })
// }


function buildFavBooks(){
  const favBookString = localStorage.getItem("favBooks")
  let favBooks = {}

  if (favBookString){
    favBooks = JSON.parse(favBookString)
  }
  favBooks.forEach(book => {
    console.log("first: ", book)
    results.innerHTML += `
      <div class="result">
      <div class="coverImg">
        <a href="${book.bookCover}"><img class="cover" src="${book.bookCover}" alt="Cover of ${book.bookTitle}"></a>
      </div>
      <div class="info">
        <div>
          <p class="resultTitle infoTxt">"${book.bookTitle}"</p>
          <p class="author infoTxt">Author: ${book.bookAuthor_name}</p>
          <p class="published infoTxt">Published Year: ${book.bookFirst_publish_year}</p>
          <p class="pages infoTxt">Number of Pages: ${book.bookNumber_of_pages_median}</p>
          <button id="addFav" onclick='removeFromFavs("${book.bookTitle}")'>remove from Favorites</button>
        </div>
      </div>
    </div>
    `
  });
  // console.log(data.docs)
}

function removeFromFavs(delTitle){
  let books = JSON.parse(localStorage.getItem('favBooks')) || []

  books = books.filter(book => book.bookTitle != delTitle)

  localStorage.setItem('favBooks', JSON.stringify(books))
  results.innerHTML = ""
  buildFavBooks()
}



buildFavBooks()