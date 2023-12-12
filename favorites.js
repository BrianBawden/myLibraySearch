const results = document.querySelector(".results")
const favBookString = localStorage.getItem("favBooks")
let favBooks = {}

if (favBookString){
  favBooks = JSON.parse(favBookString)
}
// favBooks.forEach(book => {
//   console.log(book)
// })
// }


function buildFavBooks(){
    favBooks.forEach(book => {
      console.log(book)
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
            <button id="addFav" onclick='addToFavs("${book.bookTitle}", "${book.bookAuthor_name}", "${book.bookFirst_publish_year}", "${book.bookNumber_of_pages_median}", "${book.bookCover}")'>Add to Favorites</button>
          </div>
        </div>
      </div>
      `
    });
    // console.log(data.docs)
}

buildFavBooks()