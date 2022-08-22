let data = [
    {
        name: 'Concat',
        image: 'img/concat.jpg',
        description: [
            `<p>Метод concat создаёт новый массив, состоящий
            из элементов в объекте, на котором он был вызван, 
            за которыми по порядку следуют, для каждого аргумента, 
            все его элементы (если аргумент является массивом), 
            либо сам аргумент (если он массивом не является).</p>
            <p>Метод concat не изменяет данный массив</p>
            `
        ]
    },
    {
        name: 'CopyWithin',
        image: 'img/copywithin.jpg',
        description: [
            `<p>Метод copyWithin() копирует последовательность
            элементов массива внутри него в позицию, начинающуюся 
            по индексу target.</p>
        `]
    },
    {
        name: 'Every',
        image: 'img/every.jpg',
        description: [
            `<p>Метод every() проверяет, удовлетворяют ли все элементы
            массива условию, заданному в передаваемой функции.
            </p>
            `
        ]
    },
    {
        name: 'Fill',
        image: 'img/fill.jpg',
        description: [
            `<p>Метод fill() заполняет все элементы массива от начального
            до конечного индексов одним значением.</p>
            `
        ]
    },
    {
        name: 'Filter',
        image: 'img/filter.jpg',
        description: [
            `<p>Метод filter() создаёт новый массив со всеми элементами, 
            прошедшими проверку, задаваемую в передаваемой функции.</p>
            `
        ]
    },
    {
        name: 'Find',
        image: 'img/find.jpg',
        description: [
            `<p>Метод find() возвращает значение первого найденного
            в массиве элемента, которое удовлетворяет условию переданному 
            в callback функции. В противном случае возвращается undefined.</p>
            `
        ]
    },
    {
        name: 'Findindex',
        image: 'img/findindex.jpg',
        description: [
            `<p>Метод findIndex() возвращает индекс в массиве, 
            если элемент удовлетворяет условию проверяющей 
            функции. В противном случае возвращается -1.</p>
            `
        ]
    },
    {
        name: 'forEach',
        image: 'img/foreach.jpg',
        description: [
            `<p>Метод forEach() выполняет указанную функцию
             один раз для каждого элемента в массиве.</p>
            `
        ]
    },
    {
        name: 'Includes',
        image: 'img/includes.jpg',
        description: [
            `<p>Метод includes() определяет, содержит
            ли массив определённый элемент, возвращая в 
            зависимости от этого true или false.</p>
            `
        ]
    },
    {
        name: 'Join',
        image: 'img/join.jpg',
        description: [
            `<p>Метод join() объединяет все элементы 
            массива (или массивоподобного объекта) в строку.</p>
            `
        ]
    },
    {
        name: 'Map',
        image: 'img/map.jpg',
        description: [
            `<p>Метод map() создаёт новый массив с результатом 
            вызова указанной функции для каждого элемента массива.</p>
            <p>Метод map() не изменяет данный массив, создает копию</p>
            `
        ]
    },
    {
        name: 'Push',
        image: 'img/push.jpg',
        description: [
            `<p>Метод push() добавляет один или более элементов 
            в конец массива и возвращает новую длину массива.</p>
            `
        ]
    },
    {
        name: 'Reverse',
        image: 'img/reverse.jpg',
        description: [
            `<p>Метод reverse() на месте обращает порядок следования
            элементов массива. Первый элемент массива становится
            последним, а последний — первым.</p>
            `
        ]
    },
    {
        name: 'Slice',
        image: 'img/slice.jpg',
        description: [
            `<p>Метод slice() возвращает новый массив, 
            содержащий копию части исходного массива.</p>
            <p>Метод slice() не изменяет данный массив, создает копию</p>
            `
        ]
    },
    {
        name: 'Some',
        image: 'img/some.jpg',
        description: [
            `<p>Метод some() проверяет, удовлетворяет ли 
            какой-либо элемент массива условию, заданному 
            в передаваемой функции.</p>
            `
        ]
    }
];

let main = document.querySelector('.main');
let navList = document.querySelector('.nav__list');
let content = document.querySelector('.content');

document.addEventListener('load', nav());

function nav() {
    data.forEach((item) =>{
        navList.innerHTML += `<li class='nav__item'>${item.name}</li>`;
    });
    main.prepend(navList);
}

navList.onclick = function(event){
    let btns= document.querySelectorAll('.nav__item');
    data.forEach((item) => {
        if (event.target.innerHTML === item.name) { 
            content.innerHTML = `
                <header class="main__header">
                    <h2 class="h2-like">${item.name}</h2>
                </header>
                <article class="main__content">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.description}</p>
                </article>
            `;
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
