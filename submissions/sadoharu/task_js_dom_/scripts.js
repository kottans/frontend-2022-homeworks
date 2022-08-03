window.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".section__page");
  const navList = document.querySelector(".nav-bar__list");

  const navListItem = [
    {
      title: "Overview",
      icon: "icon-browser",
    },
    {
      title: "About",
      icon: "icon-about-dot-me",
    },
    {
      title: "Achievement",
      icon: "icon-award",
    },
    {
      title: "Projects",
      icon: "icon-files-empty",
    },
    {
      title: "Reviews",
      icon: "icon-rate_review",
    },
  ];

  navListItem.forEach((item, i) => {
    const liItem = document.createElement("li");
    liItem.classList.add("nav-bar__list_item");
    liItem.setAttribute("data-index", i);
    liItem.innerHTML = `
      <button class="nav-bar__list_button">
        <span class="${item.icon}">
        </span>
        ${item.title}
      </button>
    `;
    navList.append(liItem);
  });

  navList.querySelector(".nav-bar__list_button").classList.add("active");

  const togglePageVisibility = (show = 0) => {
    pages.forEach((item) => {
      item.classList.remove("visible");
    });
    pages[show].classList.add("visible");
  };

  togglePageVisibility();

  navList.addEventListener("click", (e) => {
    togglePageVisibility(
      e.target.closest(".nav-bar__list_item").getAttribute("data-index")
    );
    navList.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
  });
});
