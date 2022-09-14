import Store from './store.js'
import CustomRange from './range.js'
import Friends from './friends.js'
import Filters from "./filters.js";
import Pagination from './pagination.js'
import Error from './error.js'

const GLOB = {}

function initGlob() {
  GLOB.config = {
    base: new URL('https://randomuser.me/api/'),
    inc: 'dob,gender,name,phone,location,picture,login',
    nat: 'us,de,fr,gb,ua,us,ca',
    results: 240,
    getUrl() {
      this.base.searchParams.set('inc', this.inc)
      this.base.searchParams.set('nat', this.nat)
      this.base.searchParams.set('results', this.results)
      return this.base
    }
  }
  GLOB.baseURL = new URL(window.location.href)
  GLOB.cardsOnPage = 24
  GLOB.duration = 300
  GLOB.delay = 500
  GLOB.currentPage = GLOB.baseURL.searchParams.get('page') || 1
  GLOB.rangeAge01 = document.querySelector('.range__age_01')
  GLOB.rangeAge02 = document.querySelector('.range__age_02')
  GLOB.trackAge = document.querySelector('.range__age-track')
  GLOB.valuesAge = document.querySelector('.range__age-values')
  GLOB.formFilters = document.querySelector('.filter')
  GLOB.showFilters = document.querySelector('.top-menu__show-filters')
  GLOB.showFiltersIcon = document.querySelector('.top-menu__show-filters-icon')
  GLOB.reloadData = document.querySelector('.top-menu__reload-data')
  GLOB.reloadDataIcon = document.querySelector('.top-menu__reload-data-icon')
  GLOB.preloader = document.querySelector('.preloader')
  GLOB.friendsContainer = document.querySelector('.friends')
  GLOB.main = document.querySelector('.main')
  GLOB.inputs = document.querySelectorAll('input')
  GLOB.search = document.querySelector('.top-menu__search')
  GLOB.paginationInput = document.querySelector('.pagination__input')
  GLOB.paginationLeft = document.querySelector('.pagination__left')
  GLOB.paginationRight = document.querySelector('.pagination__right')

  GLOB.colorPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
  GLOB.colorMan = getComputedStyle(document.documentElement).getPropertyValue('--color-man')
  GLOB.colorWoman = getComputedStyle(document.documentElement).getPropertyValue('--color-woman')

  GLOB.showFilters.addEventListener('click', function(e) {
    e.preventDefault()
    GLOB.main.classList.toggle('m-left-0')
    GLOB.showFiltersIcon.classList.toggle('rotate-180')
  })

  GLOB.reloadData.addEventListener('click', function(e) {
    e.preventDefault()
    GLOB.toggleClass(GLOB.reloadDataIcon, 'rotate-360')
    setTimeout(() => {GLOB.toggleClass(GLOB.reloadDataIcon, 'rotate-360')}, 300)
    GLOB.friends.removeFriends()
    initFriends()
  })

  GLOB.formFilters.addEventListener('change', (e) => {
    if (e.target.name) GLOB.filters.updateURL(e.target.name, e.target.value)
    GLOB.filters.filterFriendsByURL(GLOB.baseURL)
  })

  GLOB.formFilters.addEventListener('reset', () => {
    GLOB.filters.resetURL()
    GLOB.filters.filterFriendsByURL(GLOB.baseURL)
    setTimeout(() => {
      GLOB.range.changeRangeValuesInHTML()
      GLOB.range.fillRangeTrack()}, 10)
  })

  GLOB.search.addEventListener('input', (e) => {
    GLOB.filters.updateURL(e.target.name, e.target.value)
    GLOB.filters.filterFriendsByURL(GLOB.baseURL)
  })

  GLOB.paginationLeft.addEventListener('click', () => {GLOB.pagination.listToPreviousPage()})
  GLOB.paginationRight.addEventListener('click', () => {GLOB.pagination.listToNextPage()})
  GLOB.paginationInput.addEventListener('change', (e) => {GLOB.pagination.listToThisPage(e)})

  GLOB.rangeAge01.addEventListener('input', (e) => {
    GLOB.range.changeCustomRange(e.target)
  })

  GLOB.rangeAge02.addEventListener('input', (e) => {
    GLOB.range.changeCustomRange(e.target)
  })
}

GLOB.toggleClass = function(tElement, tClass) {
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
    element.remove()
  })
}

function initAgeRange() {
  GLOB.range = new CustomRange(GLOB)
  GLOB.range.changeRangeValuesInHTML()
  GLOB.range.fillRangeTrack()
}

function initPagination() {
  GLOB.pagination = new Pagination(GLOB)
  GLOB.pagination.setCurrentPageToInput()
}

function initFriends() {
  const store = new Store(GLOB.config.getUrl())
    store.init().then((response) => {
    GLOB.friends = new Friends(response, GLOB)
    GLOB.filters.filterFriendsByURL(GLOB.baseURL)
  })
    .catch(() => {
      const errorDOMElement = new Error('Server error. Please try again later.').showError()
      setTimeout(() => fadeOut(errorDOMElement, 500, GLOB.delay), 5000)
    })
}

function initFilters() {
  GLOB.filters = new Filters(GLOB)
  GLOB.filters.setInputs()
  GLOB.filters.replaceHistory()
}

function watchHistory() {
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      GLOB.baseURL = new URL(e.state.href)
      GLOB.filters.filterFriendsByURL(GLOB.baseURL)
      GLOB.filters.setInputs()
      GLOB.pagination.setCurrentPageToInput()
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
  fadeOut(GLOB.preloader, GLOB.duration, GLOB.delay)
})

setTimeout(() => fadeOut(GLOB.preloader, GLOB.duration, GLOB.delay), 3000)
