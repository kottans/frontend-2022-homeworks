"use strict";
window.addEventListener ('DOMContentLoaded', () => {
    const dataContent = {
        "html5": 
        {
            "img": "icons/skills/html5.svg",
            "title": "HTML5",
            "descr": " HTML5 (англ. HyperText Markup Language, version 5) — язык для структурирования и представления содержимого всемирной паутины. Это пятая версия HTML. Хотя стандарт был завершён (рекомендованная версия к использованию) только в 2014 году (предыдущая, четвёртая, версия опубликована в 1999 году), уже с 2013 года браузерами оперативно осуществлялась поддержка, а разработчиками — использование рабочего стандарта (англ. HTML Living Standard). Цель разработки HTML5 — улучшение уровня поддержки мультимедиа-технологий с одновременным сохранением обратной совместимости, удобочитаемости кода для человека и простоты анализа для парсеров.",
        },
        "css3": 
        {
            "img": "icons/skills/css3.svg",
            "title": "CSS3",
            "descr": " CSS используется создателями веб-страниц для задания цветов, шрифтов, стилей, расположения отдельных блоков и других аспектов представления внешнего вида этих веб-страниц. Основной целью разработки CSS является ограждение и отделение описания логической структуры веб-страницы (которое производится с помощью HTML или других языков разметки) от описания внешнего вида этой веб-страницы (которое теперь производится с помощью формального языка CSS). Такое разделение может увеличить доступность документа, предоставить большую гибкость и возможность управления его представлением, а также уменьшить сложность и повторяемость в структурном содержимом.",
        },
        "js": 
        {
            "img": "icons/skills/js.svg",
            "title": "JS",
            "descr": " JavaScript® (часто просто JS) — это легковесный, интерпретируемый или JIT-компилируемый, объектно-ориентированный язык с функциями первого класса. Наиболее широкое применение находит как язык сценариев веб-страниц, но также используется и в других программных продуктах, например, node.js или Apache CouchDB. JavaScript это прототипно-ориентированный, мультипарадигменный язык с динамической типизацией, который поддерживает объектно-ориентированный, императивный и декларативный (например, функциональное программирование) стили программирования.",
        },
        "react": 
        {
            "img": "icons/skills/react.svg",
            "title": "React",
            "descr": " React (иногда React.js или ReactJS) — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций. React может использоваться для разработки одностраничных и мобильных приложений. Его цель — предоставить высокую скорость разработки, простоту и масштабируемость. В качестве библиотеки для разработки пользовательских интерфейсов React часто используется с другими библиотеками, такими как MobX, Redux и GraphQL",
        },
        "node": 
        {
            "img": "icons/skills/node.js.svg",
            "title": "Node",
            "descr": " Node или Node.js — программная платформа, основанная на движке V8 (компилирующем JavaScript в машинный код), превращающая JavaScript из узкоспециализированного языка в язык общего назначения. Node.js добавляет возможность JavaScript взаимодействовать с устройствами ввода-вывода через свой API, написанный на C++, подключать другие внешние библиотеки, написанные на разных языках, обеспечивая вызовы к ним из JavaScript-кода. Node.js применяется преимущественно на сервере, выполняя роль веб-сервера, но есть возможность разрабатывать на Node.js и десктопные оконные приложения (при помощи NW.js, AppJS или Electron для Linux, Windows и macOS) и даже программировать микроконтроллеры (например, tessel, low.js и espruino). В основе Node.js лежит событийно-ориентированное и асинхронное (или реактивное) программирование с неблокирующим вводом/выводом.",
        },
        "jquery": 
        {
            "img": "icons/skills/jquery.svg",
            "title": "Jquery",
            "descr": " jQuery  — набор функций JavaScript, фокусирующийся на взаимодействии JavaScript и HTML. Библиотека jQuery помогает легко получать доступ к любому элементу DOM, обращаться к атрибутам и содержимому элементов DOM, манипулировать ими. Также библиотека jQuery предоставляет удобный API для работы с AJAX. Разработка jQuery ведётся командой добровольцев на пожертвования.",
        },
        
    }

    const menuList = document.querySelector('.menu__list'),
        menuLink = document.querySelectorAll('.menu__link'),
        mainContent = document.querySelector('.main__content');

    function menuToggleClass (target) {
        menuLink.forEach((link, i) => {
            if (target == link) {
                link.classList.add('menu__link-active');
            } else {
                link.classList.remove('menu__link-active');
            }
        });
    }

    function toggleContent (target) {
        for(let key in dataContent) {
            if (target.getAttribute('data-content') == key) {
                mainContent.firstChild.remove();
                const element = document.createElement('div');
                element.classList.add('main__item');
                element.classList.add('box');

                element.innerHTML = `
                <div class="main__item-icon">
                    <img src="${dataContent[key].img}" alt="${key}">
                </div>
                <h2 class="main__item-title">
                    ${dataContent[key].title}
                </h2>
                <div class="main__item-descr">
                    ${dataContent[key].descr}
                </div>
                `;
                mainContent.append(element);
            }    
        }
    }

    menuList.addEventListener('click', ({target}) => {
        menuToggleClass(target);
        toggleContent (target);
    });

  
    const hamburgerBtn = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeBtn = document.querySelector('.menu__close');

    function toggleMenu() {
        menu.classList.toggle('active');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);  
});
