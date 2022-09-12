const list = document.querySelector(".menu__list")
const li = document.createElement('li')
const content = document.querySelector(".content")
const h2 = document.querySelector("h2")
const bodyContent = document.querySelector(".content-body")

function home() {
    reset()
    h2.innerText = "Intro"
    bodyContent.innerText = "Skateboarding is more than just cruising around. Skateboarding is a lifestyle. Skateboarding is love. Over the past 60 years Skateboarding went through a kind of evolution."
}

function reset() {
    const menuItems = document.querySelectorAll('.menu__item')
    menuItems.forEach(i => {
        i.classList.remove('active')
    })
}

fetch("db.json").then(response => response.json()).then(dbJson => {
    dbJson.map(menu => list.innerHTML += '<li class="menu__item">' + menu.title + '</li>')

    list.addEventListener('click', e => {
        reset()
        e.target.classList.add('active')
        list.classList.remove('active')

        const contentPage = dbJson.filter(item => e.target.textContent == item.title)
        console.log(contentPage);
        h2.innerText = contentPage[0].title
        bodyContent.innerText = contentPage[0].text
    })
})