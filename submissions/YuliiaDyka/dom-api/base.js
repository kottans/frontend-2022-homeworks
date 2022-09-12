"use strict"

const dataObj = [
{
    taskName: 'Git Basics',
    taskExesice: [
        'Прослухайте тижні 1 і 2 курсу <a class="link tomato" href="https://www.coursera.org/learn/introduction-git-github">Introduction to Git and GitHub',
        'Пройдіть наступні рівні тут <a class="link tomato" href="https://learngitbranching.js.org/">learngitbranching.js.org:</a>',
        "Створіть репозиторій та назвіть його kottans-frontend.",
        "Створіть README.md для репозиторію.",
        "Опишіть свої враження від вивченого матеріалу.",
        "Надішліть pull-request сюди Kottans/mock-repo пропонуючи зміни.",
    ],
}, 

{
    taskName: 'Linux CLI and Networking',
    taskExesice: [   
        '<a class="link tomato" href="https://linuxsurvival.com/linux-tutorial-introduction/">Linux Survival (4 modules)</a> ',
        '<a class="link tomato" href="https://code.tutsplus.com/uk/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177">HTTP: Протокол, який повинен розуміти кожний веб-розробник - Частина 1</a>',
        '<a class="link tomato" href="https://code.tutsplus.com/uk/tutorials/http-the-protocol-every-web-developer-must-know-part-2--net-31155">HTTP: Протокол, який повинен розуміти кожний веб-розробник - Частина 2</a>',
    ]
},

{
    taskName: 'VCS (hello gitty), GitHub and Collaboration',
    taskExesice: [   
        'Прослухайте тижні 3 і 4 курсу <a class="link tomato" href="https://www.coursera.org/learn/introduction-git-github">Introduction to Git and GitHub</a>',
        'Пройдіть "Основи. Переміщуємо роботу туди-сюди" та "Через origin – до зірок. Прогресивне використання Git Remotes" тут <a class="link tomato" href="https://learngitbranching.js.org/">learngitbranching.js.org:</a>',
    ]
},

{
    taskName: 'Intro to HTML & CSS',
    taskExesice: [   
        'Прослухайте тижні 1 і 2 (до Introduction to Responsive Design) курсу <a class="link tomato" href="https://www.coursera.org/learn/html-css-javascript-for-web-developers">Intro to HTML & CSS</a> ',
        '<a class="link tomato" href="https://www.codecademy.com/learn/learn-html">Learn HTML(Eng)</a>',
        '<a class="link tomato" href="https://www.codecademy.com/learn/learn-css">Learn CSS(Eng)</a> ',
    ]
},

{
    taskName: 'Responsive Web Design',
    taskExesice: [   
        '<a class="link tomato" href="https://web.dev/i18n/en/responsive-web-design-basics/">Responsive web design basics</a> ',
        '<a class="link tomato" href="https://www.youtube.com/playlist?list=PLM6XATa8CAG5mPV60dMmjMRrHVW4LmV2x">FLEXBOX. Вчимося верстати на флексах</a> ',
        '<a class="link tomato" href="http://flexboxfroggy.com/">Flexbox Froggy</a> ',
        '<a class="link tomato" href="https://www.youtube.com/watch?v=GV92IdMGFfA&list=PLM6XATa8CAG5pXQrW_kDaeZb_uIAMNZIm">CSS Grid Layout</a> ',
        '<a class="link tomato" href="http://cssgridgarden.com/">Grid Garden</a> ',
    ]
},

{
    taskName: 'HTML & CSS Practice',
    taskExesice: [   
        'Розробити випадаюче контекстне меню.',
        'Ніякого JavaScript, лише HTML/CSS, дозволено використання препроцесорів',
        'Ніяких зовнішніх бібліотек чи фреймворків',
        'Підтримка веббраузера: лише Chrome (використовуйте найновіші фічі)',
        `Очікується, що попап матиме три стани залежно від дій користувача:
        <ul>
            <li class="task__item">Початковий стан: попап не видно</li>
            <li class="task__item">Після натискання на кнопку popup-button попап стає видимим або прихованим, якщо воно вже відкрите</li>
            <li class="task__item">Натисніть кнопку "More", щоб додати ще від 3 до 10 іконок і робить вміст попапу доступним для скролу</li>
        </ul>`,
    ]
},

{
    taskName: 'JavaScript Basics',
    taskExesice: [   
        '<a class="link tomato" href="https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/week/4">Вступ до JS</a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-javascript/">Basic JavaScript </a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/">ES6 Challenges </a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-data-structures/">Basic Data Structures</a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/">Basic Algorithm Scripting</a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/functional-programming/">Functional Programming</a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting">Algorithm Scripting Challenges </a> ',
    ]
},

{
    taskName: 'Document Object Model - practice',
    taskExesice: [   
        '<a class="link tomato" href="https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/week/5">Document Object Model Manipulation</a> ',
        '<a class="link tomato" href="https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting">freecodecamp Algorithm Scripting Challenges</a> ',
        'Практичне завдання: Впровадити інтерактивне side-menu без перезавантаження сторінки. Ви можете вибрати будь-яку тему: покемони, телефони, тощо.',
    ]
},

{
    taskName: 'Building a Tiny JS World (pre-OOP) - practice',
    taskExesice: [   
        'Створіть a tiny JS world model, дотримуючись інструкцій <a class="link tomato" href="https://github.com/OleksiyRudenko/a-tiny-JS-world">тут</a> ',
        'На цьому етапі вам потрібно виконати лише частину First approach. Ви повернетеся до свого Tiny JS World, щоб покращити його пізніше. Отже, поки що обмежтеся засобами, у яких ви відчуваєте себе впевнено.',
    ]
},

{
    taskName: 'Object oriented JS - practice',
    taskExesice: [   
        '<a class="link tomato" href="https://www.youtube.com/watch?v=jgCiWIdUZ-s&list=PLM7wFzahDYnEltE-aVGhRHYPwIJn0Xquu&index=40">ООП 1 частина - Класи</a> ',
        '<a class="link tomato" href="https://www.youtube.com/watch?v=e-3GS5-rak8&list=PLM7wFzahDYnEltE-aVGhRHYPwIJn0Xquu&index=46">ООП 2 частина - Прототипи</a> ',
        '<a class="link tomato" href="https://github.com/kottans/frontend/blob/2022_UA/tasks/js-oop-frogger.md">Практика - Classic Frogger Game</a>',
        'Зареєструйтеся на Codewars, приєднайтеся до клану Kottans і досягніть 7 kyu.',
    ]
},

{
    taskName: 'OOP exercise - practice',
    taskExesice: [   
        'Удосконалюйте свій tiny JS world model, яку ви форкнули <a class="link tomato" href="https://github.com/OleksiyRudenko/a-tiny-JS-world">звідси</a> ',
        'На цей раз вам не потрібен форк, працюйте з наявним репо. Git зберігає історію для вас.',
        'Ці матеріали будуть корисні - <a class="link tomato" href="https://github.com/kottans/frontend/blob/2022_UA/tasks/js-oop-frogger.md">link</a> ',
    ]
},

{
    taskName: 'Offline Web Applications - optional',
    taskExesice: [   
        'Удосконалюйте свій tiny JS world model, яку ви форкнули <a class="link tomato" href="https://learn.udacity.com/courses/ud899">Offline Web Applications</a> ',
    ]
},

{
    taskName: 'Memory pair game — real project!',
    taskExesice: [   
        'У цьому розділі ви створите Memory - Pair Game — карткову гру, в якій всі картки кладуться на поверхню лицьовою стороною вниз, і кожен раз перевертаються по дві картки. Мета гри - знайти пари відповідних карток. Гра закінчується, коли буде підібрана остання пара.',
        `Деякі з наведених нижче посилань можуть бути корисними:
        <ul> 
            <li>
                <a class="link tomato" href="https://css-tricks.com/snippets/javascript/shuffle-array/">Shuffle Array</a>
            </li>
            <li>
                <a class="link tomato" href="https://www.w3schools.com/css/css3_transitions.asp">CSS3 Transitions</a>
            </li>
            <li>
                <a class="link tomato" href="https://davidwalsh.name/css-flip">Flip Animation</a>
            </li>
        </ul>`,
    ]
},

{
    taskName: 'Website Performance Optimization - optional',
    taskExesice: [   
        'Прочитайте це - <a class="link tomato" href="https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/">Front-End Performance Checklist 2021</a> ',
    ]
},

{
    taskName: 'Friends App - real project!',
    taskExesice: [   
        `Створіть невеличку сторінку пошуку друзів у соціальних мережах з картками користувачів, пошуком, сортуванням та фільтрацією їх за віком, прізвищем, ім'ям, або чим завгодно, за допомогою <a class="link tomato" href="https://randomuser.me/">Random User API </a>`,
    ]
},

{
    taskName: 'Welcome to Kottans!',
    taskExesice: [   
        "We are community of developers who love to code and help each other.The course contains basics of front-end development: HTML, CSS, JavaScript, TypeScript and front-end frameworks. We plan to decrease the amount of lectures in favor of collective discussions, team projects & collective work. Nevertheless, doing that on one's own can be challenging when it comes to continuing without support from surrounding people, such situation really beats the motivation, especially when encountering either boring or impossible to do (at first glance) task or illogical aspect of programming language you can't just grasp.",
    ]
},


];
export default dataObj;
