export default class Filters {
  constructor(glob) {
    this.glob = glob
  }

  setInputs() {
    const params = this.glob.baseURL.searchParams

    document.querySelectorAll(`input[type="radio"]`).forEach(el => el.checked = false)

    if (!params.has('page')) {
      this.glob.currentPage = 1
      this.glob.pagination.setCurrentPageToInput()
    }
    if (!params.has('age-min')) {
      document.querySelector(`input[name="age-min"]`).value = 0
    }
    if (!params.has('age-max')) {
      document.querySelector(`input[name="age-max"]`).value = 100
    }

    for (let p of params) {
      if (p[0] === 'page') {
        this.glob.currentPage = p[1]
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

    this.glob.range.changeRangeValuesInHTML()
    this.glob.range.fillRangeTrack()
  }

  setHistory() {
    this.pushHistory()
    this.replaceHistory()
  }

  pushHistory() {
    history.pushState({href: window.location.href}, null, this.glob.baseURL.href)
  }

  replaceHistory() {
    history.replaceState({href: window.location.href}, null, this.glob.baseURL.href)
  }

  updateURL(param, value) {
    this.glob.baseURL.searchParams.set(param, value)
    if (param === 'is-name' && value.length === 0) this.glob.baseURL.searchParams.delete('is-name')
    this.setHistory()
  }

  resetURL() {
    const properties = ['sort-by', 'by-gender', 'age-min', 'age-max']
    properties.forEach(el => this.glob.baseURL.searchParams.delete(el))
    this.setHistory()
  }

  sortPersons(sortFoo) {
    this.glob.friends.personsEdit = this.glob.friends.personsEdit.sort(sortFoo)
  }

  filterPersons(filterFoo) {
    this.glob.friends.personsEdit = this.glob.friends.personsEdit.filter(filterFoo)
  }

  filterFriendsByURL(url) {
    this.glob.friends.personsEdit = [...this.glob.friends.persons]
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

    if (this.glob.currentPage > this.glob.friends.personsEdit.length / this.glob.cardsOnPage) {
      this.glob.pagination.changePage(Math.ceil(this.glob.friends.personsEdit.length / this.glob.cardsOnPage) || 1)
    }

    this.glob.friends.renderFriends(this.glob.friends.personsEdit)
  }
}
