const results = document.querySelector(".results")
const category = document.querySelector(".category")
const categorySpan = document.querySelectorAll(".category span")
const userSearch = document.querySelector("userSearch")

const hatchetUrl = "https://openlibrary.org/search.json?title=hatchet&author=gary%20Paulsen";
const hatchetCoverUrl = "https://covers.openlibrary.org/b/isbn/9780140343717-S.jpg" // Hatchet cover
const backupImage = "https://unsplash.com/photos/assorted-title-of-books-piled-in-the-shelves-NIJuEQw0RKg"

async function dataRequest(url){
  try{
    const response = await fetch(url)
    const data = response.json();
    return await data;
  }catch(e){
    console.log("dataRequest failed: ", e)
  }
}


function urlRequest(url){
  dataRequest(url).then(data => {
    data.docs.forEach(book => {
      console.log(book)
      const coverUrl = 'https://covers.openlibrary.org/b/isbn/' + book.isbn[0] +'-L.jpg'
      results.innerHTML += `
        <div class="result">
        <div class="coverImg">
          <p>Cover:</p>
          <img class="cover" src="${coverUrl}" alt="Cover of Hatchet">
        </div>
        <div class="info">
          <div>
            <p class="resultTitle infoTxt">Title: "${book.title}"</p>
            <p class="author infoTxt">Author: ${book.author_name}</p>
            <p class="published infoTxt">Published Year: ${book.first_publish_year}</p>
            <p class="pages infoTxt">Number of Pages: ${book.number_of_pages_median}</p>
          </div>
        </div>
      </div>
      `
    });
    console.log(data.docs)
  })
}

urlRequest(hatchetUrl)

category.addEventListener("click", event => {
  if(event.target.tagName === "SPAN"){
    // results.innerHTML =  ""
    // urlRequest(event.target.dataset.url)
    categorySpan.forEach(item => item.classList.remove("active"))
    event.target.classList.add("active")
  }
})
