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

const message = {
    loading: 'loading...',
    failure: 'Something went wrong, please reload this page',
    spinner: '../img/icons/spinner.gif',
    fail: '../img/icons/fail2.png',
}

let statusMessage

function showLoadingStatus(picture, textPicture) {
    statusMessage = document.createElement('div')
    statusMessage.classList.add('status')

    let statusImg = document.createElement('img')
    statusImg.setAttribute('src', `${picture}`)
    statusMessage.appendChild(statusImg)

    let textMessage = document.createElement('div')
    textMessage.textContent = `${textPicture}`
    statusMessage.appendChild(textMessage)

    content.appendChild(statusMessage)
}

async function getResponse() {
    showLoadingStatus(message.spinner, message.loading)
    try {
        const response = await fetch(url)
        const data = await response.json()
        const { results } = await data
        dataBase = [...results]
        sortedDataBase = [...dataBase]
        showCards(dataBase)
        statusMessage.remove()
    } catch (e) {
        console.error(e)
        statusMessage.remove()
        showLoadingStatus(message.fail, message.failure)
    }
}

function createCards(user) {
    let colorGender = ''
    let bgcolorName = ''
    if (user.gender == 'female') {
        colorGender = 'color_violet'
        bgcolorName = 'bgcolor_violet'
    }

    return `
   <article class="cards__wrapper"> 
        <div class="cards__wrapper-name ${bgcolorName}">
        <h3> ${user.name.first} ${user.name.last}</h3>
        </div>

        <div class="cards__wrapper-photo">
            <img src=${user.picture.large} alt="">
        </div>

        <div class="cards__wrapper-years">
        I have ${user.dob.age} years old
        </div>

        <div class="cards__wrapper-email">
            <a href='mailto:${user.email}'>${user.email}</a>
        </div>

        <div class="cards__wrapper-phone">
            <a  href="tel:+ ${user.cell}"> ${user.cell}</a>
        </div>

        <div class="cards__wrapper-city">
            ${user.location.city}
        </div>

        <hr class="devider">

        <div class="cards__wrapper-gender ${colorGender}">${user.gender}</div>
   </article>
 `
}

function showCards(dataBase) {
    const cardSection = document.createElement('div')
    cardSection.classList.add('cards')
    cardSection.innerHTML = dataBase.reduce(
        (acc, user) => (acc += createCards(user)),
        ''
    )
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

function compareAge(firstUser, secondUser) {
    return firstUser.dob.age <= secondUser.dob.age ? -1 : 1
}

function compareName(firstUser, secondUser) {
    return firstUser.name.first.toLowerCase() <=
        secondUser.name.first.toLowerCase()
        ? -1
        : 1
}

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
    const genderValue = myForm.gender.value
    if (genderValue === 'all') {
        return dataArray
    }
    return dataArray.filter((user) => user.gender === `${genderValue}`)
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
