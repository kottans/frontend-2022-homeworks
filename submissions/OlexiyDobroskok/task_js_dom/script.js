const darkTowerSeries = [
  {
    id: "dt0",
    title: "The Dark Tower",
    quote:
      "“I don't aim with my hand; he who aims with his hand has forgotten his father's face. I aim with my eye. I do not shoot with my hand; he who shoots with his hand has forgotten his father's name. I shoot with my mind. I do not kill with a weapon; he who kills with a weapon has forgotten his father's name. I kill with my heart.”",
    about:
      "The Dark Tower is a series of eight novels and one short story written by American author Stephen King. Incorporating themes from multiple genres, including dark fantasy, science fantasy, horror, and Western, it describes a 'gunslinger' and his quest toward a tower, the nature of which is both physical and metaphorical. The series, and its use of the Dark Tower, expands upon Stephen King's multiverse and in doing so, links together many of his other novels.",
    photo: "./img/Dark_tower3.jpg",
    alt: "Illustration for Stephen King's Dark Tower series",
  },
  {
    id: "dt1",
    title: "The Dark Tower: The Gunslinger",
    quote:
      "“This is your promise ... things may be different ... there may yet be rest. Even salvation. ”",
    about:
      "The story centers Roland Deschain, the last gunslinger, who has been chasing his adversary, &#171 the man in black &#187 ,for many years. The novel fuses Western fiction with fantasy, science fiction, and horror, following Roland's trek through a vast desert and beyond in search of the man in black. Roland meets several people along his journey, including a boy named Jake Chambers, who travels with him part of the way.",
    photo: "./img/The Gunslinger.jpg",
    alt: "Illustration for Stephen King's The Dark Tower: The Gunslinger",
  },
  {
    id: "dt2",
    title: "The Dark Tower II: The Drawing of the Three",
    quote: "“The greatest mystery the universe offers is not life but size.”",
    about:
      "The Drawing of Three introduces us to new characters for Roland's quest for the Dark Tower, ex-junkie Eddy and schizophrenic and wheelchair bound Odetta/Detta. Roland still has a lot on his own mind, he has lost some parts of his that will make him to rely more heavily on his new companions.",
    photo: "./img/The Drawing Of The Three.jpg",
    alt: "Illustration for Stephen King's The Dark Tower II: The Drawing of the Three",
  },
  {
    id: "dt3",
    title: "The Dark Tower III: The Waste Lands",
    quote: "“Time’s the thief of memory.”",
    about:
      "Several months have passed, and Roland’s two new tet-mates have become proficient gunslingers. Eddie Dean has given up heroin, and Odetta’s two selves have joined, becoming the stronger and more balanced personality of Susannah Dean. But while battling The Pusher in 1977 New York, Roland altered ka by saving the life of Jake Chambers, a boy who—in Roland’s where and when—has already died. Now Roland and Jake exist in different worlds, but they are joined by the same madness: the paradox of double memories. Roland, Susannah, and Eddie must draw Jake into Mid-World then follow the Path of the Beam all the way to the Dark Tower.",
    photo: "./img/The Waste Lands.jpg",
    alt: "Illustration for Stephen King's The Dark Tower III: The Waste Lands",
  },
  {
    id: "dt4",
    title: "The Dark Tower IV: Wizard and Glass",
    quote: "“Was there ever a trap to match the trap of love?”",
    about:
      "ROLAND THE GUNSLINGER and his band have narrowly escaped the city of Lud and boarded Blaine, a train that will take them to, of all places, Kansas. There the ghost city of Topeka has been depopulated by a superflu. Alongside Interstate 70, an emerald palace rises enchantingly. Before Roland and the companions of his ka-tet continue along the Path of the Beam, Roland must tell them the tale that defines him both as a man and hero: a long-ago romance of witchery and evil, of the beautiful, unforgettable Susan Delgado, of the Big Coffin Hunters and Rhea of the Cöos. And when his tale is finished, Roland confronts a man who goes by many names, a man who “darkles and tincts,” and who may hold the key to the Dark Tower.",
    photo: "./img/Wizard and Glass.jpg",
    alt: "Illustration for Stephen King's The Dark Tower IV: Wizard and Glass",
  },
  {
    id: "dt5",
    title: "The Dark Tower V: Wolves of the Calla",
    quote:
      "“Ka comes to me ... I translate it ... I am not ka ... I hate it! ”",
    about:
      "Roland and his tet have just returned to the path of the Beam when they discover that they are being followed by a group of inexperienced trackers. The trackers are from the town of Calla Bryn Sturgis, and they desperately need the help of gunslingers. Once every generation, a band of masked riders known as the Wolves gallop out of the dark land of Thunderclap to steal one half of all the twins born in the Callas. When the children are returned, they are roont, or mentally and physically ruined. In less than a month, the Wolves will raid again.",
    photo: "./img/Wolves of the Calla.jpg",
    alt: "Illustration for Stephen King's The Dark Tower V: Wolves of the Calla",
  },
  {
    id: "dt6",
    title: "The Dark Tower VI: Song of Susannah",
    quote:
      "“There are forces at work ... not all ... are working to keep us away from the Tower. ”",
    about:
      "The Wolves have been defeated, but our tet faces yet another catastrophe. Susannah Dean’s body has been usurped by a demon named Mia who wants to use Susannah’s mortal form to bear a demon child. Stealing Black Thirteen, Mia has traveled through the Unfound Door to 1999 New York where she plans to give birth to her chap, a child born of two mothers and two fathers who will grow up to be Roland’s nemesis. With the help of the time-traveling Manni, Roland and Eddie plan to follow Susannah while Father Callahan and Jake will find Calvin Tower, owner of the vacant lot where a magical rose grows: a rose that must be saved at all costs.",
    photo: "./img/Song of Susannah.jpg",
    alt: "Illustration for Stephen King's The Dark Tower VI: Song of Susannah",
  },
  {
    id: "dt7",
    title: "The Dark Tower VII: The Dark Tower",
    quote:
      "“Fault always lies in the same place, my fine babies: with him weak enough to lay blame.”",
    about:
      "The final volume sees gunslinger Roland on a roller-coaster mix of exhilarating triumph and aching loss in his unrelenting quest to reach the dark tower. Roland's band of pilgrims remains united, though scattered. Susannah-Mia has been carried off to New York to give birth, Terrified of what may happen.",
    photo: "./img/The Dark Tower.jpg",
    alt: "Illustration for Stephen King's The Dark Tower VII: The Dark Tower",
  },
  {
    id: "dt8",
    title: "The Dark Tower: The Wind Through the Keyhole",
    quote: "“Balls to your sorry ... Ka works and the world moves on. ”",
    about:
      "We join Roland and his ka-tet as a ferocious storm halts their progress along the Path of the Beam. As they shelter from the screaming wind and snapping trees, Roland tells them not just one strange tale, but two – and in doing so sheds fascinating light on his own troubled past.",
    photo: "./img/The Wind through the Keyhole.jpg",
    alt: "Illustration for Stephen King's The Dark Tower: The Wind Through the Keyhole",
  },
];

const contentContainer = document.querySelector(".content");
const sidebar = document.createElement("aside");
sidebar.className = "sidebar";
contentContainer.prepend(sidebar);
sidebar.prepend(...addButtons());

function addButtons() {
  const buttonList = [];
  darkTowerSeries.forEach((el, index) => {
    const button = document.createElement("button");
    button.className = "sidebar__button";
    button.id = "dt" + index;
    button.innerHTML = darkTowerSeries[index].title;
    buttonList.push(button);
  });
  return buttonList;
}

const contentSection = document.createElement("section");
contentSection.className = "content__section";
sidebar.after(contentSection);
const textContentContainer = document.createElement("div");
textContentContainer.className = "textcontent__container";
contentSection.prepend(textContentContainer);
const contentTitle = document.createElement("h2");
contentTitle.className = "content__title";
textContentContainer.prepend(contentTitle);
const blockquote = document.createElement("blockquote");
contentTitle.after(blockquote);
const paragraphQuote = document.createElement("p");
paragraphQuote.className = "quote__text";
blockquote.prepend(paragraphQuote);
const paragraph = document.createElement("p");
paragraph.className = "content__text";
blockquote.after(paragraph);
const bookImage = document.createElement("img");
bookImage.className = "content__img";
textContentContainer.after(bookImage);

function contentCreator(eventBtn) {
  const contentData = darkTowerSeries.filter((el) => eventBtn.id === el.id);
  contentTitle.innerHTML = contentData[0].title;
  paragraphQuote.innerHTML = contentData[0].quote;
  paragraph.innerHTML = contentData[0].about;
  bookImage.src = contentData[0].photo;
  bookImage.alt = contentData[0].alt;
}

sidebar.addEventListener("click", function (event) {
  let target = event.target;
  if (target.closest(".sidebar__button")) {
    contentCreator(target);
  }
});

const frontPage = contentCreator(dt0);
