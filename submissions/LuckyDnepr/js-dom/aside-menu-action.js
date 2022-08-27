"use strict";


export function renderContent(film, container) {
  const newContent = [
      makeTitle(film),
      makePoster(film),
      makeFilmInfo(film),
      makeActorsList(film),
      makeAnnotation(film) 
  ];
  container.replaceChildren(...newContent);
}

function makeTitle(film) {
  const title = document.createElement("h2");
  title.classList.add("title_film");
  title.innerHTML = film.title;
  return title;
}

function makePoster(film) {
  const poster = document.createElement("figure"),
    image = document.createElement("img");
  image.setAttribute("max-width", 400);
  poster.classList.add("poster");
  image.src = film.poster_url;
  image.alt = film.title;
  poster.appendChild(image);
  return poster;
}

function makeFilmInfo(film) {
  const ignoredFields = ["ID", "poster_url", "title", "stars", "annotation"],
    infoList = document.createElement("ul");
  infoList.classList.add("info_list");
  Object.keys(film)
    .filter((key) => !ignoredFields.includes(key))
    .map((key) => {
      const infoField = document.createElement("li");
      infoField.classList.add("info_list_item");
      infoField.innerHTML = `<p><span class="info_field">${key}:</span> <span>${film[key]}</span></p>`;
      return infoField;
    })
    .forEach((infoField) => infoList.appendChild(infoField));
  return infoList;
}

function makeActorsList(film) {
  const actorList = document.createElement("ul");
  actorList.classList.add("stars_list");
  const actorListTitle = document.createElement("h4");
  actorListTitle.classList.add("list_title");
  actorListTitle.innerHTML = "Actors";
  actorList.appendChild(actorListTitle);
  film.stars
    .map((actor) => {
      const actorListItem = document.createElement("li");
      actorListItem.classList.add("stars_list_item");
      actorListItem.innerHTML = `<p>${actor}</p>`;
      return actorListItem;
    })
    .forEach((actorListItem) => actorList.appendChild(actorListItem));
  return actorList;
}

function makeAnnotation(film) {
  const annotationWrapper = document.createElement("article");
  annotationWrapper.classList.add("annotation");
  film.annotation
    .join("")
    .split(". ")
    .map((sentense) => {
      const annotation = document.createElement("p");
      annotation.classList.add("annotation_text");
      annotation.innerHTML = sentense + ".\n";
      return annotation;
    })
    .forEach((paragraph) => annotationWrapper.appendChild(paragraph));
  return annotationWrapper;
}
