window.addEventListener("DOMContentLoaded", () => {

    const seriesCOD = [{
        title: "Call of Duty",
        image: "assets/img/defaultImage.jpg",
        text: "Call of Duty is a series of first-person shooter video games produced by the American company Activision. The games in the series were developed by studios such as Infinity Ward, Treyarch and Sledgehammer Games. Early games in the series, starting with the very first game in 2003, focused on World War II; in the future, within the framework of the series, games were also released, the action of which took place during the Cold War, in the near future, even in space. Individual games in the series, united by a common time of action, are also connected to each other by narrative and characters."
    }, {
        title: "Call of Duty: Modern Warfare II",
        image: "assets/img/MW2.jpg",
        text: "Call of Duty: Modern Warfare II is a first-person shooter that is the sequel to 2019's Call of Duty: Modern Warfare. The plot of the game revolves around a global conflict involving legendary performers from OTG-141. Large-scale single player campaign will take you to different parts of the world. Missions will range from small but critical tactical strikes to top-secret operations. In addition to the single player mode, you will also have access to exciting online modes and story-based special operations designed for co-op."
    }, {
        title: "Call of Duty: Vanguard",
        image: "assets/img/CodV.jpeg",
        text: "The Call of Duty: Vanguard campaign is set during World War II and witnesses the origins of the Special Forces. Form your Task Force One squad and go to the Eastern and Western fronts of Europe, the Pacific Ocean and North Africa. Also in the game you will find a multiplayer online mode, where more than twenty maps are available, and a cooperative zombie mode."
    }, {
        title: "Call of Duty: Black Ops Cold War",
        image: "assets/img/ColdWar.jpg",
        text: "Call Of Duty: Black Ops Cold War is set in the early 1980s at the height of the geopolitical battle of the Cold War. A single-player campaign awaits you, where you will meet historical figures and harsh truths, fighting around the world in iconic places such as East Berlin, Vietnam, Turkey, the headquarters of the Soviet KGB and others.In the role of elite operatives, you will follow the trail of a shadowy figure named Perseus, whose mission is to destabilize the global world balance in order to change the course of history. The game will return such iconic characters from the series as Woods, Mason and Hudson."
    }, {
        title: "Call of Duty: Modern Warfare",
        image: "assets/img/MW.jpg",
        text: "Call of Duty: Modern Warfare is a first-person shooter in the Call of Duty series that is a reimagining of the Modern Warfare sub-series. In the game you have to plunge into a brutal and dramatic campaign, speaking on the side of special forces or rebels, fighting in various cities in Europe and the Middle East. In addition to the single story mode, the game features cooperative and session multiplayer."
    }, {
        title: "Call of Duty: Black Ops 4",
        image: "assets/img/CoDBlackOps4.jpg",
        text: "Call of Duty: Black Ops 4 is a multiplayer first-person shooter that continues the famous Call of Duty series without a story campaign. Instead, the game has introduced a Battle Royale mode called Blackout, in which you can take control of iconic characters from the entire Black Ops sub-series and fight in your favorite locations using iconic weapons. Also, you will find an updated zombie mode, where users need to look for powerful artifacts that are being hunted by some kind of evil."
    }]

    const listOfItemsElement = document.querySelector('.nav_menu_items');
    const titleOfSeriesElement = document.getElementById('series_title');
    const imageOfSeriesElement = document.getElementById('series_image');
    const textOfSeriesElement = document.getElementById('series_text');

    const burgerButton = document.getElementById('burger_img');
    const menu = document.getElementById('menu');

    function createMenu(series, parentElement) {
        for (const ser of series) {
            const li = document.createElement('li');
            li.textContent = ser.title;
            li.addEventListener("click", function () {
                showContent(ser);
                menu.classList.toggle('nav_menu_items_active');
                burgerButton.classList.toggle('burger_img_active');
            })
            parentElement.append(li);
            li.classList.add('nav_menu_item');
        }
    }

    function showContent(data) {
        titleOfSeriesElement.innerText = data.title;
        imageOfSeriesElement.src = data.image;
        imageOfSeriesElement.alt = data.title;
        textOfSeriesElement.innerText = data.text;
    }

    function showMenu() {
        burgerButton.addEventListener("click", function() {
            menu.classList.toggle('nav_menu_items_active');
        })
    }

    createMenu(seriesCOD, listOfItemsElement);
    showContent(seriesCOD[0]);
    showMenu();
});
