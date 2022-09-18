const amanita = [
    {
        id: "red",
        img: "img/mushroom1.jpg"
    },
    {
        id: "yellow",
        img: "img/mushroom2.jpg"
    },
    {
        id: "white",
        img: "img/mushroom3.jpg"
    }

];




const nav = document.querySelector('.nav_list');
const mainImg = document.querySelector('.img');


nav.onclick = function ({ target }) {
    if (target.classList.contains('nav_button')) {
        const mainPhoto = amanita.find(({ id }) => id === target.dataset.color);
        changePhoto(mainPhoto);
    };
};

const changePhoto = (color) => {
    const {img} = color
    mainImg.innerHTML = `<img class="photo" src="${img}" alt="">`;
};

