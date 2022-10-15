import movies from "../data/data.json" assert { type: "json" };

const movieList = document.querySelector(".list-movie");
const movieBox = document.querySelector(".movie-box");

const getMarkupTemplate = (movie) => {
  return `<img class="img-poster" src=${movie.Poster} alt="${movie.Title}">
          <div class="description-box">
            <h2 class="description-text description-title"> ${movie.Title}</h2>
            <p class="description-text"><span class="description-text-span">Genre:</span> ${movie.Genre}</p>
            <p class="description-text"><span class="description-text-span">IMDB:</span> ${movie.imdbRating}</p>
            <p class="description-text description-text__hidden-laptop"><span class="description-text-span">Year:</span> ${movie.Year}</p>
            <p class="description-text"><span class="description-text-span">Released:</span> ${movie.Released}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Runtime:</span> ${movie.Runtime}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Awards:</span> ${movie.Awards}</p>
            <p class="description-text description-text__hidden-laptop"><span class="description-text-span">IMDB Votes:</span> ${movie.imdbVotes}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Country:</span> ${movie.Country}</p>
            <p class="description-text"><span class="description-text-span">Box Office:</span> ${movie.BoxOffice}</p>
          </div>
          <div class="plot-box">
            <h3 class="description-plot-title">Plot</h3>
            <p class="description-plot-text">${movie.Plot}</p>
          </div>`;
};

const onClick = ({ target }) => {
  const currentMovie = movies.find((el) => target.id === el.imdbID);

  if (currentMovie) {
    movieBox.innerHTML = getMarkupTemplate(currentMovie);
  }
};

const getMarkupMovies = (movies) => {
  return movies
    .map(
      ({ Title, imdbID }) =>
        `<li class="list-movie-item"><button id=${imdbID} class="list-movie-btn"><span class="list-movie-btn-text">${Title}</span></button></li>`
    )
    .join("");
};

movieList.addEventListener("click", onClick);
movieList.innerHTML = getMarkupMovies(movies);

const getRandomInteger = () => Math.floor(Math.random() * 10);

movieBox.innerHTML = getMarkupTemplate(movies[getRandomInteger()]);
