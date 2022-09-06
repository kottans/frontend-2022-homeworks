const solarSystem = [
    {
        id: "0",
        title: "The Sun",
        text:
            "The sun is by far the largest object in our solar system, containing 99.8% of the solar system's mass. It sheds most of the heat " +
            "and light that makes life possible on Earth and possibly elsewhere. Planets orbit the sun in oval-shaped paths called ellipses, " +
            "with the sun slightly off-center of each ellipse. The Sun exists in the outer part of the Milky Way Galaxy and was formed from " +
            "material that had been processed inside a supernova. The Sun is not, as is often said, a small star. Although it falls midway " +
            "between the biggest and smallest stars of its type, there are so many dwarf stars that the Sun falls in the top 5 percent of " +
            "stars in the neighbourhood that immediately surrounds it.",
        image: "img/pictures/sun.png",
        diameter: "1 392 700",
        mass: "1.9891 * 10<sup>30 </sup>",
        temp: [
            {
                name: "Temperature",
                value: "5507",
            },
        ],
        gravity: "274",
        distance: [
            {
                name: "Distance to Earth",
                value: "150",
                unit: "million km",
            },
        ],
        lengthOfDay: "5 * 10<sup>13 </sup>",
        moons: [],
        altText: "the sun depicted as a large fireball",
    },
    {
        id: "1",
        title: "Mercury",
        text:
            "Mercury, the innermost planet of the solar system and the eighth in size and mass. Its closeness to the Sun and its smallness make " +
            "it the most elusive of the planets visible to the unaided eye. Because its rising or setting is always within about two hours of the Sun's, " +
            "it is never observable when the sky is fully dark. Mercury is designated by the symbol ☿. At first glance the surface of the planet looks " +
            "similar to the cratered terrain of the Moon, an impression reinforced by the roughly comparable size of the two bodies. Mercury is far denser, " +
            "however, having a metallic core that takes up about 61 percent of its volume (compared with 4 percent for the Moon and 16 percent for Earth).",
        image: "img/pictures/mercury.png",
        diameter: "4 879",
        mass: "0.330 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "167",
            },
        ],
        gravity: "3.7",
        distance: [
            {
                name: "Min distance to Earth",
                value: "82",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "217",
                unit: "million km",
            },
        ],
        lengthOfDay: "4222.6",
        moons: [],
        altText: "gray planet mercury with many small craters",
    },
    {
        id: "2",
        title: "Venus",
        text:
            "Venus, second planet from the Sun and sixth in the solar system in size and mass. No planet approaches closer to Earth than Venus; at its " +
            "nearest it is the closest large body to Earth other than the Moon. Because Venus's orbit is nearer the Sun than Earth's, the planet is always " +
            "roughly in the same direction in the sky as the Sun and can be seen only in the hours near sunrise or sunset. When it is visible, it is the most " +
            "brilliant planet in the sky. Venus is designated by the symbol ♀. Venus has been called Earth's twin because of the similarities in their masses, " +
            "sizes, and densities and their similar relative locations in the solar system. Because they presumably formed in the solar nebula from the same kind " +
            "of rocky planetary building blocks, they also likely have similar overall chemical compositions.",
        image: "img/pictures/venus.png",
        diameter: "12 104",
        mass: "4.87 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "464",
            },
        ],
        gravity: "8.9",
        distance: [
            {
                name: "Min distance to Earth",
                value: "38",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "162",
                unit: "million km",
            },
        ],
        lengthOfDay: "2802",
        moons: [],
        altText: "red planet Venus with obvious irregularities in the landscape",
    },
    {
        id: "3",
        title: "Earth",
        text:
            "Earth, third planet from the Sun and the fifth largest planet in the solar system in terms of size and mass. Its single most outstanding feature is " +
            "that its near-surface environments are the only places in the universe known to harbour life. It is designated by the symbol ♁. Earth's name in English, the " +
            "international language of astronomy, derives from Old English and Germanic words for ground and earth, and it is the only name for a planet of the solar system " +
            "that does not come from Greco-Roman mythology. Viewed from another planet in the solar system, Earth would appear bright and bluish in colour. Easiest to see " +
            "through a large telescope would be its atmospheric features, chiefly the swirling white cloud patterns of midlatitude and tropical storms, ranged in roughly " +
            "latitudinal belts around the planet.",
        image: "img/pictures/earth.png",
        diameter: "12 756",
        mass: "5.97 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "15",
            },
        ],
        gravity: "9.8",
        distance: [
            {
                name: "Distance to Earth",
                value: "YOU ARE HERE",
                unit: "",
            },
        ],
        lengthOfDay: "24",
        moons: [
            {
                name: "Number of Moons",
                value: "1",
            },
        ],
        altText: "planet earth with clouds, continents and oceans",
    },
    {
        id: "4",
        title: "Mars",
        text:
            "Mars, fourth planet in the solar system in order of distance from the Sun and seventh in size and mass. It is a periodically conspicuous reddish object in the " +
            "night sky. Sometimes called the Red Planet, Mars has long been associated with warfare and slaughter.  Mars is designated by the symbol ♂. Like Earth, Mars has clouds, " +
            "winds, a roughly 24-hour day, seasonal weather patterns, polar ice caps, volcanoes, canyons, and other familiar features. There are intriguing clues that billions of years " +
            "ago Mars was even more Earth-like than today, with a denser, warmer atmosphere and much more water—rivers, lakes, flood channels, and perhaps oceans.",
        image: "img/pictures/mars.png",
        diameter: "6 792",
        mass: "0.642 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "-65",
            },
        ],
        gravity: "3.7",
        distance: [
            {
                name: "Min distance to Earth",
                value: "56",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "401",
                unit: "million km",
            },
        ],
        lengthOfDay: "24.7",
        moons: [
            {
                name: "Number of Moons",
                value: "2",
            },
        ],
        altText: "red planet mars with obvious irregularities in the landscape",
    },
    {
        id: "5",
        title: "Jupiter",
        text:
            "Jupiter, the most massive planet of the solar system and the fifth in distance from the Sun. It is one of the brightest objects in the night sky; only the Moon, Venus, and " +
            "sometimes Mars are more brilliant. Jupiter is designated by the symbol ♃. Jupiter has an internal heat source; it emits more energy than it receives from the Sun. The pressure in " +
            "its deep interior is so high that the hydrogen there exists in a fluid metallic state. This giant has the strongest magnetic field of any planet, with a magnetosphere so large that, " +
            "if it could be seen from Earth, its apparent diameter would exceed that of the Moon.",
        image: "img/pictures/jupiter.png",
        diameter: "142 984",
        mass: "1898 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "-110",
            },
        ],
        gravity: "23.1",
        distance: [
            {
                name: "Min distance to Earth",
                value: "588",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "967",
                unit: "million km",
            },
        ],
        lengthOfDay: "9.9",
        moons: [
            {
                name: "Number of Moons",
                value: "79",
            },
        ],
        altText: "planet Jupiter with a constant color transition from light brown to brown",
    },
    {
        id: "6",
        title: "Saturn",
        text:
            "Saturn, second largest planet of the solar system in mass and size and the sixth nearest planet in distance to the Sun. In the night sky Saturn is easily visible to the unaided eye as a " +
            "non-twinkling point of light. When viewed through even a small telescope, the planet encircled by its magnificent rings is arguably the most sublime object in the solar system. Saturn is " +
            "designated by the symbol ♄. Saturn occupies almost 60 percent of Jupiter's volume but has only about one-third of its mass and the lowest mean density about 70 percent that of water of any " +
            "known object in the solar system. Hypothetically, Saturn would float in an ocean large enough to hold it.",
        image: "img/pictures/saturn.png",
        diameter: "120 536",
        mass: "568 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "-140",
            },
        ],
        gravity: "9.0",
        distance: [
            {
                name: "Min distance to Earth",
                value: "116",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "166",
                unit: "million km",
            },
        ],
        lengthOfDay: "10.7",
        moons: [
            {
                name: "Number of Moons",
                value: "82",
            },
        ],
        altText: "light brown planet saturn with a black ring around it",
    },
    {
        id: "7",
        title: "Uranus",
        text:
            "Uranus, seventh planet in distance from the Sun and the least massive of the solar system's four giant, or Jovian, planets, which also include Jupiter, Saturn, and Neptune. At its brightest, " +
            "Uranus is just visible to the unaided eye as a blue-green point of light. It is designated by the symbol ♅. Methane in the Uranian atmosphere absorbs the red wavelengths of sunlight, giving the " +
            "planet its blue-green colour. Most of the planets rotate on an axis that is more or less perpendicular to the plane of their respective orbits around the Sun. But Uranus's axis lies almost parallel " +
            "to its orbital plane, which means that the planet spins nearly on its side, its poles taking turns pointing toward the Sun as the planet travels in its orbit.",
        image: "img/pictures/uranus.png",
        diameter: "51 118",
        mass: "86.8 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "-195",
            },
        ],
        gravity: "8.7",
        distance: [
            {
                name: "Min distance to Earth",
                value: "2 600",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "3 150",
                unit: "million km",
            },
        ],
        lengthOfDay: "17.2",
        moons: [
            {
                name: "Number of Moons",
                value: "27",
            },
        ],
        altText: "blue planet uranus with light blue stains",
    },
    {
        id: "8",
        title: "Neptun",
        text:
            "Neptune, third most massive planet of the solar system and the eighth and outermost planet from the Sun. Because of its great distance from Earth, it cannot be seen with the unaided " +
            "eye. With a small telescope, it appears as a tiny, faint blue-green disk. It is designated by the symbol ♆. Neptune's orbit is almost perfectly circular; as a result, its distance from " +
            "the Sun varies comparatively little over its nearly 164-year period of revolution. Although the dwarf planet Pluto's mean distance from the Sun is greater than Neptune's, its orbit is " +
            "so eccentric (elongated) that for about 20 years of each revolution Pluto is actually nearer the Sun than is Neptune.",
        image: "img/pictures/neptun.png",
        diameter: "49 528",
        mass: "102 * 10<sup>24 </sup>",
        temp: [
            {
                name: "Mean Temperature",
                value: "-200",
            },
        ],
        gravity: "11.0",
        distance: [
            {
                name: "Min distance to Earth",
                value: "4 300",
                unit: "million km",
            },
            {
                name: "Max distance to Earth",
                value: "4 600",
                unit: "million km",
            },
        ],
        lengthOfDay: "16.1",
        moons: [
            {
                name: "Number of Moons",
                value: "14",
            },
        ],
        altText: "planet neptune in the form of a light blue ball",
    },
];

const mainBlock = document.querySelector(".main");
const [firstElement] = solarSystem;

function chosenPlanet({ title, text, image, diameter, mass, temp, gravity, distance, lengthOfDay, moons, altText }) {
    return `
    <div class="main__content">
        <h1 class="main__title">${title}</h1>
        <p class="main__text">${text}</p>
        <img src="${image}" alt="${altText}" class="main__img"  width="450", height="450"/>
        <ul class="list">
            <li class="list__item">
                <p class="list__info">Diameter: <span class="list__value">${diameter} </span>km</p>
            </li>
            <li class="list__item">
                <p class="list__info">Mass: <span class="list__value">${mass}</span>kg</p>
            </li>
            <li class="list__item">
                <p class="list__info">Gravity: <span class="list__value">${gravity} </span>m/s<sup>2</sup></p>
            </li>
            <li class="list__item">
                <p class="list__info">Length of Day: <span class="list__value">${lengthOfDay} </span>hr</p>
            </li>
            ${temp.map(
                (el) =>
                    `<li class="list__item">
                <p class="list__info">${el.name}: <span class="list__value">${el.value} </span><sup>o</sup>C</p>
            </li>`
            )}
            ${moons.map(
                (el) =>
                    `<li class="list__item">
                <p class="list__info list__info--flax">
                    ${el.name}: <span class="list__value"> <img src="img/icons/moon.png" alt="" class="list__icon"/></span><span> * ${el.value}</span>
                </p>
            </li>`
            )}
            ${distance
                .map(
                    (el) =>
                        `<li class="list__item">
                <p class="list__info">${el.name}: <span class="list__value">${el.value} </span>${el.unit}</p>
            </li>`
                )
                .join("")}
        </ul>
    </div>
       `;
}

mainBlock.innerHTML = chosenPlanet(firstElement);

const iconMenu = document.querySelector(".nav__icon");
const listMenu = document.querySelector(".nav__body");

iconMenu.addEventListener("click", function () {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_opened");
    listMenu.classList.toggle("_opened");
});

const navList = document.querySelector(".nav__list");
const navButton = Array.from(document.querySelectorAll(".nav__button"));

const removeActiveLink = () => navButton.forEach((btn) => btn.classList.remove("_active"));

navList.addEventListener("click", ({ target }) => {
    const buttonId = target.parentElement.id;

    if (target.parentElement.closest(".nav__button")) {
        removeActiveLink();
        if (target.parentElement.classList.contains("_active")) {
            target.parentElement.classList.remove("_active");
        } else {
            target.parentElement.classList.add("_active");
            iconMenu.classList.remove("_opened");
            listMenu.classList.remove("_opened");
            document.body.classList.remove("_lock");
            mainBlock.innerHTML = chosenPlanet(solarSystem.find((item) => item.id === buttonId));
        }
    }
});
