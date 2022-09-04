document.addEventListener("DOMContentLoaded", function() {

  const url = 'json/movies.json'
  let moviesData = []
  const menuUl = document.querySelector('.menu__ul')
  const menu = document.querySelector('.menu')
  const movieContent = document.querySelector('.main')
  const movieRandomize = document.querySelector('.menu__random')
  const menuShowButton = document.querySelector('.hamburger')

  function getMenuTemplate({id, title}) {
    return `
			<div class="menu__li">
				<a class="menu__link" href="#" title="Seven Random Marvel Movies" data-id="${id}">${title}</a>
			</div>
		`
  }

  function getMovieTemplate({title, description, release, box, runtime, picture}) {

    return `
		<section class="movie">
			<div class="movie__left">
				<div class="preloader">
					<div class="spinner"></div>
				</div>
				<img class="movie__img" src="${picture}" alt="${title}">
			</div>
			<div class="movie__center">
				<h2 class="movie__title">${title}</h2>
				<div class="movie__info-box">
					<div class="movie__info">
						<div class="movie__param">Release Date:</div>
						<div class="movie__param-value">${release}</div>
					</div>
					<div class="movie__info">
						<div class="movie__param">Box Office:</div>
						<div class="movie__param-value">${box}</div>
					</div>
					<div class="movie__info">
						<div class="movie__param">Runtime:</div>
						<div class="movie__param-value">${runtime}</div>
					</div>
				</div>
				<p class="movie__description">${description}</p>
			</div>
			<div class="movie__right"></div>
		</section>
		`
  }

  function addActiveClassToMenuItem(id) {
    const menuLinks = document.querySelectorAll('.menu__link')
    menuLinks.forEach(el => {
      el.classList.remove('active')
      if (el.dataset.id === id) el.classList.add('active')
    })
  }

  function renderActualMovie(movies, id = '01') {

    movieContent.innerHTML = ''

    const activeMovie = movies.find(el => el.id === id)
    const activeMovieHTML = getMovieTemplate(activeMovie)

    movieContent.insertAdjacentHTML('afterbegin', activeMovieHTML)

    addActiveClassToMenuItem(id)
  }

  function renderMoviesMenu(movies) {

    menuUl.innerHTML = ''

    const fragment = movies.reduce((acc, el) => {
      acc += getMenuTemplate(el)
      return acc
    }, '')

    menuUl.insertAdjacentHTML('afterbegin', fragment)
  }

  function randomMovies(movies) {
    const arrOfRandomMovies = []

    while(arrOfRandomMovies.length < 7) {
      const index = Math.floor(Math.random() * movies.length)
      if (arrOfRandomMovies.some(el => el.id === movies[index].id)) continue
      arrOfRandomMovies.push(movies[index])
    }

    renderMoviesMenu(arrOfRandomMovies)
    renderActualMovie(arrOfRandomMovies, arrOfRandomMovies[0].id)
  }

  async function getMoviesData(url) {
    return await fetch(url).then(response => response.json())
  }

  getMoviesData(url)
    .then(data => {
      moviesData = data
      randomMovies(moviesData)
    })
    .catch(error => console.log(error))

  menuUl.addEventListener('click', function (event) {
    event.preventDefault()
    const movieId = event.target.dataset.id
    renderActualMovie(moviesData, movieId)
  })

  movieRandomize.addEventListener('click', function (event) {
    event.preventDefault()
    randomMovies(moviesData)
  })

  function toggleMenuClass() {
    menuShowButton.classList.toggle('active')
    menu.classList.toggle('active')
  }

  function hideMenuClass() {
    menuShowButton.classList.remove('active')
    menu.classList.remove('active')
  }

  menuShowButton.addEventListener('click', function () {
    toggleMenuClass()
  })

  menu.addEventListener('click', function () {
    hideMenuClass()
  })

})
