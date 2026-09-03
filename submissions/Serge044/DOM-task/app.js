const arrOfMovies = [
  {
    id: "1",
    image: "images/1.gif",
    title: "Back to the Future",
    genre: "Adventure · Comedy · Sci-Fi",
    year: "1985",
    duration: "1h 56m",
    director: "Robert Zemeckis",
    writers: "Robert Zemeckis, Bob Gale",
    stars: "Michael J. Fox, Christopher Lloyd, Lea Thompson",
    description:
      "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
  },
  {
    id: "2",
    image: "images/2.gif",
    title: "Terminator 2: Judgment Day",
    genre: "Action · Sci-Fi",
    year: "1991",
    duration: "2h 17m",
    director: "James Cameron",
    writers: "James Cameron, William Wisher",
    stars: "Arnold Schwarzenegger, Linda Hamilton, Edward Furlong",
    description:
      "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
  },
  {
    id: "3",
    image: "images/3.gif",
    title: "Tremors",
    genre: "Comedy · Horror",
    year: "1990",
    duration: "1h 36m",
    director: "Ron Underwood",
    writers: "S.S. Wilson, Brent Maddock, Ron Underwood",
    stars: "Kevin Bacon, Fred Ward, Finn Carter",
    description:
      "Natives of a small isolated town defend themselves against strange underground creatures which are killing them one by one.",
  },
  {
    id: "4",
    image: "images/4.gif",
    title: "Jurassic Park",
    genre: "Action · Adventure · Sci-Fi",
    year: "1993",
    duration: "2h 7m",
    director: "Steven Spielberg",
    writers: "Michael Crichton, David Koepp",
    stars: "Sam Neill, Laura Dern, Jeff Goldblum",
    description:
      "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
  },
  {
    id: "5",
    image: "images/5.gif",
    title: "Ace Ventura: Pet Detective",
    genre: "Comedy",
    year: "1994",
    duration: "1h 26m",
    director: "Tom Shadyac",
    writers: "Jack Bernstein, Tom Shadyac, Jim Carrey",
    stars: "Jim Carrey, Courteney Cox, Sean Young",
    description:
      "A goofy detective specializing in animals goes in search of the missing mascot of the Miami Dolphins.",
  },
];

const movies = document.querySelector(".movies");
const buttonsHolder = document.querySelector(".buttons-holder");
const img = document.getElementById("image");
const buttonsList = document.createDocumentFragment();

arrOfMovies.forEach((category) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  li.classList.add("menu-item");
  button.classList.add("button");
  button.innerText = category.id;
  li.appendChild(button);
  buttonsList.appendChild(li);
});
buttonsHolder.appendChild(buttonsList);

const title = document.createElement("p");
title.classList.add("title");
movies.append(title);

const genre = document.createElement("p");
genre.classList.add("genre");
movies.append(genre);

const year = document.createElement("p");
year.classList.add("year");
movies.append(year);

const duration = document.createElement("p");
duration.classList.add("duration");
movies.append(duration);

const director = document.createElement("p");
director.classList.add("director");
movies.append(director);

const writers = document.createElement("p");
writers.classList.add("writers");
movies.append(writers);

const stars = document.createElement("p");
stars.classList.add("stars");
movies.append(stars);

const description = document.createElement("p");
description.classList.add("description");
movies.append(description);

function showImageAndDesc(event) {
  if (event.target.nodeName === "BUTTON") {
    const category = arrOfMovies.find(
      (category) => category.id === event.target.innerText
    );
    img.src = category.image;
    title.innerText = category.title;
    genre.innerText = category.genre;
    year.innerText = category.year;
    duration.innerText = category.duration;
    director.innerText = `Director: ${category.director}`;
    writers.innerText = `Writers: ${category.writers}`;
    stars.innerText = `Stars: ${category.stars}`;
    description.innerText = category.description;
  }
}

buttonsHolder.addEventListener("click", showImageAndDesc);
