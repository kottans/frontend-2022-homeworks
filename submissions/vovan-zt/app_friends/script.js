const url = 'https://randomuser.me/api/?results=40'

const myForm = document.querySelector('.form'),
    content = document.querySelector('.content'),
    resetBtn = document.querySelector('.filter__reset-button'),
    hamburgerBtn = document.querySelector('.hamburger'),
    filter = document.querySelector('.filter'),
    closeBtn = document.querySelector('.filter__close'),
    container = document.querySelector('.container')

let dataBase = []
let sortedDataBase = []

async function getResponse() {
    try {
        const response = await fetch(url)
        const data = await response.json()
        const { results } = await data
        dataBase = [...results]
        sortedDataBase = [...dataBase]
        showCards(dataBase)
    } catch (e) {
        console.error(e)
    }
}

function createCards({ picture, name, dob, gender, location, email, cell }) {
    let colorGender = ''
    let bgcolorName = ''
    if (gender == 'female') {
        colorGender = 'color_violet'
        bgcolorName = 'bgcolor_violet'
    }

    return `
   <article class="cards__wrapper"> 
        <div class="cards__wrapper-name ${bgcolorName}">
        <h3> ${name.first} ${name.last}</h3>
        </div>

        <div class="cards__wrapper-photo">
            <img src=${picture.large} alt="">
        </div>

        <div class="cards__wrapper-years">
        I have ${dob.age} years old
        </div>

        <div class="cards__wrapper-email">
            <a href='mailto:${email}'>${email}</a>
        </div>

        <div class="cards__wrapper-phone">
            <a  href="tel:+ ${cell}"> ${cell}</a>
        </div>

        <div class="cards__wrapper-city">
            ${location.city}
        </div>

        <hr class="devider">

        <div class="cards__wrapper-gender ${colorGender}">${gender}</div>
   </article>
 `
}

function showCards(dataBase) {
    const cardSection = document.createElement('div')
    cardSection.classList.add('cards')

    const cardsHTML = dataBase
        .map(({ picture, name, dob, gender, location, email, cell }) => {
            return createCards({
                picture,
                name,
                dob,
                gender,
                location,
                email,
                cell,
            })
        })
        .join('')

    cardSection.innerHTML = cardsHTML
    content.append(cardSection)
}

function searchByInput(sortedDataBase) {
    if (myForm.searchAge.value && !myForm.searchName.value) {
        return inputSearchAge(sortedDataBase)
    } else if (myForm.searchName.value && !myForm.searchAge.value) {
        return inputSearchName(sortedDataBase)
    } else if (myForm.searchName.value && myForm.searchAge.value) {
        const searchAge = inputSearchAge(sortedDataBase)
        return inputSearchName(searchAge)
    } else {
        return sortedDataBase
    }
}

function inputSearchAge(dataArray) {
    return dataArray.filter((card) => {
        const age = `${card.dob.age}`
        return age.includes(myForm.searchAge.value)
    })
}

function inputSearchName(dataArray) {
    return dataArray.filter((card) => {
        const fullName = `${card.name.first} ${card.name.last}`
        if (myForm.searchName.value.length >= 3) {
            return fullName
                .toLowerCase()
                .includes(myForm.searchName.value.toLowerCase())
        } else return fullName
    })
}

const compareAge = (firstUser, secondUser) =>
    firstUser.dob.age - secondUser.dob.age

const compareName = (firstUser, secondUser) =>
    firstUser.name.first.toLowerCase() <= secondUser.name.first.toLowerCase()
        ? -1
        : 1

function sortingUsers(dataArray) {
    if (myForm.sorting.value === 'ageUp') {
        return dataArray.sort((a, b) => compareAge(a, b))
    } else if (myForm.sorting.value === 'ageDown') {
        return dataArray.sort((a, b) => compareAge(b, a))
    }

    if (myForm.sorting.value === 'nameUp') {
        return dataArray.sort((a, b) => compareName(a, b))
    } else if (myForm.sorting.value === 'nameDown') {
        return dataArray.sort((a, b) => compareName(b, a))
    }
}

function filterByGender(dataArray) {
    if (myForm.male.checked) {
        return dataArray.filter((user) => user.gender === 'male')
    }
    if (myForm.female.checked) {
        return dataArray.filter((user) => user.gender === 'female')
    }
    if (myForm.all.checked) {
        return dataArray
    }
}

function resetFilters() {
    sortedDataBase = [...dataBase]
    content.innerHTML = ''
    myForm.reset()
    showCards(sortedDataBase)
}

function changeForm() {
    sortingUsers(sortedDataBase)
    const filterGender = filterByGender(sortedDataBase)
    const searchInput = searchByInput(filterGender)

    content.innerHTML = ''
    showCards(searchInput)
    return searchInput
}

function toggleFilter() {
    filter.classList.toggle('filter__active')
    container.classList.toggle('container__active')
}

document.addEventListener('DOMContentLoaded', function () {
    getResponse()

    hamburgerBtn.addEventListener('click', toggleFilter)
    closeBtn.addEventListener('click', toggleFilter)
    myForm.addEventListener('input', changeForm)
    myForm.addEventListener('submit', (e) => e.preventDefault())
    resetBtn.addEventListener('click', resetFilters)
})
