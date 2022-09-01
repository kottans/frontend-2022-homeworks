const createElem = (elem, attrObj, className) => {
  elem = document.createElement(elem);
  elem.classList.add(className);
  for (attrName in attrObj) {
    elem.setAttribute(attrName, attrObj[attrName]);
  }
  return elem;
};

const createMenu = (data) => {
  const menu = createElem("ul", { id: "menu", class: "menu" });
  data.forEach(
    (item, index) => { menu.appendChild(createMenuItem(data[index], index)) }
  )
  return menu;
};

const createMenuItem = (data, id) => {
  const menuItem = createElem("li", {
    id: "menu-item-" + id,
    class: "menu-item",
    'data-id': id,
  });
  menuItem.innerHTML = `<a href="#" data-id=${id} class="menu-link">${data["name"]}</a>`;
  return menuItem;
};

const createMainContent = (data) => {
  const container = createElem("main", {
    id: "content-container",
    class: "content-container",
  });

  const header = createElem("h2", {
    id: "content-header",
    class: "content-header",
  });

  header.innerHTML = data.name;
  const text = createElem("div", { id: "main-text", class: "main-text" });
  text.innerHTML = data.description;
  const imgContainer = createElem("div", { class: "img-container" });
  const img = createElem(
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
    document.querySelector("#menu-item-" + id).classList.add("active");
  });
};

const start = (data) => {
  const container = document.querySelector("#container");
  
  container.appendChild(createMenu(data));
  container.appendChild(createMainContent(data[0]));
  setEventListeners();
};
start(data);
