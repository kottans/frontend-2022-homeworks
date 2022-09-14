window.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu__burger__img"),
      menuBtnClose = document.querySelector(".menu__burger__close"),
      menuBurger = document.querySelector(".menu__burger");
  
    function showMenuBurger() {
      menuBurger.classList.add("menu__burger__active");
      menuBtn.style.display = "none";
    }
  
    function hideMenuBurger() {
      menuBurger.classList.remove("menu__burger__active");
      menuBtn.style.display = "block";
    }
  
    menuBtn.addEventListener("click", () => {
      showMenuBurger();
    });
  
    menuBtnClose.addEventListener("click", () => {
      hideMenuBurger();
    });
  
    function addEventForItem(selector) {
      const links = document.querySelectorAll(selector);
      const mainBlock = document.querySelector(".main");
      links.forEach((item, i) => {
        item.addEventListener("click", () => {
          fetch("js/base.json")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              changeContent(data[i]);
            });
          mainBlock.scrollTop = 0;
          hideMenuBurger();
        });
      });
    }
  
    addEventForItem(".menu__item");
    addEventForItem(".menu__burger__item");
  
    function changeContent(item) {
      const mainBlock = document.querySelector(".main");
      mainBlock.innerHTML = `<img src="${item.img}" alt="${item.altText}" class="main__img">
                                 <h2 class="title">${item.title}</h2>
                                 <p class="subtitle">inhabitants of the planet: ${item.subtitle}</p>
                                 <p class="descr">${item.descr}</p>`;
    }
  });
  


  