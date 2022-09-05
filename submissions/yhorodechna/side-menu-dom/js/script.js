const NAV_BAR_ITEMS = DATA.map(item => {
    return {
        title: item.title,
        id: item.id
    }
});

function createNavList(obj) {
    let activeElId;
    const { items: DATA,
        parentEl,
        defaultId,
        navClick } = obj;
    activeElId = defaultId;

    function findHeaderLinkOrNavLink(clickedElement) {
        // just for info what this methods returns.
        let res = { navLink: undefined, headerLink: undefined };
        let current = clickedElement;
        console.log(current)
        while (current) {
            const { className } = current;
            if (className) {
                // example of navLink html - if user clicks on child (nav_text) then continue searching (get parent element until find nav_text)
                // <a id="${item.id}" href="#" class="nav__link ${defaultId === item.id ? 'active' : ''}">
                //     <span class="nav__text">${item.title}</span> 
                // </a>
                if (className.includes('nav__link')) {
                    res = {
                        navLink: current
                    }
                    break;
                }
                // example of headerLink html - if user clicks on child (image for example) then continue searching (get parent element)
                //<a class="header__link" alt=""><img src="img/logo.png" alt="" class="img__btn"></a>
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
        const navEl = container.querySelector('#nav');
        const { navLink, headerLink } = findHeaderLinkOrNavLink(target);

        if (navLink) {
            if (activeElId !== navLink.id) {
                if (activeElId) {
                    container.querySelector('#' + activeElId).classList.remove('active');
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
    navClick
});
showArticle(defaultId)




