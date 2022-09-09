const NAV_BAR_ITEMS = DATA.map(item => {
    return {
        title: item.title,
        id: item.id
    }
});

function findHeaderLinkOrNavLink(clickedElement) {
    let res = { navLink: undefined, headerLink: undefined };
    let current = clickedElement;
    while (current) {
        const { className } = current;
        if (className) {
            if (className.includes('nav__link')) {
                res = {
                    navLink: current
                }
                break;
            }
            else if (className.includes('header__link')) {
                res = {
                    headerLink: current
                }
                break;
            }
            else if (className.includes('container')) {
                break;
            }
        }
        current = current.parentNode;
    }
    return res;
}

function handleContainerClick({ target }) {
    const navEl = document.querySelector('#nav');
    const { navLink, headerLink } = findHeaderLinkOrNavLink(target);

    if (navLink) {
        if (activeElId !== navLink.id) {
            if (activeElId) {
                document.querySelector('#' + activeElId).classList.remove('active');
            };
            activeElId = navLink.id;;
            navLink.classList.add('active')
            const currentArticleData = DATA.find(article => article.id === navLink.id);
            navClick(navLink, currentArticleData);
        };
        navEl.classList.remove('nav__full');
    } else if (headerLink) {
        navEl.classList.add('nav__full');
    };
};

let activeElId;
function createNavList(obj) {
    const { items: DATA,
        parentEl,
        defaultId } = obj;
    activeElId = defaultId;

    findHeaderLinkOrNavLink()

    const navElements = DATA.map((item) =>
        `<li class="nav__item">
            <a id="${item.id}" href="#" class="nav__link ${defaultId === item.id ? 'active' : ''}">
                <span class="nav__text">${item.title}</span> 
            </a>
        </li>`
    );
    const html = `
        <header class="header">
            <a class="header__link" alt=""><img src="img/logo.png" alt="" class="img__btn"></a>
            <h1 class="header__title">The Houses of Hogwarts</h1>
        </header>
        <nav id="nav" class="nav"><ul class="nav__list">${navElements.join('')}</ul></nav>
                `;

    const container = document.createElement("div");
    container.className = 'container';
    container.innerHTML = html;
    container.addEventListener("click", handleContainerClick)
    parentEl.appendChild(container);
};

function navClick(current) {
    showArticle(current.id);
}

function showArticle(id) {
    const currentArticleData = DATA.find(article => article.id === id);
    const mainEl = document.querySelector('#main');
    const mainHtml = `
        <article class="main__article">
                <h2 class="main__header">${currentArticleData.title}</h2>
                <img class="main__img" src="${currentArticleData.img}" alt="">
                <p class="main-description">${currentArticleData.desc}</p>
                <blockquote class="main__quote" cite="https://www.onlinereadfreebooks.com/en/Harry-Potter-and-the-Philosophers-Stone/1">
                <p>${currentArticleData.quote}</p>
                </blockquote>
                <figcaption class="main__author">—${currentArticleData.author}, <cite>${currentArticleData.cite}</cite></figcaption>
        </article>
        `;
    mainEl.innerHTML = mainHtml;
}

const defaultId = NAV_BAR_ITEMS[0].id;
createNavList({
    items: NAV_BAR_ITEMS,
    parentEl: document.getElementById('navDivContainer'),
    defaultId,
});
showArticle(defaultId)
