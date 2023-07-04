const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const searchTerm = searchBar.value;
const movieDisplay = document.getElementById("movie-display");
let filmArr = [];
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=3e11483`)
    .then((res) => res.json())
    .then((data) => {
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
});

function renderFilm(arr) {
  let html = "";
  arr.forEach((film) => {
    html += `
    <div id="film-info" data-id="${film.Title}">
    <img id="poster" src=${film.Poster} />
    <div id="film-info-text">
    <div id="film-first-line">
    <h3 id="title">${film.Title}</h3>
 <p id="rating">${film.imdbRating}</p>
 </div>
 <div id="film-second-line">
 <p>${film.Runtime}</p>
 <p>${film.Genre}</p>
 <p id="watchlist-p"><i class="fa-solid fa-circle-plus"  data-id="${film.Title}"></i>Watchlist</p>
 </div>
 <p>${film.Plot}</p>
</div>
 </div>`;
  });
  movieDisplay.innerHTML = html;
}

movieDisplay.addEventListener("click", function (e) {
  if (e.target.dataset.id === e.target.parentElement.parentElement.dataset.id) {
    console.log(`You chose ${e.target.dataset.id}`);
  }
});
