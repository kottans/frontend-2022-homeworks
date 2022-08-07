const fishes = {
    carp: {
        name: "Карп",
        title: "USFWS, Public domain, via Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/File:Common_carp.jpg",
        alt: "Common carp",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Common_carp.jpg/512px-Common_carp.jpg",
        firstSectionText:
            "Крупная всеядная рыба с толстым, умеренно удлинённым телом, покрытым крупной, гладкой, плотно сидящей чешуёй. Бока золотистого цвета, спина темноватая. Населяет тихие, стоячие или медленно текущие воды с твёрдым глинистым, слегка заиленным дном. В низовьях рек, впадающих в Чёрное море, встречается в солоноватых водах.",
        secondSectionText:
            "Рыба очень жирная, по-этому для жарки нужно нарезать мелкими кусками. Имеет сильный сладковатый вкус, по-этому из специй достаточно одной соли по вкусу. При запекании тоже нужно учитывать жирность и добавлять специи, лучше сильно-острые и лимонные.",
    },
    grassCarp: {
        name: "Белый амур",
        title: "Hagerty, Ryan/USFWS, Public domain, via Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/File:Grass_carp_portrait.jpg",
        alt: "Grass carp portrait",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Grass_carp_portrait.jpg/512px-Grass_carp_portrait.jpg",
        firstSectionText:
            "Пресноводная растительноядная рыба. Тело удлинённое, цилиндрической формы, почти не сжатое с боков, покрыто крупной чешуёй. Взрослые особи белого амура питаются преимущественно высшей растительностью.",
        secondSectionText:
            "Отлично подходит для приготовления диетических блюд. При запекании нужно добавлять масло, а при жарке нарезать толстыми стейками, т.к. рыба сама по себе сухая.",
    },
    pike: {
        name: "Щука",
        title: "",
        href: "#",
        alt: "pike on grass",
        src: "./img/pike.jpg",
        firstSectionText:
            "Живёт обычно в прибрежной зоне, в водных зарослях, в непроточных или слабопроточных водах. Тело торпедовидное, голова большая, пасть широкая. Основу питания щуки составляют представители различных видов мелких рыб.",
        secondSectionText:
            "Обычно рыба имеет сильный привкус, который не всем по вкусу. Что избавиться от него лучше запекать или тушить.",
    },
    catfish: {
        name: "Сом",
        title: "",
        href: "#",
        alt: "catfish",
        src: "./img/catfish.jpg",
        firstSectionText:
            "Обитает в реках и озёрах. В передней части тело речного сома имеет округлые формы, а с продвижением к хвосту становится сжатым с обоих боков и переходит в сильный хвост.",
        secondSectionText:
            "Умеренно жирная рыба. Из-за толстой кожи, можно готовить как угодно и на гриле со сгоревшей в уголь кожей тоже норм, т.к. её далеко не все едят.",
    },
    carassius: {
        name: "Карась",
        title: "jag asså, Public domain, via Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/File:Carassius_carassius_1.jpg",
        alt: "Carassius",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Carassius_carassius_1.jpg/512px-Carassius_carassius_1.jpg",
        firstSectionText:
            "Питаются растительностью, мелкими беспозвоночными, зоопланктоном, зообентосом и детритом. Обитают исключительно в болотистых и низменных озёрах и реках. Спинной плавник длинный, глоточные зубы однорядные. Тело высокое с толстой спиной, умеренно сжатое с боков. Чешуя крупная и гладкая на ощупь.",
        secondSectionText:
            "Имеет сильный приятный сладковатый вкус и ооочень много костей. В домашних условия подают обычно жареным с крестообразными надрезами. Также очень вкусный получается запеченый с майонезом, сметаной и зеленью.",
    },
};
const pipe = (...arrayOfFunctions) => {
    if (arrayOfFunctions.length === 0) return undefined;
    else if (arrayOfFunctions.length === 1) return arrayOfFunctions[0]();
    return arrayOfFunctions.reduce((prev, func) => {
        return func(prev);
    }, undefined);
};
const createContainer = () => {
    return document.createElement("div");
};
const addHTML = (container) => {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const section_1 = document.createElement("section");
    const h3_1 = document.createElement("h3");
    const section_2 = document.createElement("section");
    const h3_2 = document.createElement("h3");
    a.appendChild(img);
    section_1.appendChild(h3_1);
    a.appendChild(img);
    section_2.appendChild(h3_2);
    article.appendChild(h2);
    article.appendChild(a);
    article.appendChild(section_1);
    article.appendChild(section_2);
    container.appendChild(article);
    return container;
};
const addClasses = (fishName) => {
    return (container) => {
        container.classList.add(fishName, "content");
        container.querySelector("h2").classList.add("content-heading", "h2");
        container.querySelector("a").classList.add("a");
        container.querySelector("img").classList.add("content-img");
        container.querySelector("article").classList.add("article");
        container
            .querySelectorAll("section")
            .forEach((element) => element.classList.add("section"));
        container
            .querySelectorAll("section > h3")
            .forEach((element) => element.classList.add("content-heading"));
        return container;
    };
};
const addContent = (fishName) => {
    return (container) => {
        container.querySelector(".h2").append(fishes[fishName].name);
        container
            .querySelector(".a")
            .setAttribute("title", fishes[fishName].title);
        container
            .querySelector(".a")
            .setAttribute("href", fishes[fishName].href);
        container
            .querySelector(".content-img")
            .setAttribute("alt", fishes[fishName].alt);
        container
            .querySelector(".content-img")
            .setAttribute("src", fishes[fishName].src);
        container
            .querySelector(".section:first-of-type")
            .append(fishes[fishName].firstSectionText);
        container
            .querySelector(".section:first-of-type > .content-heading")
            .append("Общая информация о рыбе");
        container
            .querySelector(".section:last-of-type")
            .append(fishes[fishName].secondSectionText);
        container
            .querySelector(".section:last-of-type > .content-heading")
            .append("Приготовление");
        return container;
    };
};
const generateContent = (fishNames) => {
    return fishNames.map((fishName) => ({
        fishName,
        content: pipe(
            createContainer,
            addHTML,
            addClasses(fishName),
            addContent(fishName)
        ),
    }));
};
document.body.onload = () => {
    const contentArticles = generateContent([
        "carp",
        "grassCarp",
        "pike",
        "catfish",
        "carassius",
    ]);
    const main = document.querySelector(".main");
    const temporaryFragment = document.createDocumentFragment();
    contentArticles.forEach((article) =>
        temporaryFragment.appendChild(article.content)
    );
    main.appendChild(temporaryFragment);

    const navClickHandle = ({ target }) => {
        if (target.tagName === "INPUT") {
            contentArticles.forEach((fish) =>
                fish.content.classList.remove("visible-content")
            );
            contentArticles
                .find((fish) => fish.fishName === target.id)
                .content.classList.add("visible-content");
        }
    };

    const navMenu = document.querySelector(".nav-menu");
    navMenu.addEventListener("click", navClickHandle);

    const initRadio = document.querySelector(".nav-radio");

    if (initRadio) {
        initRadio.click();
    }
};
