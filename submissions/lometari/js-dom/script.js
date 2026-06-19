let dataArray = [
    {
        img_path: "img/main.png",
        inner_text:
            "It can sometimes be convenient to divide the whole ocean up into smaller sections, just like how we divide land up into countries or continents. There are a few ways to do this.",
        alt: "Blue whale",
    },
    {
        img_path: "img/1_ocean.png",
        inner_text:
            "Most people agree that there is one ocean composed of salt water, covering about 71% of the Earth’s surface and accounting for 97% of all water on the planet. This water is connected by the “global ocean conveyor belt”: a system of currents that move water, minerals, organisms and heat around the world. These currents are driven by several factors including the moon, the Earth’s rotation and the water’s salinity, temperature and density.",
        alt: "1 Ocean picture",
    },
    {
        img_path: "img/3_ocean.png",
        inner_text:
            "The first way is by looking at how the Ocean is split into three by the large land masses of the Americas, Africa and Oceania. Using this system, the named oceans are the Atlantic Ocean, the Indian Ocean and the Pacific Ocean.",
        alt: "3 Ocean picture",
    },
    {
        img_path: "img/4_ocean.png",
        inner_text:
            "At very high latitudes, the ocean tends to be covered by ice, for at least part of the year, which is why the Arctic Ocean is considered by many people to be the fourth ocean.",
        alt: "4 Ocean picture",
    },
    {
        img_path: "img/5_ocean.png",
        inner_text:
            "In the year 2000, the International Hydrographic Organisation proposed that the water surrounding Antarctica be added to the list as the fifth ocean called the Southern Ocean. ",
        alt: "5 Ocean picture",
    },
];
let indexArray = [
    "Main",
    "1 Ocean Model",
    "3 Ocean Model",
    "4 Ocean Model",
    "5 Ocean Model",
];

let sections = document.getElementsByClassName("menu_item");
let sectionId;
let sectionName;
let main_picture = document.querySelector(".main_picture img");
let main_text = document.querySelector(".main_text p");

function findIndex() {
    sectionId = indexArray.indexOf(sectionName);
    console.log("Sec ID: " + sectionId);
}

function replaceContent(event) {
    sectionName = event.target.innerHTML;
    findIndex(sectionName);
    main_picture.setAttribute("src", dataArray[sectionId].img_path);
    main_picture.setAttribute("alt", dataArray[sectionId].alt);
    main_text.textContent = dataArray[sectionId].inner_text;
    console.log(main_text.textContent);
}

for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("click", replaceContent);
}

