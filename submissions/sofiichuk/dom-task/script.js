const mainContent = document.querySelector(".mainContent");

const sideMenu = document.querySelector('.sideMenu');

sideMenu.addEventListener('click', function (event) {
    mainContent.style.backgroundColor = event.target.id;
    document.querySelector(".text").innerText = event.target.id;
});
