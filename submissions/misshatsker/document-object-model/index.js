const animals = [
    {
        title: "Cats",
        media: "./media/cat.jpg",
        description: "Domestic cats are natural hunters able to stalk prey and pounce with sharp claws and teeth. They are particularly effective at night, when their light-reflecting eyes allow them to see better than much of their prey. Cats also enjoy acute hearing. All cats are nimble and agile, and their long tails aid their outstanding balance.",
        lifespan: "Up to 18 years",
        diet: "Carnivore",
        size: "28 inches",
        weight: "5 to 20 pounds"
    },
    {
        title: "Dogs",
        media: "./media/dogs.jpg",
        description: "Because the domestic dog’s sense of smell is between 10,000 and 100,000 better than our own, canines can assist law enforcement. Dogs trained to warn of hidden explosives and enemies serve as allies in military operations. Similarly, dogs can sniff out early signs disease. They guide deaf and blind people, and they help people with autism and post-traumatic stress disorder manage with anxiety.",
        lifespan: "12 years",
        diet: "Omnivore",
        size: "Five to 35 inches at the shoulder",
        weight: "Three to 250 pounds"
    },
    {
        title: "Didelphis",
        media: "./media/didelphis.jpg",
        description: "These animals are most famous for “playing possum.” When threatened by dogs, foxes, or bobcats, opossums sometimes flop onto their sides and lie on the ground with their eyes closed or staring fixedly into space. They extend their tongues and generally appear to be dead. This ploy may put a predator off its guard and allow the opossum an opportunity to make its escape.",
        lifespan: "Up to 15 years",
        diet: "Omnivore",
        size: "24 to 26 inches",
        weight: "8.8 to 13.2 pounds"
    },
    {
        title: "Fishes",
        media: "./media/fishes.jpg",
        description: "Contrary to popular belief, fish do have great memories. Some species of fish can recognize and remember humans that give them food rewards. Fish will avoid situations they know to cause them pain, and will seek out experiences with rewards.",
        lifespan: "Up to 20 years",
        diet: "Balanced diet",
        size: "1/2 to 2 inches",
        weight: "About 8 ounces"
    },
    {
        title: "Ants",
        media: "./media/ant.jpg",
        description: "Ants first rose during the Cretaceous period around 130 million years ago! They have survived the Cretaceous-Tertiary (K/T extinction) that killed the dinosaurs as well as the ice age. They have the ability to carry between 10 and 50 times their own body weight! The amount an ant can carry depends on the species. This amazing strength is a result of their small size. ",
        lifespan: "Up to 30 years",
        diet: "Omnivore",
        size: "0.030 to 2.0 inches",
        weight: "1 to 5 mg"
    }
];

const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const media = document.querySelector('.media-animal');
const documentMainInfo = document.querySelector('.animal-main-info');

const title = documentMainInfo.querySelector('.animal-category-title');
const description = documentMainInfo.querySelector('.animal-category-description');
const lifespan = documentMainInfo.querySelector('.property-description-lifespan');
const diet = documentMainInfo.querySelector('.property-description-diet');
const size = documentMainInfo.querySelector('.property-description-size');
const weight = documentMainInfo.querySelector('.property-description-weight');

function changeMainPageInfo(animal) {
    title.textContent = animal.title;
    media.src = animal.media;
    description.textContent = animal.description;
    lifespan.textContent = animal.lifespan;
    diet.textContent = animal.diet;
    size.textContent = animal.size;
    weight.textContent = animal.weight;
}

changeMainPageInfo(animals[0]);
appendMenuItems();

menuIcon.onclick = () => {
    if (getIsMenuOpened()) {
        closeMenu();
    } else {
        openMenu();
    }
}

function getIsMenuOpened() {
    return menuIcon.classList.contains('opened');
}

function openMenu() {
    menuIcon.classList.add('opened');
}

function closeMenu() {
    menuIcon.classList.remove('opened');
}

function appendMenuItems() {
    let previousLiEl = null;

    for (let i = 0; i < animals.length; i++) {
        const animal = animals[i];
        const animalTitle = animal.title;

        let liEl = document.createElement('li');
        liEl.className = "menu-item";
        if (i === 0) {
            liEl.classList.add("active-menu-item");
            previousLiEl = liEl;
        }

        liEl.innerHTML = `<a class="link" href="#${animalTitle}">${animalTitle}</a>`;
        liEl.dataset.index = i;
        menu.append(liEl);
    }

    menu.onclick = (event) => {
        const liEl = event.target.parentElement;
        if (liEl === previousLiEl) {
            return;
        }

        const index = liEl.dataset.index;

        if (getIsMenuOpened()) {
            closeMenu();
        }

        if (previousLiEl) {
            previousLiEl.classList.remove("active-menu-item");
        }

        changeMainPageInfo(animals[index]);
        liEl.classList.add("active-menu-item");

        previousLiEl = liEl;
    }
}
