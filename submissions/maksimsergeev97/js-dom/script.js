window.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu__burger__img"),
      menuBtnClose = document.querySelector(".menu__burger__close"),
      menuBurger = document.querySelector(".menu__burger");
  
    function showMenuBurger() {
      menuBurger.classList.add("menu__burger__active");
      menuBtn.classList.add("hide_element");
    }
  
    function hideMenuBurger() {
      menuBurger.classList.remove("menu__burger__active");
      menuBtn.classList.remove("hide_element");
    }
  
    menuBtn.addEventListener("click", showMenuBurger);
  
    menuBtnClose.addEventListener("click", hideMenuBurger);
  
    function changeContent(item) {
      const mainBlock = document.querySelector(".main");
      mainBlock.innerHTML = `<img src="${item.img}" alt="${item.altText}" class="main__img">
                                 <h2 class="title">${item.title}</h2>
                                 <p class="subtitle">inhabitants of the planet: ${item.subtitle}</p>
                                 <p class="descr">${item.descr}</p>`;
    }

    function getData (item) {
      fetch("js/base.json")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              changeContent(data[item]);
            }).catch((error) => {
              console.log(error);
            })
    }

    function renderContent (selector, target) {
      const items = document.querySelectorAll(selector);
      items.forEach((item,i) => {
        if (target == item && target.tagName == "LI") {
          getData(i);
          hideMenuBurger();
        } else {
          return;
        };
      });
    };

    function addEventClick (menuSelector, itemsSelector) {
      const menu = document.querySelector(menuSelector)
      menu.addEventListener('click', (e) => {
        const target = e.target;
        renderContent(itemsSelector, target);
      });
    }

    addEventClick(".menu__list", ".menu__item");
    addEventClick(".menu__burger__list", ".menu__burger__item")

  });




  