const animals = [
    {
        title: "Cats",
        media: "./media/cat.jpg",
        description: "Domestic cats are natural hunters able to stalk prey and pounce with sharp claws and teeth. They are particularly effective at night, when their light-reflecting eyes allow them to see better than much of their prey. Cats also enjoy acute hearing. All cats are nimble and agile, and their long tails aid their outstanding balance.",
        propertyLifespan: "Up to 18 years",
        propertyDiet: "Carnivore",
        propertySize: "28 inches",
        propertyWeight: "5 to 20 pounds"
    },
    {
        title: "Dogs",
        media: "./media/dogs.jpg",
        description: "Because the domestic dog’s sense of smell is between 10,000 and 100,000 better than our own, canines can assist law enforcement. Dogs trained to warn of hidden explosives and enemies serve as allies in military operations. Similarly, dogs can sniff out early signs disease. They guide deaf and blind people, and they help people with autism and post-traumatic stress disorder manage with anxiety.",
        propertyLifespan: "12 years",
        propertyDiet: "Omnivore",
        propertySize: "Five to 35 inches at the shoulder",
        propertyWeight: "Three to 250 pounds"
    },
    {
        title: "Didelphis",
        media: "./media/didelphis.jpg",
        description: "These animals are most famous for “playing possum.” When threatened by dogs, foxes, or bobcats, opossums sometimes flop onto their sides and lie on the ground with their eyes closed or staring fixedly into space. They extend their tongues and generally appear to be dead. This ploy may put a predator off its guard and allow the opossum an opportunity to make its escape.",
        propertyLifespan: "Up to 15 years",
        propertyDiet: "Omnivore",
        propertySize: "24 to 26 inches",
        propertyWeight: "8.8 to 13.2 pounds"
    },
    {
        title: "Fishes",
        media: "./media/fishes.jpg",
        description: "Contrary to popular belief, fish do have great memories. Some species of fish can recognize and remember humans that give them food rewards. Fish will avoid situations they know to cause them pain, and will seek out experiences with rewards.",
        propertyLifespan: "Up to 20 years",
        propertyDiet: "Balanced diet",
        propertySize: "1/2 to 2 inches",
        propertyWeight: "About 8 ounces"
    },
    {
        title: "Ants",
        media: "./media/ant.jpg",
        description: "Ants first rose during the Cretaceous period around 130 million years ago! They have survived the Cretaceous-Tertiary (K/T extinction) that killed the dinosaurs as well as the ice age. They have the ability to carry between 10 and 50 times their own body weight! The amount an ant can carry depends on the species. This amazing strength is a result of their small size. ",
        propertyLifespan: "Up to 30 years",
        propertyDiet: "Omnivore",
        propertySize: "0.030 to 2.0 inches",
        propertyWeight: "1 to 5 mg"
    }
];

const title = document.getElementsByClassName("animal-category-title")[0];
const media = document.getElementsByClassName("media-animal")[0];
const description = document.getElementsByClassName("animal-category-description")[0];
const propertyLifespan = document.getElementsByClassName("property-description-lifespan")[0];
const propertyDiet = document.getElementsByClassName("property-description-diet")[0];
const propertySize = document.getElementsByClassName("property-description-size")[0];
const propertyWeight = document.getElementsByClassName("property-description-weight")[0];
const ul = document.getElementsByClassName("menu")[0];

function changeMainPageInfo(animal) {
    title.textContent = animal.title;
    media.src = animal.media;
    description.textContent = animal.description;
    propertyLifespan.textContent = animal.propertyLifespan;
    propertyDiet.textContent = animal.propertyDiet;
    propertySize.textContent = animal.propertySize;
    propertyWeight.textContent = animal.propertyWeight;
}

changeMainPageInfo(animals[0]);

let activeLi = null;
for (let i = 0; i < animals.length; i++) {
    const animal = animals[i];
    const animalTitle = animal.title;

    let li = document.createElement('li');
    li.className = "menu-item";
    if (i === 0) {
        li.className = "menu-item active-menu-item";
        activeLi = li;
    }

    li.innerHTML = '<a class="link" href="#'+ animalTitle + '">' + animalTitle + '</a>';

    li.onclick = () => {
        if (activeLi) {
            activeLi.className = "menu-item";
        }

        changeMainPageInfo(animal);
        li.className = "menu-item active-menu-item";
        activeLi = li;
    };

    ul.append(li);
}
