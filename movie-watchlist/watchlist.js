import { renderFilm } from "./index.js";
const movieDisplay = document.getElementById("movie-display");
let result = JSON.parse(localStorage.getItem("films")).flat();
renderFilm(result);
