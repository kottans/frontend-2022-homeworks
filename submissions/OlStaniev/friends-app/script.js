const url = 'https://randomuser.me/api/?results=5000&inc=gender,name,email,dob,phone,picture&seed=foobar'

const cardsField = document.querySelector('.contentWrapper')
const formWrapper = document.querySelector('.searchFormWrapper')
const form = document.querySelector('.searchForm')
const searchIput = document.querySelector('#searchName')
const burgerMenu = document.querySelector('.burgerForForm')
const paginationList = document.querySelector('.paginationList')

let users = []
const numberUsersOnPage = 24

document.addEventListener("DOMContentLoaded", loadData)
form.addEventListener('input', () => renderPageContent(1))
form.addEventListener("submit", (e) => e.preventDefault())
burgerMenu.addEventListener('click', searchFormSwitch)
paginationList.addEventListener('click', changePage)


async function loadData() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`http status ${response.status}`)
        }
        const data = await response.json()
        users = data.results
        renderPageContent(1)
    }
    catch (e) {
        console.error(`FRIENDS ERROR: ${e}`)
        let secondsToReload = 5
        setInterval(() => {
            cardsField.innerHTML =
                `<div class="error">
                <p>Somthing went wrong</p>
                <p>The page will reload in ${secondsToReload} sec</p>
            </div>`
            if (--secondsToReload === -1) { location.reload() }
        }, 1000)
    }
}
function renderPageContent(currentPage) {
    const usersForRender = prepairUsersForRender()
    createPaginationList(usersForRender, currentPage)
    renderCards(preparCardsToRender(getUsersForCurrentPage(usersForRender, currentPage)))
}
function prepairUsersForRender() {
    const searchedByName = searchByName(users)
    const sortedByAge = sortingUsersByAge(searchedByName)
    const sortedByAlphabet = sortingUsersByAlphabet(sortedByAge)
    const filteredByGender = filterByGender(sortedByAlphabet)
    return filteredByGender
}
function searchByName(users) {
    if (form.searchName.value) {
        return users.filter(user =>
            (user.name.first + ' ' + user.name.last).toLowerCase()
                .includes(form.searchName.value.toLowerCase()))
    }
    return users
}
function sortingUsersByAge(users) {
    if (form.sort.value === 'ageUp') {
        return users.sort((userA, userB) =>
            userA.dob.age < userB.dob.age ? -1 : 1)
    }
    if (form.sort.value === 'ageDown') {
        return users.sort((userA, userB) =>
            userA.dob.age < userB.dob.age ? 1 : -1)
    }
    return users
}
function sortingUsersByAlphabet(users) {
    if (form.sort.value === 'az') {
        return users.sort((userA, userB) =>
            userA.name.first < userB.name.first ? -1 : 1)
    } if (form.sort.value === 'za') {
        return users.sort((userA, userB) =>
            userA.name.first > userB.name.first ? 1 : -1)
    }
    return users
}
function filterByGender(users) {
    return users.filter(user =>
        user.gender === form.gender.value || form.gender.value === 'all'
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
function searchFormSwitch() {
    formWrapper.style.display = burgerMenu.burgerInput.checked ? 'block' : 'none'
}
function createPaginationList(users, currentPage) {
    numberOfPages = users.length / numberUsersOnPage
    const listOfPages = []
    for (let i = 0; i < numberOfPages; i++) {
        listOfPages.push(i + 1)
    }
    const currentListOfPages = listOfPages.map((page) =>
        `<li class="listItem ${parseInt(page) === parseInt(currentPage) ? "currentPage" : ""}">
        <a class="listItemA">${page}</a></li>`)
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
    if (currentPage > 3) {
        paginationList.innerHTML = `${currentListOfPages
            .slice(0, 1)}<span>...</span>${currentListOfPages
                .slice(currentPage - 3, currentPage + 5).join('')}`
    }
}
function getUsersForCurrentPage(users, currentPage) {
    return users
        .slice(numberUsersOnPage * (currentPage - 1), numberUsersOnPage * currentPage)
}
function changePage({ target }) {
    if (target.closest('.listItemA')) {
        currentPage = parseInt(target.innerHTML)
        renderPageContent(currentPage)
    }
}
