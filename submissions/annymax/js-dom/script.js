const basketPlayers = [
  {
    id: "0",
    name: "Michael Jordan",
    photo: "./images/jordan.jpg",
    facts: `Michael Jordan, in full Michael Jeffrey Jordan,
  byname Air Jordan, (born February 17, 1963, Brooklyn, New York, U.S.), 
  American collegiate and professional basketball player widely considered 
  to be one of the greatest all-around players in the history of the game. 
  He led the Chicago Bulls to six National Basketball Association (NBA) 
  championships (1991–93, 1996–98).`,
  },
  {
    id: "1",
    name: "Lebron James",
    photo: "./images/lebron.jpg",
    facts: `LeBron James became an immediate star after skipping 
  college to join the NBA's Cleveland Cavaliers. He led the Miami Heat to NBA 
  titles in 2012 and 2013 and won another championship 
  with Cleveland in 2016, before joining the Los Angeles Lakers in 2018.`,
  },
  {
    id: "2",
    name: "Luka Doncic",
    photo: "./images/doncic.jpg",
    facts: `Luka Doncic is a Slovenian professional basketball player for the 
  Slovenian national team as well as the Dallas Mavericks of the National Basketball Association (NBA). 
  He has broken several NBA and EuroLeague champion history records and has been 
  named NBA All-Star, All-NBA First Team, and NBA Rookie of the Year.`,
  },
  {
    id: "3",
    name: "James Harden",
    photo: "./images/Harden.jpg",
    facts: `James Edward Harden Jr. (born August 26, 1989) is an American professional basketball player 
  for the Philadelphia 76ers of the National Basketball Association (NBA). He is one of the NBA's most prolific scorers,
  as well as one of the top overall players in the league.Harden is a two-time member of the United States national team,
   winning gold medals at the 2012 Summer Olympics and 2014 FIBA World Cup.`,
  },
  {
    id: "4",
    name: "Russel Westbrook",
    photo: "./images/westbrook.jpg",
    facts: `Russell Westbrook III 
  (born November 12, 1988) is an American professional basketball player for the Los Angeles 
  Lakers of the National Basketball Association (NBA).  He is also a nine-time All-NBA Team member, 
  led the league in scoring in 2014–15 and 2016–17, and won back-to-back NBA All-Star Game MVP awards
   in 2015 and 2016.
 In 2020–21, Westbrook averaged a triple-double 
   for the fourth time in five seasons, and he passed Robertson for the most career triple-doubles in NBA history.`,
  },
  {
    id: "5",
    name: "Kobe Bryant",
    photo: "./images/kobe.jpg",
    facts: `Kobe Bryant, in full Kobe Bean Bryant, 
  (born August 23, 1978, Philadelphia, Pennsylvania, U.S.—died January 26, 2020, Calabasas, California), 
  American professional basketball player, who helped lead the Los Angeles Lakers of the National 
  Basketball
   Association (NBA) to five championships (2000–02 and 2009–10).`,
  },
  {
    id: "6",
    name: "Stephen Curry",
    photo: "./images/Curry.jpeg",
    facts: `Wardell Stephen Curry II (born March 14, 1988) is an American 
  professional basketball player for the Golden State Warriors of the National
   Basketball Association (NBA). Widely regarded as one of the greatest basketball
    players of all time, and as the greatest shooter in NBA history,Curry is credited 
    with revolutionizing the sport by inspiring teams and players to shoot 
    far more three-point shots.`,
  },
];

const button = document.querySelector(".button");
const menu = document.querySelector(".menu");
const content = document.querySelector(".content-wrapper");
const siteTitle = document.querySelector(".site-title");
const firstListItem = document.querySelector(".focus-el");

button.addEventListener("click", function () {
  content.innerHTML = "";
  menu.classList.toggle("menu-active");
  siteTitle.classList.toggle("hidden");
  firstListItem.focus();
});

const bodyElement = document.body;

function showPlayerElement(player) {
  const h2 = document.createElement("h2");
  const image = document.createElement("img");
  const info = document.createElement("p");
  content.innerHTML = "";
  h2.className = "title";
  h2.innerHTML = player.name;
  image.className = "image-player";
  image.setAttribute("alt", player.name);
  image.src = player.photo;
  info.className = "about";
  info.innerHTML = player.facts;
  content.prepend(h2, image, info);
}

document.querySelector(".menu-list").addEventListener("click", ({ target }) => {
  if (!target.matches(".menu-list-link")) return undefined;
  const player = basketPlayers.find((player) => {
    return player.id === target.id;
  });
  showPlayerElement(player);
});
