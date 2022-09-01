"use strict"
const createHtmlElement = (htmlElementName, attributes, className) => {
  const htmlElement = document.createElement(htmlElementName);
  htmlElement.classList.add(className);
  for (const attributeName in attributes) {
    htmlElement.setAttribute(attributeName, attributes[attributeName]);
  }
  return htmlElement;
};

const createMenu = (data) => {
  const menu = createHtmlElement("ul", { id: "menu", class: "menu" });
  data.forEach(
    (item, index) => { menu.appendChild(createMenuItem(data[index], index)) }
  )
  return menu;
};

const createMenuItem = (data, id) => {
  const menuItem = createHtmlElement("li", {
    id: `menu-item-${id}`,
    class: "menu-item",
    'data-id': id,
  });
  menuItem.innerHTML = `<a href="#" data-id=${id} class="menu-link">${data["name"]}</a>`;
  return menuItem;
};

const createMainContent = (data) => {
  const container = createHtmlElement("main", {
    id: "content-container",
    class: "content-container",
  });

  const header = createHtmlElement("h2", {
    id: "content-header",
    class: "content-header",
  });

  header.innerHTML = data.name;
  const text = createHtmlElement("div", { id: "main-text", class: "main-text" });
  text.innerHTML = data.description;
  const imgContainer = createHtmlElement("div", { class: "img-container" });
  const img = createHtmlElement(
    "img",
    {
      src: data["image"],
      id: "main-image",
      class: "main-image",
      alt: data["name"],
    },
    "main-image"
  );
  imgContainer.append(img);
  container.append(header, imgContainer, text);

  return container;
}

const setEventListeners = () => {
  const menu = document.querySelector(".menu ");

  menu.addEventListener("click", (e) => {
    const id = e.target.closest(".menu-item").dataset.id;
    const newContent = createMainContent(data[id]);
    document.querySelector("main").replaceWith(newContent);
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(`#menu-item-${id}`).classList.add("active");
  });
};

const start = (data) => {
  const container = document.querySelector("#container");
  
  container.appendChild(createMenu(data));
  container.appendChild(createMainContent(data[0]));
  setEventListeners();
};
start(data);
