export default class Friends {
  constructor(persons, glob) {
    this.persons = persons
    this.GLOB = glob
    this.personsEdit = [...this.persons]
  }

  renderFriends(persons = this.personsEdit, page = this.GLOB.currentPage) {
    this.GLOB.friendsContainer.classList.toggle('opacity-0')

    setTimeout(() => {
      this.GLOB.friendsContainer.innerHTML = persons.slice((page - 1) * this.GLOB.cardsOnPage, page * this.GLOB.cardsOnPage).reduce((acc, person) => {
        return acc + this.getCardTemplate(person)
      }, '')
      this.GLOB.friendsContainer.classList.toggle('opacity-0')
    }, this.GLOB.duration)
  }

  getCardTemplate(person) {
    return `
      <div data-id="${person.login.md5}" class="card color-${person.gender}">
        <div class="card__header">
          <div class="card__nick">${person.login.password}</div>
          <div class="card__age">${person.dob.age}</div>
        </div>
        <div class="card__main">
          <img src="${person.picture.large}" alt="${person.login.password}" class="card__img">
          <div class="card__name">${person.name.first} ${person.name.last}</div>
          <div class="card__contacts">
            <div class="card__tel">${person.phone}</div>
            <div class="card__country">${person.location.country}, ${person.location.city}</div>
            <div class="card__address">${person.location.street.name}, ${person.location.street.number}</div>
          </div>
        </div>
        <div class="card__footer">
          <div class="card__gender">
            ${person.gender === 'male' 
              ? '<i class="fa-solid fa-mars"></i>'
              : '<i class="fa-solid fa-venus"></i>'}
          </div>
        </div>
      </div>
    `
  }

  removeFriends() {
    this.GLOB.friendsContainer.innerHTML = ''
    for (let i = 0; i < this.GLOB.cardsOnPage; i++) {
      this.GLOB.friendsContainer.innerHTML += this.getEmptyCardTemplate()
    }
  }

  getEmptyCardTemplate() {
    return `
    <div class="card blinker"></div>
    `
  }
}
