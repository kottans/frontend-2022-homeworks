import movies from "../data/data.json" assert { type: "json" };

const movieList = document.querySelector(".list-movie");
const movieBox = document.querySelector(".movie-box");

const template = (obj) => {
  return `<img class="img-poster" src=${obj.Poster} alt="poster">
          <div class="description-box">
            <h2 class="description-text description-title"> ${obj.Title}</h2>
            <p class="description-text"><span class="description-text-span">Genre:</span> ${obj.Genre}</p>
            <p class="description-text"><span class="description-text-span">IMDB:</span> ${obj.imdbRating}</p>
            <p class="description-text description-text__hidden-laptop"><span class="description-text-span">Year:</span> ${obj.Year}</p>
            <p class="description-text"><span class="description-text-span">Released:</span> ${obj.Released}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Runtime:</span> ${obj.Runtime}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Awards:</span> ${obj.Awards}</p>
            <p class="description-text description-text__hidden-laptop"><span class="description-text-span">IMDB Votes:</span> ${obj.imdbVotes}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Country:</span> ${obj.Country}</p>
            <p class="description-text"><span class="description-text-span">Box Office:</span> ${obj.BoxOffice}</p>
          </div>
          <div class="plot-box">
            <h3 class="description-plot-title">Plot</h3>
            <p class="description-plot-text">${obj.Plot}</p>
          </div>`;
};

const onClick = ({ target }) => {
  if (target.nodeName !== "BUTTON") {
    return;
  }

  const [currentMovie] = movies.filter((el) => target.id === el.imdbID);
  movieBox.innerHTML = template(currentMovie);
};

const markupMoviesList = (arr) => {
  return arr
    .map(
      ({ Title, imdbID }) =>
        `<li class="list-movie-item"><button id=${imdbID} class="list-movie-btn"><span class="list-movie-btn-text">${Title}</span></button></li>`
    )
    .join("");
};

movieList.addEventListener("click", onClick);
movieList.innerHTML = markupMoviesList(movies);

const randomInteger = () => Math.floor(0 + Math.random() * (9 + 1 - 0));
movieBox.innerHTML = template(movies[randomInteger()]);
