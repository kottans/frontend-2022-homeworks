let _navEl;
const getNavElement = () => {
    if (!_navEl) {
        _navEl = document.querySelector('#nav');
    };
    return _navEl;
};
let ACTIVE_EL_ID;

function findHeaderLinkOrNavLink(clickedElement) {
    let res;
    let current = clickedElement;
    while (!res && current) {
        const { className } = current;
        if (className) {
            if (className.includes('nav__link')) {
                res = {
                    navLink: current
                }
                continue;
            }
            else if (className.includes('header__link')) {
                res = {
                    headerLink: current
                }
                continue;
            }
        }
        current = current.parentNode;
    }
    return res;
};

function handleContainerClick({ target }) {
    const { navLink, headerLink } = findHeaderLinkOrNavLink(target);

    if (navLink) {
        if (ACTIVE_EL_ID !== navLink.id) {
            if (ACTIVE_EL_ID) {
                document.querySelector('#' + ACTIVE_EL_ID).classList.remove('active');
            };
            ACTIVE_EL_ID = navLink.id;
            navLink.classList.add('active');
            showArticle(navLink);
        };
        getNavElement().classList.remove('nav__full');
    } else if (headerLink) {
        getNavElement().classList.add('nav__full');
    };
};

function createNavList({ items, parentEl, defaultId }) {
    ACTIVE_EL_ID = defaultId;
    findHeaderLinkOrNavLink();

    const navElements = items.map((item) =>
        `<li class="nav__item">
            <a id="${item.id}" href="#" class="nav__link ${defaultId === item.id ? 'active' : ''}">
                <span class="nav__text">${item.title}</span> 
            </a>
        </li>`
    );
    const html = `
        <header class="header">
            <a class="header__link" alt="">
                <img src="img/logo.png" alt="" class="img__btn">
            </a>
            <h1 class="header__title">The Houses of Hogwarts</h1>
        </header>
        <nav id="nav" class="nav">
            <ul class="nav__list">${navElements.join('')}</ul>
        </nav>`;

    const container = document.createElement("div");
    container.className = 'container';
    container.innerHTML = html;
    container.addEventListener("click", handleContainerClick);
    parentEl.appendChild(container);
};

function showArticle({ id }) {
    const currentArticleData = DATA.find(article => article.id === id);
    const mainEl = document.querySelector('#main');
    const mainHtml = `
        <article class="main__article">
            <h2 class="main__header">${currentArticleData.title}</h2>
            <img class="main__img" src="${currentArticleData.img}" alt="">
            <p class="main-description">${currentArticleData.desc}</p>
            <figure>
                <blockquote class="main__quote" cite="https://www.onlinereadfreebooks.com/en/Harry-Potter-and-the-Philosophers-Stone/1">
                    <p>${currentArticleData.quote}</p>
                </blockquote>
                <figcaption class="main__author">—${currentArticleData.author},
                    <cite>${currentArticleData.cite}</cite>
                </figcaption>
            </figure>
        </article>`;
    mainEl.innerHTML = mainHtml;
};

const DEFAULT_ID = DATA[0].id;
createNavList({
    items: DATA,
    parentEl: document.getElementById('navDivContainer'),
    defaultId: DEFAULT_ID,
});
showArticle({ id: DEFAULT_ID });
