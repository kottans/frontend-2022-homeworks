window.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.section__page');
    const navList = document.querySelector('.nav-bar__list')

    const navListItem = [
        {title: 'Overview', icon: 'icon-browser'},
        {title: 'About', icon: 'icon-about-dot-me'},
        {title: 'Achievement', icon: 'icon-award'},
        {title: 'Projects', icon: 'icon-files-empty'},
        {title: 'Reviews', icon: 'icon-rate_review'}
    ]

    navListItem.forEach((item, i) => {
        const liItem = document.createElement('li');
        liItem.classList.add('nav-bar__list_item');
        liItem.tabIndex = 0;
        liItem.setAttribute('data-index', i)
        liItem.innerHTML = `
            <span class="nav-bar__list_icon ${item.icon}"></span>
            <span class="nav-bar__list_title">${item.title}</span>
            `
        navList.append(liItem)
    })

    const hideShowPage = (show = 0) => {
        pages.forEach(item => {
            item.style.display = "none";
        })
        pages[show].style.display = "block";
    }

    hideShowPage();

    const togglePage = (e, node) => {
        hideShowPage(node);
        e.currentTarget.querySelectorAll('.nav-bar__list_item').forEach(item => item.classList.remove('active'))
        e.target.classList.add('active')
    }

    navList.addEventListener('click', e => {
        if (e.target.getAttribute('data-index')) {
            togglePage(e, e.target.getAttribute('data-index'))
        } else if (e.target.parentNode.getAttribute('data-index')) {
            togglePage(e, e.target.parentNode.getAttribute('data-index'))
        }

    })

      document.addEventListener('keyup', e => {
        if (e.code === 'Space') {
            togglePage(e, e.target.getAttribute('data-index'))
        }
      })
});
