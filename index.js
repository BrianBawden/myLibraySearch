const results = document.querySelector(".results")
const category = document.querySelector(".category")
const categorySpan = document.querySelectorAll(".category span")
const userSearch = document.querySelector("userSearch")

const hatchetUrl = "https://openlibrary.org/search.json?title=hatchet&author=gary%20Paulsen";
const hatchetCoverUrl = "https://covers.openlibrary.org/b/isbn/9780140343717-L.jpg" // Hatchet cover
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
      results.innerHTML += `
        <div class="result">
        <div class="coverImg">
          <img class="cover" src="./images/hatchet.jpg" alt="Cover of Hatchet">
        </div>
        <div class="info">
          <div>
            <p class="resultTitle infoTxt">Title: Hatchet</p>
            <p class="author infoTxt">Author: Gary Paulsen</p>
            <p class="published infoTxt">Published Year: 1896</p>
            <p class="pages infoTxt">Number of Pages: 192</p>
            <p class="firstSentence infoTxt">Opening Sentence:<br> "Brian Robeson stared out the window of a small plane at the endless green northern wilderness below."</p>
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

/*
let data = dataRequest(hatchetUrl)


data.then((value) => {
  value.docs.forEach(element => {
    console.log(element)
    
  });
  // console.log(value.docs)
})


*/

/*

<div class="result">
  <div class="coverImg">
    <img class="cover" src="./images/hatchet.jpg" alt="Cover of Hatchet">
  </div>
  <div class="info">
    <div>
      <p class="resultTitle infoTxt">Title: Hatchet</p>
      <p class="author infoTxt">Author: Gary Paulsen</p>
      <p class="published infoTxt">Published Year: 1896</p>
      <p class="pages infoTxt">Number of Pages: 192</p>
      <p class="firstSentence infoTxt">Opening Sentence:<br> "Brian Robeson stared out the window of a small plane at the endless green northern wilderness below."</p>
    </div>
  </div>
</div>

*/