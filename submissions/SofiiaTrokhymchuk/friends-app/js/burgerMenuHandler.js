export function hamburgerMenuClickHandler(){
    const mainContainer = document.querySelector('.main');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const inputContainer =  document.getElementById('inputContainer');
    let menuIsOpened = false;
    hamburgerMenu.addEventListener('click', () => {
        toggleHamburgerMenuClasses();
    })
    mainContainer.addEventListener('click', (event) => {
        if(menuIsOpened && !event.target.closest('.input-container') && !event.target.closest('.hamburger-menu')){
            toggleHamburgerMenuClasses();
        }
    })

    function toggleHamburgerMenuClasses(){
        menuIsOpened = !menuIsOpened;
        inputContainer.classList.toggle('opened');
        hamburgerMenu.classList.toggle('active');
    }
}
