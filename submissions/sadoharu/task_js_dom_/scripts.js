window.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.section__page');
    const navList = document.querySelector('.nav-bar__list');

    const navListItem = [{
            title: 'Overview',
            icon: 'icon-browser'
        },
        {
            title: 'About',
            icon: 'icon-about-dot-me'
        },
        {
            title: 'Achievement',
            icon: 'icon-award'
        },
        {
            title: 'Projects',
            icon: 'icon-files-empty'
        },
        {
            title: 'Reviews',
            icon: 'icon-rate_review'
        }
    ];

    navListItem.forEach((item, i) => {
        const liItem = document.createElement('li');
        liItem.classList.add('nav-bar__list_item');
        liItem.tabIndex = 0;
        liItem.setAttribute('data-index', i);
        liItem.innerHTML = `
            <span class="nav-bar__list_icon ${item.icon}"></span>
            <span class="nav-bar__list_title">${item.title}</span>
            `;
        navList.append(liItem);
    });

    const togglePageVisibility = (show = 0) => {
        pages.forEach(item => {
            item.classList.remove("visible");
        });
        pages[show].classList.add("visible");
    };

    togglePageVisibility();

    const togglePage = (e, node) => {
        togglePageVisibility(node.getAttribute('data-index'));
        e.currentTarget.querySelectorAll('.nav-bar__list_item').forEach(item => item.classList.remove('active'));
        node.classList.add('active');
    };

    navList.addEventListener('click', e => {
        if (e.target.getAttribute('data-index')) {
            togglePage(e, e.target);
        } else if (e.target.closest('.nav-bar__list_item').getAttribute('data-index')) {
            togglePage(e, e.target.closest('.nav-bar__list_item'));
        }
    });

    document.addEventListener('keyup', e => {
        if (e.code === 'Space') {
            togglePage(e, e.target);
        }
    });
});