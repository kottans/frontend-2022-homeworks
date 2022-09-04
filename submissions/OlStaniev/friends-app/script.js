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
form.addEventListener('input', handleFormChange)
form.addEventListener("submit", (e) => e.preventDefault())
burgerMenu.addEventListener('click', searchFormSwitch)
paginationList.addEventListener('click', changePage)

function loadData() {
    try {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                users = data.results;
                renderCards(preparCardsToRender(pageForRender(users, 1)))
                createPaginationList(users, 1)
            })
    } catch (e) {
        console.log(e)
    }
}
function handleFormChange() {
    const searchedByName = searchByName(users)
    const sortedUsers = sortingUsers(searchedByName)
    const filteredByGender = filterByGender(sortedUsers)
    createPaginationList(filteredByGender, 1)
    renderCards(preparCardsToRender(pageForRender(filteredByGender, 1)))
    return filteredByGender
}
function searchByName(users) {
    if (form.searchName.value) {
        return users.filter(user =>
            (user.name.first + ' ' + user.name.last).toLowerCase()
                .includes(form.searchName.value.toLowerCase()))
    } else {
        return users
    }
}
function sortingUsers(users) {
    if (form.sort.value === 'ageDown') {
        return users.sort((user1, user2) => {
            if (user1.dob.age < user2.dob.age) {
                return -1
            }
            if (user1.dob.age > user2.dob.age) {
                return 1
            }
            return 0
        })
    }
    if (form.sort.value === 'ageUp') {
        return users.sort((user1, user2) => {
            if (user1.dob.age < user2.dob.age) {
                return 1
            }
            if (user1.dob.age > user2.dob.age) {
                return -1
            }
            return 0
        })
    }
    if (form.sort.value === 'az') {
        return users = users.sort((user1, user2) => {
            if (user1.name.last < user2.name.last) {
                return -1
            }
            if (user1.name.last > user2.name.last) {
                return 1
            }
            return 0
        })
    }
    if (form.sort.value === 'za') {
        return users = users.sort((user1, user2) => {
            if (user1.name.last < user2.name.last) {
                return 1
            }
            if (user1.name.last > user2.name.last) {
                return -1
            }
            return 0
        })
    }
    if (!form.sort.value) {
        return users
    }
}
function filterByGender(users) {
    if (form.male.checked && !form.female.checked) {
        return users.filter(user => user.gender === 'male')
    }
    if (form.female.checked && !form.male.checked) {
        return users.filter(user => user.gender === 'female')
    }
    if (form.male.checked && form.female.checked) {
        return users
    }
    if (!form.male.checked && !form.female.checked) {
        return users
    }
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
    if (burgerMenu.burgerInput.checked) {
        formWrapper.style.display = 'block'
    }
    if (!burgerMenu.burgerInput.checked) {
        formWrapper.style.display = 'none'
    }
}
function createPaginationList(users, currentPage) {
    numberOfPages = users.length / numberUsersOnPage
    const listOfPages = []
    for (let i = 0; i < numberOfPages; i++) {
        listOfPages.push(i + 1)
    }
    if (listOfPages.length > 10 && currentPage > 3) {
        paginationList.innerHTML = `
        <li class="listItem">${currentPage - 3}</li>
        <li class="listItem">${currentPage - 2}</li>
        <li class="listItem">${currentPage - 1}</li>
        <li class="listItem">${currentPage}</li>
        <li class="listItem">${currentPage + 1}</li>
        <li class="listItem">${currentPage + 2}</li>
        <li class="listItem">${currentPage + 3}</li>
        <li class="listItem">...</li>
        <li class="listItem">${listOfPages[listOfPages.length - 1]}</li>`
    } else if (listOfPages.length > 10 && currentPage === 1) {
        paginationList.innerHTML = `
        <li class="listItem">${currentPage}</li>
        <li class="listItem">${currentPage + 1}</li>
        <li class="listItem">${currentPage + 2}</li>
        <li class="listItem">${currentPage + 3}</li>
        <li class="listItem">${currentPage + 4}</li>
        <li class="listItem">${currentPage + 5}</li>
        <li class="listItem">${currentPage + 6}</li>
        <li class="listItem">...</li>
        <li class="listItem">${listOfPages[listOfPages.length - 1]}</li>`
    } else if (listOfPages.length > 10 && currentPage === 2) {
        paginationList.innerHTML = `
        <li class="listItem">${currentPage - 1}</li>
        <li class="listItem">${currentPage}</li>
        <li class="listItem">${currentPage + 1}</li>
        <li class="listItem">${currentPage + 2}</li>
        <li class="listItem">${currentPage + 3}</li>
        <li class="listItem">${currentPage + 4}</li>
        <li class="listItem">${currentPage + 5}</li>
        <li class="listItem">...</li>
        <li class="listItem">${listOfPages[listOfPages.length - 1]}</li>`
    } else if (listOfPages.length > 10 && currentPage === 3) {
        paginationList.innerHTML = `
        <li class="listItem">${currentPage - 2}</li>
        <li class="listItem">${currentPage - 1}</li>
        <li class="listItem">${currentPage}</li>
        <li class="listItem">${currentPage + 1}</li>
        <li class="listItem">${currentPage + 2}</li>
        <li class="listItem">${currentPage + 3}</li>
        <li class="listItem">${currentPage + 4}</li>
        <li class="listItem">...</li>
        <li class="listItem">${listOfPages[listOfPages.length - 1]}</li>`
    } else {
        paginationList.innerHTML = listOfPages.map(page =>
            `<li class="listItem">${page}</li>`).join('')
    }
}
function pageForRender(users, currentPage) {
    return users
        .slice(numberUsersOnPage * (currentPage - 1), numberUsersOnPage * currentPage)
}
function changePage({ target }) {
    if (target.closest('.listItem')) {
        currentPage = parseInt(target.innerHTML)
        renderCards(preparCardsToRender(pageForRender(handleFormChange(), currentPage)))
        createPaginationList(handleFormChange(), currentPage)
    }
}
