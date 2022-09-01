const NAV_BAR_ITEMS = DATA.map(item => {
    return {
        title: item.title,
        id: item.id
    }
});

function createNavList(obj) {
    let activeElId;
    const { items,
        parentEl,
        defaultId,
        navClick } = obj;
    activeElId = defaultId;

    function containerClick(event) {
        const navEl = container.querySelector('#nav');
        let current = event.target;
        while (current) {
            if (current.className && current.className.includes('nav__link')) {
                if (activeElId !== current.id) {
                    if (activeElId) {
                        container.querySelector('#' + activeElId).classList.remove('active')
                    }
                    activeElId = current.id;
                    current.classList.add('active')
                    const item = items.find(item => item.id === current.id);
                    navClick(current, item)
                }
                navEl.classList.remove('nav__full');
                break;
            }
            else if (current.className && current.className.includes('header__link')) {
                navEl.classList.add('nav__full');
                break;
            }
            else if (current.className && current.className.includes('container')) {
                break;
            }
            current = current.parentNode;
        }
    };
    const navElements = items.map((item) =>
        `<li class="nav__item">
            <a id="${item.id}" onclick2="navLinkClick(this,event)" href="#" class="nav__link ${defaultId === item.id ? 'active' : ''}">
                <span class="nav__text">${item.title}</span> 
            </a>
        </li>`
    );
    const html = `
        <header class="header">
            <a class="header__link" onclick2="headerLinkClick()" alt=""><img src="img/logo.png" alt="" class="img__btn"></a>
            <h1 class="header__title">The Houses of Hogwarts</h1>
        </header>
        <nav id="nav" class="nav"><ul class="nav__list">${navElements.join('')}</ul></nav>
                `;

    const container = document.createElement("div");
    container.className = 'container';
    container.innerHTML = html;
    container.addEventListener("click", containerClick)
    parentEl.appendChild(container);
};

function navClick(current) {
    showArticle(current.id);
}

function showArticle(id) {
    const item = DATA.find(item => item.id === id);
    const mainEl = document.querySelector('#main');
    const mainHtml = `
        <article class="main__article">
                <h2 class="main__header">${item.title}</h2>
                <img class="main__img" src="${item.img}" alt="">
                <p class="main-description">${item.desc}</p>
                <p class="main__quote">${item.quote} </p>
                <p class="main__author">${item.author}</p>
        </article>
        `;
    mainEl.innerHTML = mainHtml;
}

const defaultId = NAV_BAR_ITEMS[0].id;
createNavList({
    items: NAV_BAR_ITEMS,
    parentEl: document.getElementById('navDivContainer'),
    defaultId,
    navClick
});
showArticle(defaultId)



