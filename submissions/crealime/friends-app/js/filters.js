export default class Filters {
  constructor(glob) {
    this.GLOB = glob
  }

  setInputs() {
    const params = this.GLOB.baseURL.searchParams

    document.querySelectorAll(`input[type="radio"]`).forEach(input => input.checked = false)

    if (!params.has('page')) {
      this.GLOB.currentPage = 1
      this.GLOB.pagination.setCurrentPageToInput()
    }
    if (!params.has('age-min')) {
      document.querySelector(`input[name="age-min"]`).value = 0
    }
    if (!params.has('age-max')) {
      document.querySelector(`input[name="age-max"]`).value = 100
    }

    for (let p of params) {
      if (p[0] === 'page') {
        this.GLOB.currentPage = p[1]
      }
      if (p[0] === 'age-min' || p[0] === 'age-max' || p[0] === 'is-name') {
        document.querySelector(`input[name="${p[0]}"]`).value = p[1]
      }
      if (p[0] === 'sort-by') {
        document.querySelector(`input[value="${p[1]}"]`).checked = true
      }
      if (p[0] === 'by-gender') {
        document.querySelector(`input[value="${p[1]}"]`).checked = true
      }
    }

    this.GLOB.range.changeRangeValuesInHTML()
    this.GLOB.range.fillRangeTrack()
  }

  setHistory() {
    this.pushHistory()
    this.replaceHistory()
  }

  pushHistory() {
    history.pushState({href: window.location.href}, null, this.GLOB.baseURL.href)
  }

  replaceHistory() {
    history.replaceState({href: window.location.href}, null, this.GLOB.baseURL.href)
  }

  updateURL(param, value) {
    this.GLOB.baseURL.searchParams.set(param, value)
    if (param === 'is-name' && value.length === 0) this.GLOB.baseURL.searchParams.delete('is-name')
    this.setHistory()
  }

  resetURL() {
    const properties = ['sort-by', 'by-gender', 'age-min', 'age-max']
    properties.forEach(property => this.GLOB.baseURL.searchParams.delete(property))
    this.setHistory()
  }

  sortPersons(sortFoo) {
    this.GLOB.friends.personsEdit = this.GLOB.friends.personsEdit.sort(sortFoo)
  }

  filterPersons(filterFoo) {
    this.GLOB.friends.personsEdit = this.GLOB.friends.personsEdit.filter(filterFoo)
  }

  filterFriendsByURL(url) {
    this.GLOB.friends.personsEdit = [...this.GLOB.friends.persons]
    const params = url.searchParams

    for (let p of params) {
      if (p[1] === 'name-up') this.sortPersons((a, b) => a.name.first > b.name.first ? 1 : -1)
      if (p[1] === 'name-down') this.sortPersons((a, b) => a.name.first < b.name.first ? 1 : -1)
      if (p[1] === 'age-up') this.sortPersons((a, b) => a.dob.age - b.dob.age)
      if (p[1] === 'age-down') this.sortPersons((a, b) => b.dob.age - a.dob.age)
      if (p[0] === 'age-min') this.filterPersons(person => person.dob.age >= p[1])
      if (p[0] === 'age-max') this.filterPersons(person => person.dob.age <= p[1])
      if (p[0] === 'by-gender' && p[1] !== 'all') this.filterPersons(person => person.gender === p[1])
      if (p[0] === 'is-name') this.filterPersons(person => `${person.name.first} ${person.name.last}`.toLowerCase().includes(p[1].toLowerCase()))
    }

    if (this.GLOB.currentPage > this.GLOB.friends.personsEdit.length / this.GLOB.cardsOnPage) {
      this.GLOB.pagination.changePage(Math.ceil(this.GLOB.friends.personsEdit.length / this.GLOB.cardsOnPage) || 1)
    }

    this.GLOB.friends.renderFriends(this.GLOB.friends.personsEdit)
  }
}
