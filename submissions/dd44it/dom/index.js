document.addEventListener('DOMContentLoaded', load)

function load(){
  'use strict'
  const movieList = document.querySelector('.movie_list')
  const movieContent = document.querySelector('.movie_content')

  function getData(){
    try{
      const get = fetch('json/data.json')
      get
        .then((response) => response.json())
        .then((data) => {
          renderList(data, 1)
          renderContent(data, 1)
        })
        .catch(err => {
          console.log(err)
        })
    }
    catch(err){
      console.log(err)
    }
  }
  function renderList(data, idActive){
    data.horror_page.forEach(movie => {
      const liItem = document.createElement('li')
      liItem.classList.add('movie_list__item')
      liItem.dataset.idMovie = movie.movie_id 
      liItem.textContent = movie.movie_name
      if(movie.movie_id === idActive) liItem.classList.add('active')
      movieList.append(liItem)
      liItem.addEventListener('click', () => {
        renderContent(data, +liItem.dataset.idMovie)
        removeActiveState('.movie_list__item')
        liItem.classList.add('active')
      })
    })
  }
  
  function removeActiveState(selector){
    const list = document.querySelectorAll(selector)
    list.forEach(li => li.classList.remove('active'))
  }
  
  function renderContent(data, idContent){
    const chosenContent = data.horror_page.find(movie => movie.movie_id === idContent)
    const template = `
    <div class="column-1">
      <div class="poster_wrap">
        <img class="image" src="${chosenContent.images.webp}" alt="${chosenContent.movie_name} movie">
      </div>
    </div>
    <article class="column-2">
      <div class="additional_info">
        <h2 class="movie_name">${chosenContent.movie_name} </h2>
        <p>year: ${chosenContent.movie_year} </p>
        <p>rating on imdb: ${chosenContent.rating_imdb} </p>
      </div>
      <h3 class="description_name">SUMMARY</h3>
      <p class="description_text">${chosenContent.description} </p>
    </article>
    `
    movieContent.innerHTML = template
  }
  getData()
}