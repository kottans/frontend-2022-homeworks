const plant = [
    {
        id: "herb",
        name: "Трави",
        image: ["img/herb/photo_1.jpg",
            "img/herb/photo_2.jpg",
            "img/herb/photo_3.jpg",
            "img/herb/photo_4.jpg"
        ],
        article: "Багаторічні квітучі рослини і трави дозволяють створювати контрастні композиції у ландшафтному дизайні, робити більш цікавими скельні гірки, клумби та ін."
    },
    {
        id: "sedum",
        name: "Седуми",
        image: ["img/sedum/photo_2.jpg",
            "img/sedum/photo_1.jpg",
            "img/sedum/photo_3.jpg",
            "img/sedum/photo_4.jpg"
        ],
        article: "Седум є чудовим медоносом, який приваблює бджіл. Всі види стійкі до посухи та світлолюбиві, проте вони прекрасно ростуть і в невеликому затіненні."
    },
    {
        id: "ivy",
        name: "Плющі",
        image: ["img/ivy/photo_1.jpg",
            "img/ivy/photo_2.jpg",
            "img/ivy/photo_3.jpg",
            "img/ivy/photo_4.jpg"
        ],
        article: "Плющ – вічнозелена ліана із сімейства аралієвих, яка налічує близько 15 видів. В природі плющ зустрічається в тінистих лісах, де він може обплітати дерева своїми довгими пагонами і досягягати висоти понад 10 м."
    },
    {
        id: "spicy",
        name: "Пряні трави",
        image: ["img/spicy/photo_1.jpg",
            "img/spicy/photo_2.jpg",
            "img/spicy/photo_3.jpg",
            "img/spicy/photo_4.jpg"
        ],
        article: "Пряні трави - багаторічні трави з вираженим ароматом - для кулінарії, приготування напоїв та десертів."
    },
    {
        id: "bush",
        name: "Кущі",
        image: ["img/bush/photo_1.jpg",
            "img/bush/photo_2.jpg",
            "img/bush/photo_3.jpg",
            "img/bush/photo_4.jpg"
        ],
        article: "Кущі - декоративні рослини, котрі як правило скидають листя взимку. Багато з них мають високі естетичні якості кори стовбурів, цікаві кольорові відтінки листя, мають гарний цвіт, у деяких є декоративні плоди."
    }
]

const menu = document.querySelector(".menu");
const mainInner = document.querySelector(".content");

function createContent({ name, image, article }) {
    let i = 1;
    const arrayImg = image
    .map((img)=>
     {
        return `<div class="content__foto${i++}"><img src="${img}" alt="Фото ${name} ${i}"></div>`;
     })
    .join('');


    return (
        `<div class="content__title"><h2>${name}</h2></div>
        ${arrayImg}
       <p class="content__text">${article}</p>`
    );
};

const changeContent = function (event) {
    const selectPlant = plant.find((obj) => obj.id === event.target.id);
    mainInner.innerHTML = createContent(selectPlant);
};

menu.addEventListener("click", changeContent);

const [ defaultContent ] =  plant;

mainInner.innerHTML = createContent(defaultContent);
