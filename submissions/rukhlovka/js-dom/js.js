let data = [
    {
        id: 'ukrainians',
        title: 'Ukrainians',
        text: 'Ukrainians, details',
        img: 'https://rukhlovka.github.io/study/js-dom/img/ukrainians.png'
    },
    {
        id: 'fox',
        title: 'Fox cosmonaut',
        text: 'portrait of a fox cosmonaut, space sky with stars on the background, highly detailed, digital painting, modern style',
        img: 'https://rukhlovka.github.io/study/js-dom/img/fox-cosmonaut.png'
    },
    {
        id: 'cow',
        title: 'Cow cosmonaut',
        text: 'portrait of a cow cosmonaut, space sky with stars on the background, highly detailed, digital painting',
        img: 'https://rukhlovka.github.io/study/js-dom/img/cow-cosmonaut.png'
    },
    {
        id: 'cyberpunk',
        title: 'Cyberpunk',
        text: 'cyberpunk style, man\'s portrait',
        img: 'https://rukhlovka.github.io/study/js-dom/img/cyberpunk.png'
    },
    {
        id: 'apocalypse',
        title: 'Apocalypse',
        text: ' The city after the apocalypse',
        img: 'https://rukhlovka.github.io/study/js-dom/img/apocalypse.png'
    }
]

function takeData({ target }) {

    let thisUrl, thisTitle, thisText;

    data.forEach((item) => {
        if (item.id === target.getAttribute('id')) {
            thisUrl = item.img;
            thisTitle = item.title;
            thisText = item.text;
        }
    })

    document.querySelector(".main-img-this")
        .setAttribute('src', thisUrl);

    document.querySelector(".main-img-this")
        .setAttribute('alt', thisTitle);

    document.querySelector(".main-text-span")
        .innerHTML = thisText;

    document.querySelector(".main-title")
        .innerHTML = thisTitle;
    document.querySelector(".hidden")
        .setAttribute('class', 'keywords');
};

function more(event) {

    if (document.querySelector(".menu-ul").getAttribute('class') == 'menu-ul') {
        document.querySelector(".menu-ul")
            .setAttribute('class', 'menu-ul open');
    } else {
        document.querySelector(".menu-ul")
            .setAttribute('class', 'menu-ul');
    };
};

document.querySelector('.menu-ul')
    .addEventListener("click", takeData);

document.querySelector('.more')
    .addEventListener("click", more);
