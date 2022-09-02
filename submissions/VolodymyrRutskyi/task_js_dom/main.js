const dataList = [
    {
        name: 'Concat',
        image: 'img/concat.jpg',
        description: [
            `Метод concat создаёт новый массив, состоящий
            из элементов в объекте, на котором он был вызван, 
            за которыми по порядку следуют, для каждого аргумента, 
            все его элементы (если аргумент является массивом), 
            либо сам аргумент (если он массивом не является).`,
            `Метод concat не изменяет данный массив`
        ]
    },
    {
        name: 'CopyWithin',
        image: 'img/copywithin.jpg',
        description: [
            `Метод copyWithin() копирует последовательность
            элементов массива внутри него в позицию, начинающуюся 
            по индексу target.`
        ]
    },
    {
        name: 'Every',
        image: 'img/every.jpg',
        description: [
            `Метод every() проверяет, удовлетворяют ли все элементы
            массива условию, заданному в передаваемой функции.`
        ]
    },
    {
        name: 'Fill',
        image: 'img/fill.jpg',
        description: [
            `Метод fill() заполняет все элементы массива от начального
            до конечного индексов одним значением.`
        ]
    },
    {
        name: 'Filter',
        image: 'img/filter.jpg',
        description: [
            `Метод filter() создаёт новый массив со всеми элементами, 
            прошедшими проверку, задаваемую в передаваемой функции.`
        ]
    },
    {
        name: 'Find',
        image: 'img/find.jpg',
        description: [
            `Метод find() возвращает значение первого найденного
            в массиве элемента, которое удовлетворяет условию переданному 
            в callback функции. В противном случае возвращается undefined.`
        ]
    },
    {
        name: 'Findindex',
        image: 'img/findindex.jpg',
        description: [
            `Метод findIndex() возвращает индекс в массиве, 
            если элемент удовлетворяет условию проверяющей 
            функции. В противном случае возвращается -1.`
        ]
    },
    {
        name: 'forEach',
        image: 'img/foreach.jpg',
        description: [
            `Метод forEach() выполняет указанную функцию
             один раз для каждого элемента в массиве.`
        ]
    },
    {
        name: 'Includes',
        image: 'img/includes.jpg',
        description: [
            `Метод includes() определяет, содержит
            ли массив определённый элемент, возвращая в 
            зависимости от этого true или false.`
        ]
    },
    {
        name: 'Join',
        image: 'img/join.jpg',
        description: [
            `Метод join() объединяет все элементы 
            массива (или массивоподобного объекта) в строку.`
        ]
    },
    {
        name: 'Map',
        image: 'img/map.jpg',
        description: [
            `Метод map() создаёт новый массив с результатом 
            вызова указанной функции для каждого элемента массива.`,
            `Метод map() не изменяет данный массив, создает копию.`
        ]
    },
    {
        name: 'Push',
        image: 'img/push.jpg',
        description: [
            `Метод push() добавляет один или более элементов 
            в конец массива и возвращает новую длину массива.`
        ]
    },
    {
        name: 'Reverse',
        image: 'img/reverse.jpg',
        description: [
            `Метод reverse() на месте обращает порядок следования
            элементов массива. Первый элемент массива становится
            последним, а последний — первым.`
        ]
    },
    {
        name: 'Slice',
        image: 'img/slice.jpg',
        description: [
            `Метод slice() возвращает новый массив, 
            содержащий копию части исходного массива.`,
            `Метод slice() не изменяет данный массив, создает копию.`
        ]
    },
    {
        name: 'Some',
        image: 'img/some.jpg',
        description: [
            `Метод some() проверяет, удовлетворяет ли 
            какой-либо элемент массива условию, заданному 
            в передаваемой функции.`
        ]
    }
];

const main = document.querySelector('.main');
const navList = document.querySelector('.nav__list');
const content = document.querySelector('.content');

function contentDisplay() {
    const updatedList = dataList.map((item) =>{
        return `<li class='nav__item'>${item.name}</li>`;
    }).join('');
    navList.innerHTML = updatedList;
}

function buildContent(event){
    const btns= document.querySelectorAll('.nav__item');
    dataList.map((item) => {
        if (event.target.innerText === item.name.toUpperCase()) { 
            const contentTemplate = `
                <div class="main__header">
                    <h2 class="h2-like">${item.name}</h2>
                </div>
                <article class="main__content">
                    <img src="${item.image}" alt="${item.name}">
                    ${item.description.map((text) => `<p>${text}</p>`).join('')}
                </article>`;
            content.innerHTML = contentTemplate;   
        } 
    });
    btns.forEach((item) =>{
        if (event.target === item){
            item.classList.add('active');
        } else {
            item.classList.remove('active'); 
        }
    });
    
};

document.addEventListener('DOMContentLoaded', contentDisplay);

navList.addEventListener('click', buildContent);

