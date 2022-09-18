import { data } from "./data.js";

const overview = `
  <h1>Selected countries</h1>
  <div class="imagesList">
    <figure class="imagesListItem">
      <p class="countryTitle">Ukraine</p>
      <img src="https://images.unsplash.com/photo-1566679056459-4cbb58a28570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2950&q=80"
          alt="Ukraine landscape">
      <figcaption>By Kseniia Rastvorova</figcaption>
    </figure>
    <figure class="imagesListItem">
      <p class="countryTitle">New Zealand</p>
      <img src="https://images.unsplash.com/photo-1556878516-61356c874f03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="New Zealand landscape">
      <figcaption>By Andreas Sjövall</figcaption>
    </figure>
    <figure class="imagesListItem">
      <p class="countryTitle">Chile</p>
      <img src="https://images.unsplash.com/photo-1478827387698-1527781a4887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="Torres del Paine National Park, Chile">
      <figcaption>By Olga Stalska</figcaption>
    </figure>
    <figure class="imagesListItem">
    <p class="countryTitle">Iceland</p>
      <img src="https://images.unsplash.com/photo-1504747594499-b92be8e8959a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80"
          alt="Iceland landscape">
      <figcaption>By Ricky Kharawala</figcaption>
    </figure>
  </div>
`;

const navBarItemsList = document.getElementsByClassName("navBar")[0].children;
const mobileNavBarItemsList =
  document.getElementsByClassName("mobileNavBar")[0].children;
const content = document.getElementById("content");
const menu = document.getElementById("menu");
const mobileNavBar = document.getElementById("mobileNavBar");

content.innerHTML = overview;

navBarItemsList[0]?.addEventListener("click", () => {
  content.innerHTML = overview;
});

mobileNavBarItemsList[0]?.addEventListener("click", () => {
  content.innerHTML = overview;
  mobileNavBar.classList.toggle("change");
  menu.classList.toggle("change");
});

const changeContent = (htmlEl, dataSource, isMobile) => {
  htmlEl?.addEventListener("click", () => {
    content.innerHTML = `
      <div class="pageContent">
        <h1>${dataSource?.title}</h1>
        <figure class="pageImage">
          <img src=${dataSource?.imgUrl} alt=${dataSource?.alt}>
          <figcaption>${dataSource?.title} by ${dataSource?.imgAuthor}</figcaption>
        </figure>
        <p class="pageDescription" >${dataSource?.description}</p>
      </div>
    `;

    if (isMobile) {
      mobileNavBar.classList.toggle("change");
      menu.classList.toggle("change");
    }
  });
};

for (let i = 1; i <= navBarItemsList.length; i++) {
  changeContent(navBarItemsList[i], data[i - 1], false);
}

for (let i = 1; i <= mobileNavBarItemsList.length; i++) {
  changeContent(mobileNavBarItemsList[i], data[i - 1], true);
}

menu.addEventListener("click", () => {
  menu.classList.toggle("change");
  mobileNavBar.classList.toggle("change");
});
