
const PAGINATION_EL = document.querySelector('#main__pagination');

let CURRENT_PAGE = 1;
let ITEMS_ON_PAGE = 12;
let ON_PAGING_CHANGE = () => { };
function filterByPagination({ items, itemsPerPage, page }) {
    let start = itemsPerPage * (page - 1);
    let end = start + itemsPerPage;
    return items.slice(start, end);
};

const MAIN_PAGINATION_EL = document.querySelector('#main__pagination');
function renderPagination({ total, itemsPerPage }) {
    MAIN_PAGINATION_EL.innerHTML = '';
    let pageCount = Math.ceil(total / itemsPerPage)
    for (let i = 1; i < pageCount + 1; i++) {
        let btn = createButton({ page: i });
        MAIN_PAGINATION_EL.appendChild(btn)
    };
};

function createButton({ page }) {
    let button = document.createElement('button');
    button.classList.add('pagination__btn')
    button.setAttribute("data-page", page)
    button.innerText = page;
    if (CURRENT_PAGE == page) {
        button.classList.add('active');
    };
    return button;
};

function setPage(page) {
    CURRENT_PAGE = page;
}
function initPagination({ onPageChange }) {
    ON_PAGING_CHANGE = onPageChange;

    MAIN_PAGINATION_EL.addEventListener('click', ({ target }) => {
        const button = target.closest("button");
        if (button) {
            CURRENT_PAGE = button.dataset.page
            let currentPage = document.querySelector('.pagination__btn.active');
            currentPage.classList.remove('active');
            button.classList.add('active');
            ON_PAGING_CHANGE({ page: CURRENT_PAGE });
        }
    })
}
