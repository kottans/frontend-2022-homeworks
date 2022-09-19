const url = 'https://randomuser.me/api/?results=5000&inc=gender,name,email,dob,phone,picture&seed=foobar'

const cardsField = document.querySelector('.contentWrapper')
const formWrapper = document.querySelector('.searchFormWrapper')
const form = document.querySelector('.searchForm')
const searchIput = document.querySelector('#searchName')
const burgerMenu = document.querySelector('.burgerBtn')
const paginationList = document.querySelector('.paginationList')

let users = []
const numberUsersOnPage = 24
let numberOfFetchRequests = 0

document.addEventListener("DOMContentLoaded", loadData)
form.addEventListener('input', () => renderPageContent(currentPage = 1))
form.addEventListener("submit", (e) => e.preventDefault())
burgerMenu.addEventListener('click', searchFormSwitch)
paginationList.addEventListener('click', handleChangePage)

async function loadData() {
    try {
        numberOfFetchRequests++
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`http status ${response.status}`)
        }
        const data = await response.json()
        users = data.results
        renderPageContent(currentPage = 1)
        activateInputs()
    }
    catch (e) {
        console.error(`FRIENDS ERROR: ${e}`)
        let secondsToReload = 5
        const interval = setInterval(() => {
            cardsField.innerHTML =
                `<div class="error">
                    <p>Somthing went wrong</p>
                    <p>The page will reload in ${secondsToReload} sec</p>
                </div>`
            if (--secondsToReload < 0) {
                clearInterval(interval)
                secondsToReload = 5
                loadData()
            }
            if (numberOfFetchRequests > 5) {
                clearInterval(interval)
                cardsField.innerHTML =
                    `<div class="error">
                        <p>Somthing went wrong</p>
                        <p>Please reload the page in a few minutes.</p>
                    </div>`
            }
        }, 1000)
    }
}
function activateInputs() {
    formWrapper.classList.add('input-active')
}
function renderPageContent(currentPage) {
    const usersForRender = prepairUsersForRender()
    createPaginationList(usersForRender, currentPage)
    renderCards(preparCardsToRender(getUsersForCurrentPage(usersForRender, currentPage)))
}
function prepairUsersForRender() {
    const searchedByName = searchByName(users)
    const filteredByGender = filterByGender(searchedByName)
    sortUsers(filteredByGender)
    return filteredByGender
}
function searchByName(users) {
    if (!form.searchName.value) {
        return users
    }
    return users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase()
            .includes(form.searchName.value.toLowerCase()))
}
function sortUsers(users) {
    function sortOrder(a, b) {
        return a < b ? -1 : 1
    }
    switch (form.sort.value) {
        case 'ageUp':
            return users.sort((userA, userB) => sortOrder(userA.dob.age, userB.dob.age))
        case 'ageDown':
            return users.sort((userA, userB) => sortOrder(userB.dob.age, userA.dob.age))
        case 'az':
            return users.sort((userA, userB) =>
                sortOrder(`${userA.name.first} ${userA.name.last}`, `${userB.name.first} ${userB.name.last}`))
        case 'za':
            return users.sort((userA, userB) =>
                sortOrder(`${userB.name.first} ${userB.name.last}`, `${userA.name.first} ${userA.name.last}`))
    }
}
function filterByGender(users) {
    if (form.gender.value === 'all') {
        return users
    }
    return users.filter(user =>
        user.gender === form.gender.value
    )
}
function preparCardsToRender(users) {
    return users
        .map(({ picture, name, gender, dob, phone, email }) => {
            const card =
                `<div class="userCard">
                    <div class="face face1">
                        <div class="content">
                            <img src="${picture.large}" alt="user photo">
                            <p class="name">${name.first} ${name.last}</p>
                        </div>
                    </div>
                    <div class="face face2">
                        <div class="content">
                            <p class="gender">${gender}</p>
                            <p class="age">Age ${dob.age}</p>
                            <p class="phone">Tel.:${phone}</p>
                            <p class="email">${email}</p>
                        </div>
                    </div>
                </div>`
            return card
        })
        .join('')
}
function renderCards(cards) {
    cardsField.innerHTML = cards
}
function searchFormSwitch(event) {
    event.stopPropagation()
    burgerMenu.classList.toggle('burgerBtn-active')
    formWrapper.classList.toggle('searchFormWrapper-action')
}
function createPaginationList(users, currentPage) {
    numberOfPages = users.length / numberUsersOnPage
    const listOfPages = []
    for (let i = 0; i < numberOfPages; i++) {
        listOfPages.push(i + 1)
    }
    const currentListOfPages = listOfPages.map((page) =>
        `<li class="listItem ${parseInt(page) === parseInt(currentPage) ? "currentPage" : ""}">
        <a class="listItemA" data-id="${page}">${page}</a></li>`)
    if (currentPage === 1) {
        paginationList.innerHTML = currentListOfPages
            .slice(currentPage - 1, currentPage + 7).join('')
    }
    if (currentPage === 2) {
        paginationList.innerHTML = currentListOfPages
            .slice(currentPage - 2, currentPage + 6).join('')
    }
    if (currentPage === 3) {
        paginationList.innerHTML = currentListOfPages
            .slice(currentPage - 3, currentPage + 5).join('')
    }
    if (currentPage === 4) {
        paginationList.innerHTML = currentListOfPages
            .slice(currentPage - 4, currentPage + 4).join('')
    }
    if (currentPage > 4) {
        paginationList.innerHTML = `${currentListOfPages
            .slice(0, 1)}<span>...</span>${currentListOfPages
                .slice(currentPage - 3, currentPage + 3).join('')}`
    }
}
function getUsersForCurrentPage(users, currentPage) {
    return users
        .slice(numberUsersOnPage * (currentPage - 1), numberUsersOnPage * currentPage)
}
function handleChangePage({ target }) {
    if (target.closest('.listItemA')) {
        currentPage = parseInt(target.dataset.id)
        renderPageContent(currentPage)
    }
}
