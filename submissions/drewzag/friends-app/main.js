import { getRandomUsers } from './data.js'
import { isQueryParams, filterByName, filterByGender, sortUsers } from './helpers.js'

const NAME = 'name'
const GENDER = 'gender'
const MALE = 'male'
const FEMALE = 'female'

const menuButton = document.querySelector('.menu')
const header = document.querySelector('.header')
menuButton.addEventListener('click', () => {
  header.classList.toggle('open')
})

const genderAll = document.querySelector('#all')
const genderMale = document.querySelector('#male')
const genderFemale = document.querySelector('#female')

const wrapper = document.querySelector('.cards__wrapper')
const url = new URL(window.location)

const inputFind = document.querySelector('.input__find')

const sortAgeAsc = document.querySelector('#age_asc')
const sortAgeDesc = document.querySelector('#age_desc')

const sortNameAsc = document.querySelector('#name_asc')
const sortNameDesc = document.querySelector('#name_desc')

const showUsers = async (amount) => {
  !amount && (amount = 25)
  url.searchParams.set('results', amount)
  history.pushState('', '', url.href)
  const users = await getRandomUsers(amount)

  displayUsers(users)

  sortNameAsc.addEventListener('click', () => {
    url.searchParams.set('sort', 'name_acs')
    history.pushState('', '', url.href)
    displayUsers(sortUsers(users, 'name_acs'))
  })

  sortNameDesc.addEventListener('click', () => {
    url.searchParams.set('sort', 'name_desc')
    history.pushState('', '', url.href)
    displayUsers(sortUsers(users, 'name_desc'))
  })

  sortAgeAsc.addEventListener('click', () => {
    url.searchParams.set('sort', 'age_asc')
    history.pushState('', '', url.href)
    displayUsers(sortUsers(users, 'age_asc'))
  })

  sortAgeDesc.addEventListener('click', () => {
    url.searchParams.set('sort', 'age_desc')
    history.pushState('', '', url.href)
    displayUsers(sortUsers(users, 'age_desc'))
  })

  inputFind.addEventListener('keyup', () => {
    url.searchParams.set(NAME, inputFind.value)
    displayUsers(filterByName(users, NAME, inputFind.value))
    setTimeout(() => {
      history.pushState('', '', url.href)
      isQueryParams(url, NAME)
    }, 2000)
  })

  genderAll.addEventListener('click', () => {
    url.searchParams.set(GENDER, 'all')
    history.pushState('', '', url.href)
    displayUsers(users)
  })
  genderMale.addEventListener('click', () => {
    url.searchParams.set(GENDER, MALE)
    history.pushState('', '', url.href)
    displayUsers(filterByGender(users, GENDER, MALE))
  })
  genderFemale.addEventListener('click', () => {
    url.searchParams.set(GENDER, FEMALE)
    history.pushState('', '', url.href)
    displayUsers(filterByGender(users, GENDER, FEMALE))
  })

  const resetButton = document.querySelector('.reset')
  resetButton.addEventListener('click', () => {
    url.searchParams.set('gender', '')
    url.searchParams.set('sort', '')
    url.searchParams.set('name', '')
    const sortNodes = document.querySelectorAll('input[type="radio"]')
    sortNodes.forEach((node) => {
      if (node.defaultValue === 'all') {
        node.checked = true
      } else node.checked = false
    })
    inputFind.value = ''
    history.pushState('', '', url.href)
    header.classList.remove('open')
    displayUsers(users)
  })
}

const displayUsers = (users) => {
  let filtredUsers = [...users]

  if (isQueryParams(url, NAME)) {
    filtredUsers = filterByName(filtredUsers, NAME, url.searchParams.get(NAME))
    inputFind.value = url.searchParams.get(NAME)
  }
  if (
    (isQueryParams(url, 'gender') && url.searchParams.get('gender') === 'male') ||
    url.searchParams.get('gender') === 'female'
  ) {
    const query = url.searchParams.get('gender')
    filtredUsers = filterByGender(filtredUsers, 'gender', query)
    const sortNodes = document.querySelectorAll('input[name="gender"]')
    sortNodes.forEach((node) => {
      if (node.defaultValue === query) {
        node.checked = true
      } else {
        node.checked = false
      }
    })
  }
  if (isQueryParams(url, 'sort')) {
    const query = url.searchParams.get('sort')
    const sortNodes = document.querySelectorAll('input[name="sort"]')
    filtredUsers = sortUsers(filtredUsers, query)
    sortNodes.forEach((node) => {
      if (node.defaultValue === query) {
        node.checked = true
      } else {
        node.checked = false
      }
    })
  }

  const container = document.createDocumentFragment()
  filtredUsers.forEach((user) => {
    const card = document.createElement('div')
    const info = document.createElement('div')
    const fullName = document.createElement('div')
    const age = document.createElement('div')
    const phone = document.createElement('div')
    const img = document.createElement('img')
    card.classList.add('card')
    info.classList.add('info')
    fullName.classList.add('full_name')
    age.classList.add('age')
    phone.classList.add('phone')
    img.classList.add('photo')
    fullName.textContent = user.name.first + ' ' + user.name.last
    age.textContent = user.dob.age + ' years'
    phone.textContent = 'phone: ' + user.phone
    info.append(fullName, age, phone)
    img.src = user.picture.large
    img.alt = ''
    card.append(img, info)
    container.append(card)
  })
  wrapper.replaceChildren(container)
}

showUsers(url.searchParams.get('results'))
