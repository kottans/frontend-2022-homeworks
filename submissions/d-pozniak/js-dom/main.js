"use strict";

const Plants = [
    {
        id: "1",
        commonName: "Ficus",
        botanicalName: "Ficus Benjamina",
        img: "img/ficus.png",
        description:
            "This Ficus is the most common indoor shrub. It is appreciated for its aesthetic appeal but also for its highly adaptive survival traits that let it thrive in the most varied settings of our homes, apartments and offices. The term Ficus means fig and there are over 800 different species that have evolved into different shapes. Some of them remain small shrubs, some of them turn into huge trees. Still others grow to something similar to vines!",
    },
    {
        id: "2",
        commonName: "Aloe",
        botanicalName: "Aloe Vera",
        img: "img/aloe.png",
        description:
            "Aloe vera is a very ornamental indoor plant, easy to care for and not demanding at any time during the year. Its leaves are original and elegant, and it is also used for its medicinal properties, especially in the field of cosmetics. Aloe vera requires a good deal of light but doesn’t appreciate direct sunlight which tends to dehydrate the plant. Try to place it near a window that gets plenty of light, but avoid having the sun’s rays hit it directly.",
    },
    {
        id: "3",
        commonName: "Cushion Cactus",
        botanicalName: "Mammillaria spp",
        img: "img/cactus.png",
        description:
            "In general, Mammillarias are easy indoor plants to grow because they don’t require much care. Only water your mammillaria during the summer, once every 10 days at most, and make sure the bottom of the pot never wallows in water. In fall, water even less, and stop watering entirely during the whole winter season: this is the normal dormant season for this little cactus. Watering can resume incrementally in the following spring.",
    },
    {
        id: "4",
        commonName: "Cherry Tomato",
        botanicalName: "Lycopersicon Esculentum",
        img: "img/cherry-tomato.png",
        description:
            "Easy to grow and only requiring minimal care, tomatoes are one of the most commonly grown vegetables in the world. In the vegetable patch or in the garden, but also on a balcony or a terrace, this plant has the added advantage of being very decorative",
    },
    {
        id: "5",
        commonName: "Ivy",
        botanicalName: "Hedera Helix",
        img: "img/ivy.png",
        description:
            "The main appeal of ivy is in its reliable, hardy evergreen leafage. It’s a favorite to create a deep green backdrop against which other colorful plants can stand out. Grow ivy as an addition to an indoor living plant wall. Slow growth and thick leaves will ensure a lot of greenery!",
    },
    {
        id: "6",
        commonName: "Boat Orchid",
        botanicalName: "Cymbidium",
        img: "img/orchid.png",
        description:
            "The growing and caring for a Cymbidium orchid is on par with the easiest of all orchids. Deep into winter is generally when its magnificent blooming is appreciated, with its bunches of bright colorful flowers. This is an easy plant to care for and it will decorate your home for months on end. Cymbidium orchid cherishes moisture, and needs to be watered often but without forgetting that the root area must stay clear of water or the roots will rot.",
    },
];

const Intro = {
    heading: "Choose a plant that best suits you!",
    description:
        "Indoor plants are perfect items to welcome at home. They can purify the air, create a cozy atmosphere and help you relax after a long working day. Learn more about each popular plant, navigating through our menu. Don`t miss a chance to get a new source of greenery.",
};

function createTempEl(tag, classNames, textCont) {
    const tempElem = document.createElement(tag);
    for (const elem of classNames) {
        tempElem.classList.add(elem);
    }
    tempElem.textContent = textCont;
    return tempElem;
}

function createTempImg(classNames, path, alt) {
    const tempImg = createTempEl("img", classNames);
    tempImg.setAttribute("src", path);
    tempImg.setAttribute("alt", alt);
    return tempImg;
}

function createListItems() {
    const itemNames = Plants.map((element) => element.commonName);
    const navList = document.querySelector(".nav-list");
    for (let i = 1; i <= itemNames.length; i++) {
        const tempItem = createTempEl("li", ["nav-list--item"], itemNames[i - 1]);
        tempItem.id = "plant" + i;
        navList.insertAdjacentElement("beforeend", tempItem);
    }
}

function getElementsToModify() {
    return [
        document.querySelector(".content-title"),
        document.querySelector(".content-description"),
    ];
}

function showIntroContent() {
    const [heading, description] = getElementsToModify();
    const tempHeading = createTempEl("h2", ["content-heading"], Intro.heading);
    const tempDescr = createTempEl("p", ["content-text"], Intro.description);
    heading.appendChild(tempHeading);
    description.appendChild(tempDescr);
}

function showPlantInfo(e) {
    if (e.target !== e.currentTarget) {
        const plantToShow = Plants.filter(
            (plant) => plant.id === e.target.id[e.target.id.length - 1]
        )[0];
        const [heading, description] = getElementsToModify();
        const tempHeading = createTempEl(
            "h2",
            ["content-heading", "plant"],
            plantToShow.commonName
        );
        const tempLatin = createTempEl(
            "h3",
            ["content-subheading"],
            plantToShow.botanicalName
        );
        const tempImg = createTempImg(
            ["plant-img"],
            plantToShow.img,
            plantToShow.commonName
        );
        const tempDescr = createTempEl(
            "p",
            ["content-text"],
            plantToShow.description
        );
        heading.replaceChildren(tempHeading, tempLatin);
        description.replaceChildren(tempImg, tempDescr);
    }
    if (window.matchMedia("max-width: 720px"))
        document.querySelector(".side-menu").classList.remove("active");
}

let clickedId;

function makeFocused(e) {
    if (e.target !== e.currentTarget) {
        if (clickedId && e.target.id !== clickedId) {
            document.getElementById(clickedId).classList.remove("focused");
        }
        clickedId = e.target.id;
        e.target.classList.add("focused");
    }
}

function addBurgerMenu() {
    document.querySelector(".side-menu").classList.add("active");
}

function main() {
    createListItems();
    showIntroContent();

    const plants = document.querySelector(".nav-list");
    plants.addEventListener("click", (elem) => {
        showPlantInfo(elem);
    });
    plants.addEventListener("click", (elem) => {
        makeFocused(elem);
    });

    const burgerButton = document.querySelector(".burger-menu");
    burgerButton.addEventListener("click", addBurgerMenu);
}

document.addEventListener("DOMContentLoaded", main);
