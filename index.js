const results = document.querySelector(".results")
const category = document.querySelector(".category")
const categorySpan = document.querySelectorAll(".category span")
const userSearch = document.querySelector("#userSearch")
const search = document.querySelector("#search")

const hatchetUrl = "https://openlibrary.org/search.json?title=hatchet" //&author=gary%20Paulsen";
const hatchetCoverUrl = "https://covers.openlibrary.org/b/isbn/9780140343717-S.jpg" // Hatchet cover
const backupImage = "https://unsplash.com/photos/assorted-title-of-books-piled-in-the-shelves-NIJuEQw0RKg"
const subjectOutdoors = 'https://openlibrary.org/subjects/outdoors.json?details=false'

async function dataRequest(url){
  try{
    const response = await fetch(url)
    const data = response.json();
    // console.log(await data)
    return await data;
  }catch(e){
    console.log("dataRequest failed: ", e)
  }
}

// this function gets the number used by the API to find images of the cover. 
function getIsbn(isbns){
  if(isbns){
    return 'https:\//covers.openlibrary.org/b/isbn/' + isbns[0] +'-L.jpg'
  }
  else{
    return 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D';
  }
}

function clearSearch() {
  results.innerHTML = ""
}


function urlRequest(url){
  dataRequest(url).then(data => {
    data.docs.forEach(book => {
      // console.log(book)
      let coverImg = getIsbn(book.isbn)
      const coverUrl = 'https://covers.openlibrary.org/b/isbn/' + coverImg +'-L.jpg'
      results.innerHTML += `
        <div class="result">
        <div class="coverImg">
          <a href="http://openlibrary.or/api/volumes//brief/isbn/${book.isbn[0]}.json"><img class="cover" src="${coverImg}" alt="Cover of ${book.title}"></a>
        </div>
        <div class="info">
          <div>
            <p class="resultTitle infoTxt">"${book.title}"</p>
            <p class="author infoTxt">Author: ${book.author_name}</p>
            <p class="published infoTxt">Published Year: ${book.first_publish_year}</p>
            <p class="pages infoTxt">Number of Pages: ${book.number_of_pages_median}</p>
            <button id="addFav" onclick='addToFavs("${book.title}", "${book.author_name}", "${book.first_publish_year}", "${book.number_of_pages_median}", "${coverImg}")'>Add to Favorites</button>
          </div>
        </div>
      </div>
      `
    });
    console.log(data.docs)
  })
}

// urlRequest(hatchetUrl)
// dataRequest('https://openlibrary.org/subjects/outdoors.json?details=false')

function addToFavs(title, author, published, pages, cover){

  book = {bookTitle: title, bookAuthor: author, bookPublished: published, bookPages: pages, bookCover: cover}
  
  const favBookLS = localStorage.getItem('favBooks')

  if (favBookLS){
    const oldFavBooks = JSON.parse(favBookLS)
    const newFavBooks = [...oldFavBooks, book]

  localStorage.setItem('favBooks', JSON.stringify(newFavBooks))
  }else{
    localStorage.setItem('favBooks', JSON.stringify([book]))

  }
}


// listen to see which search parameter is being clicked. Category is the div area the search type buttons are located. 
category.addEventListener("click", event => {
  if(event.target.tagName === "SPAN"){
    // results.innerHTML =  ""
    // urlRequest(event.target.dataset.url)
    categorySpan.forEach(item => item.classList.remove("active"))
    event.target.classList.add("active")
  }
})

// when the search button is clicked the active button is found and used in conjunction with the text from the search to build a url for the search.
search.addEventListener('click', event => {
  const search = userSearch.value
  // location.reload()
  // console.log(userSearch.value)
  const replaceSearch = search.trim().replace(/\s/g, "+")
  const activeSearch = document.querySelector(".active").dataset.url
  const url = activeSearch + replaceSearch
  clearSearch()
  urlRequest(url)

  userSearch.value = ""
  
})