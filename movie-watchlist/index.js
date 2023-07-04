const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
let searchTerm = "";
const movieDisplay = document.getElementById("movie-display");
let filmArr = [];
// let selectedFilms = [];

searchBar.addEventListener("change", function () {
  searchTerm = searchBar.value;
  return searchTerm;
});

console.log(searchBar);

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=3e11483`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.Search.forEach((film) => {
        const imdbID = film.imdbID;
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=3e11483`)
          .then((res) => res.json())
          .then((data) => {
            filmArr.push(data);
            renderFilm(filmArr);
          });
      });
    });
  filmArr = [];
});

function renderFilm(arr) {
  let html = "";
  arr.forEach((film) => {
    html += `
    <div id="film-info" >
    <img id="poster" src=${film.Poster} />
    <div id="film-info-text" data-id="${film.imdbID}">
    <div id="film-first-line">
    <h3 id="title">${film.Title}</h3>
 <p id="rating">${film.imdbRating}</p>
 </div>
 <div id="film-second-line">
 <p>${film.Runtime}</p>
 <p>${film.Genre}</p>
 <p id="watchlist-p">Watchlist</p>
 <i class="fa-solid fa-circle-plus" data-id="${film.imdbID}"></i>
 </div>
 <p id="plot">${film.Plot}</p>
</div>

 </div>
    <hr>
 `;
  });
  movieDisplay.innerHTML = html;
}

movieDisplay.addEventListener("click", function (e) {
  if (
    e.target.dataset.id === e.target.parentElement.parentElement.dataset.id &&
    e.target.hasAttribute("data-id")
  ) {
    let selectedFilm = filmArr.filter(
      (film) => film.imdbID === e.target.dataset.id
    );

    let selectedFilms = JSON.parse(localStorage.getItem("films")) || [];
    selectedFilms.push(selectedFilm);
    // console.log(selectedFilms);

    localStorage.setItem("films", JSON.stringify(selectedFilms));
  }
});

// function reason() {
//   var dropd = document.getElementById("savedrop").value;
//   var drophistory = JSON.parse(localStorage.getItem("reason")) || [];
//   drophistory.push(dropd);
//   localStorage.setItem("reason", JSON.stringify(drophistory));
// }
