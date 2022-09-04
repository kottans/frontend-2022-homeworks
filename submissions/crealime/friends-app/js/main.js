import store from './store.js'
import CustomRange from './range.js'
import Friends from './friends.js'
import Filters from "./filters.js";
import Pagination from './pagination.js'

const glob = {}

function initGlob() {
  glob.baseURL = new URL(window.location.href)
  glob.cardsOnPage = 24
  glob.duration = 300
  glob.currentPage = glob.baseURL.searchParams.get('page') || 1
  glob.rangeAge01 = document.querySelector('.range__age_01')
  glob.rangeAge02 = document.querySelector('.range__age_02')
  glob.trackAge = document.querySelector('.range__age-track')
  glob.valuesAge = document.querySelector('.range__age-values')
  glob.formFilters = document.querySelector('.filter')
  glob.showFilters = document.querySelector('.top-menu__show-filters')
  glob.showFiltersIcon = document.querySelector('.top-menu__show-filters-icon')
  glob.reloadData = document.querySelector('.top-menu__reload-data')
  glob.reloadDataIcon = document.querySelector('.top-menu__reload-data-icon')
  glob.preloader = document.querySelector('.preloader')
  glob.friendsContainer = document.querySelector('.friends')
  glob.main = document.querySelector('.main')
  glob.inputs = document.querySelectorAll('input')
  glob.search = document.querySelector('.top-menu__search')
  glob.paginationInput = document.querySelector('.pagination__input')
  glob.paginationLeft = document.querySelector('.pagination__left')
  glob.paginationRight = document.querySelector('.pagination__right')

  glob.colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
  glob.colorMan = getComputedStyle(document.documentElement).getPropertyValue('--color-man')
  glob.colorWoman = getComputedStyle(document.documentElement).getPropertyValue('--color-woman')

  glob.showFilters.addEventListener('click', function(e) {
    e.preventDefault()
    glob.main.classList.toggle('m-left-0')
    glob.showFiltersIcon.classList.toggle('rotate-180')
  })

  glob.reloadData.addEventListener('click', function(e) {
    e.preventDefault()
    glob.toggleClass(glob.reloadDataIcon, 'rotate-360')
    setTimeout(() => {glob.toggleClass(glob.reloadDataIcon, 'rotate-360')}, 300)
    store.init().then(() => {
      glob.friends.reloadPersons(store.persons)
      glob.filters.filterFriendsByURL(glob.baseURL)
    })
  })

  glob.formFilters.addEventListener('change', (e) => {
    if (e.target.name) glob.filters.updateURL(e.target.name, e.target.value)
    glob.filters.filterFriendsByURL(glob.baseURL)
  })

  glob.formFilters.addEventListener('reset', () => {
    glob.filters.resetURL()
    glob.filters.filterFriendsByURL(glob.baseURL)
    setTimeout(() => {
      glob.range.changeRangeValuesInHTML()
      glob.range.fillRangeTrack()}, 10)
  })

  glob.search.addEventListener('input', (e) => {
    glob.filters.updateURL(e.target.name, e.target.value)
    glob.filters.filterFriendsByURL(glob.baseURL)
  })

  glob.paginationLeft.addEventListener('click', () => {glob.pagination.listToPreviousPage()})
  glob.paginationRight.addEventListener('click', () => {glob.pagination.listToNextPage()})
  glob.paginationInput.addEventListener('change', (e) => {glob.pagination.listToThisPage(e)})

  glob.rangeAge01.addEventListener('input', (e) => {
    glob.range.changeCustomRange(e.target)
  })

  glob.rangeAge02.addEventListener('input', (e) => {
    glob.range.changeCustomRange(e.target)
  })
}

glob.toggleClass = function(tElement, tClass) {
  tElement.classList.toggle(tClass)
}

function fadeOut(element, duration, delay) {
  const animation = element.animate([
    {opacity: 1},
    {opacity: 0}
  ], {
    delay,
    duration,
    easing: 'ease-out'
  })
  animation.addEventListener('finish', function() {
    element.style.display = 'none'
  })
}

function initAgeRange() {
  glob.range = new CustomRange(glob)
  glob.range.changeRangeValuesInHTML()
  glob.range.fillRangeTrack()
}

function initPagination() {
  glob.pagination = new Pagination(glob)
  glob.pagination.setCurrentPageToInput()
}

function initFriends() {
  store.init().then(() => {
    glob.friends = new Friends(store.persons, glob)
    glob.filters.filterFriendsByURL(glob.baseURL)
  })
}

function initFilters() {
  glob.filters = new Filters(glob)
  glob.filters.setInputs()
  glob.filters.replaceHistory()
}

function watchHistory() {
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      glob.baseURL = new URL(e.state.href)
      glob.filters.filterFriendsByURL(glob.baseURL)
      glob.filters.setInputs()
      glob.pagination.setCurrentPageToInput()
    }
  })
}

window.addEventListener('load', function() {
  initGlob()
  initAgeRange()
  initPagination()
  initFriends()
  initFilters()
  watchHistory()
  fadeOut(glob.preloader, 300, 500)
})

setTimeout(() => fadeOut(glob.preloader, 300, 500), 3000)
