window.addEventListener("DOMContentLoaded", () => {
  const rockGroupsDescriptions = [
    {
      header: "Led Zeppelin",
      src: "./img/LZ_1.webp",
      text: "On September 7, 1968, four British musicians appeared together on stage for the first time. Shortly after, the formation also had a name: Led Zeppelin. Their goal was to launch an attack on people's ears.",
    },
    {
      header: "Beatles",
      src: "./img/beatles.webp",
      text: "The band liked the idea of using the name of an insect as a band name, and they were fans of Buddy Holly and the Crickets. Because John Lennon loved puns, he altered the spelling of 'Beetles' to 'Beatles'.",
    },
    {
      header: "Deep Purple",
      src: "./img/deep-purple.jpg",
      text: "Deep Purple is recognized by The Guinness Book of World Records as the world’s “loudest band.” In 1972 the band played a show at the London Rainbow Theatre and rocked so hard that their sound reached an incredible 117dB. Three people were knocked unconscious as a result of the musical onslaught.",
    },
    {
      header: "Pink Floyd",
      src: "./img/Pink_Floyd_.jpg",
      text: "The names Pink and Floyd came from two of Syd Barrett’s favourite Carolina bluesmen, Pink Anderson and Floyd Council, which he merged together and voila! People often assumed Pink Floyd was the name of a person in the band, especially stupid record industry people. The band sent this up with the line “which one’s Pink?” on the ‘Wish You Were Here’ song ‘Have A Cigar’ in 1975.",
    },
    {
      header: "Scorpions",
      src: "./img/scorpions.jpg",
      text: "Scorpions are a German rock band formed in 1965 in Hanover by Rudolf Schenker. Since the band’s inception, its musical style has ranged from hard rock to heavy metal. The lineup from 1978–92 was the most successful incarnation of the group, and included Klaus Meine (vocals), Rudolf Schenker (rhythm guitar), Matthias Jabs (lead guitar), Francis Buchholz (bass guitar), and Herman Rarebell (drums).",
    },
  ];

  const menuItem = document.querySelectorAll(".menu__item"),
    menu = document.querySelector(".menu"),
    menuBurger = document.querySelector(".menu__burger"),
    content = document.querySelector(".content"),
    contentItem = document.querySelector(".group-info");

  function hideMenuItemsActive() {
    menuItem.forEach((element) => {
      element.classList.remove("menu__item__active");
    });
  }

  function showMenuItemActive(i = 0) {
    menuItem[i].classList.add("menu__item__active");
  }

  function renderNode(node, classItem, text, src) {
    node.classList.add(classItem);
    node.innerText = text;
    node.src = src;
    console.log(node);
    return node;
  }

  function renderContent(i = 0, parent) {
    const header = document.createElement("h2"),
      img = document.createElement("img"),
      paragraph = document.createElement("p");
    parent.innerHTML = "";
    parent.append(
      renderNode(
        (node = header),
        (classItem = "group-info__header"),
        (text = rockGroupsDescriptions[i].header)
      ),
      renderNode(
        (node = img),
        (classItem = "group-info__src"),
        (text = ""),
        (src = rockGroupsDescriptions[i].src)
      ),
      renderNode(
        (node = paragraph),
        (classItem = "group-info__text"),
        (text = rockGroupsDescriptions[i].text)
      )
    );
  }

  showMenuItemActive(0);
  renderContent(0, contentItem);

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("menu__item")) {
      menuItem.forEach((element, i) => {
        if (target === element) {
          hideMenuItemsActive();
          showMenuItemActive(i);
          renderContent(i, contentItem);
        }
        if (window.innerWidth < 481) {
          menu.classList.add("slide__left");
          content.classList.add("content__100");
          menuBurger.classList.remove("hidden");
        } else {
          menu.classList.remove("slide__left");
          content.classList.remove("content__100");
          menuBurger.classList.add("hidden");
        }
      });
    }
  });

  menuBurger.addEventListener("click", (event) => {
    menu.classList.remove("slide__left");
    menuBurger.classList.add("hidden");
  });
});
