let NAV_EL;
let ACTIVE_EL_ID;

function handleHeaderClick() {
    NAV_EL.classList.add('nav__full');
};

function handleNavLinkClick({ target }) {
    const navLink = target.closest('.nav__link');

    if (navLink) {
        if (ACTIVE_EL_ID !== navLink.id) {
            if (ACTIVE_EL_ID) {
                document.querySelector('#' + ACTIVE_EL_ID).classList.remove('active');
            };
            ACTIVE_EL_ID = navLink.id;
            navLink.classList.add('active');
            showArticle(navLink);
        };
        NAV_EL.classList.remove('nav__full');
    }
};

function createNavList({ items, parentEl, defaultId }) {
    ACTIVE_EL_ID = defaultId;

    const navElementsHtml = items.map((item) =>
        `<li class="nav__item">
            <a id="${item.id}" href="#" class="nav__link ${defaultId === item.id ? 'active' : ''}">
                <span class="nav__text">${item.title}</span> 
            </a>
        </li>`
    );
    const headerAndNavHtml = `
        <header class="header">
            <a id="headerLink" class="header__link" alt="">
                <img src="img/logo.png" alt="" class="img__btn">
            </a>
            <h1 class="header__title">The Houses of Hogwarts</h1>
        </header>
        <nav id="nav" class="nav">
            <ul id="navList" class="nav__list">${navElementsHtml.join('')}</ul>
        </nav>`;

    const container = document.createElement("div");
    container.className = 'container';
    container.innerHTML = headerAndNavHtml;
    parentEl.appendChild(container);

    const headerLinkEl = document.querySelector("#headerLink");
    const navListEl = document.querySelector("#navList");
    NAV_EL = document.querySelector('#nav');

    if (headerLinkEl) {
        headerLinkEl.addEventListener("click", handleHeaderClick);
    }
    if (navListEl) {
        navListEl.addEventListener("click", handleNavLinkClick);
    }
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
