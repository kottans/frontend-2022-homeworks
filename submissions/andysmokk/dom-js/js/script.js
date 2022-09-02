import movies from "../data/data.json" assert { type: "json" };

const movieList = document.querySelector(".list-movie");
const movieBox = document.querySelector(".movie-box");

const template = (arr) => {
  return `<img class="img-poster" src=${arr[0].Poster} alt="poster">
          <div class="description-box">
            <h2 class="description-text description-title"> ${arr[0].Title}</h2>
            <p class="description-text"><span class="description-text-span">Genre:</span> ${arr[0].Genre}</p>
            <p class="description-text"><span class="description-text-span">IMDB:</span> ${arr[0].imdbRating}</p>
            <p class="description-text description-text__hidden-laptop"><span class="description-text-span">Year:</span> ${arr[0].Year}</p>
            <p class="description-text"><span class="description-text-span">Released:</span> ${arr[0].Released}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Runtime:</span> ${arr[0].Runtime}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Awards:</span> ${arr[0].Awards}</p>
            <p class="description-text description-text__hidden-laptop"><span class="description-text-span">IMDB Votes:</span> ${arr[0].imdbVotes}</p>
            <p class="description-text description-text__hidden-tablet"><span class="description-text-span">Country:</span> ${arr[0].Country}</p>
            <p class="description-text"><span class="description-text-span">Box Office:</span> ${arr[0].BoxOffice}</p>
          </div>
          <div class="plot-box">
            <h3 class="description-plot-title">Plot</h3>
            <p class="description-plot-text">${arr[0].Plot}</p>
          </div>`;
};

const onClick = ({ target }) => {
  if (target.nodeName !== "BUTTON") {
    return;
  }

  const currentMovie = movies.filter((el) => target.id === el.imdbID);
  movieBox.innerHTML = template(currentMovie);
};

const markupMoviesList = (arr) => {
  return arr
    .map(
      ({ Title, imdbID }) =>
        `<li class="list-movie-item"><button id=${imdbID} class="list-movie-btn" onclick="() => onClick()"><span class="list-movie-btn-text">${Title}</span></button></li>`
    )
    .join("");
};

movieList.addEventListener("click", onClick);
movieList.innerHTML = markupMoviesList(movies);
movieBox.innerHTML = template(movies);
