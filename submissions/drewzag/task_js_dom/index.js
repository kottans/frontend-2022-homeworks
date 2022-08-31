document.addEventListener('DOMContentLoaded', () => {
  const getData = async () =>
    fetch('/src/data.json')
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error('Something went wrong')
      })
      .catch((error) => {
        console.log(error)
      })

  const list = document.querySelector('.list')
  const main = document.querySelector('.main')
  const h1 = document.querySelector('h1')
  const menuIcon = document.querySelector('div.menu__icon')

  getData().then((res) => {
    res.forEach((el) => {
      const li = document.createElement('li')
      li.classList.add('list__item')
      li.textContent = el.team
      list.appendChild(li)
      li.addEventListener('click', onClickHandlerItem)
    })
  })

  const onClickHandlerItem = (event) => {
    const listItem = document.querySelectorAll('.list__item')
    h1.remove()
    listItem.forEach((el) => el.classList.remove('active'))
    event.target.classList.add('active')
    getData().then((res) => {
      const team = res.find((el) => el.team === event.target.textContent)
      main.innerHTML = `<div class="main__logo">
      <img src=${team.img} alt="" class="logo" />
    </div>
      <p class="main__desc">${team.desc}`
    })
    list.classList.remove('show__list')
  }

  const onShowMenu = () => {
    list.classList.toggle('show__list')
  }

  menuIcon.addEventListener('click', onShowMenu)
})
