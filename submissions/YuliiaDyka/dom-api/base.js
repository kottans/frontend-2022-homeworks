"use strict"

const dataObj = [
{
    id: 0,
    taskName: 'Git Basics',
    taskExesice: [
        {
            url: "https://www.coursera.org/learn/introduction-git-github",
            urlText: "Introduction to Git and GitHub",
            taskText: 'Прослухайте тижні 1 і 2 курсу'
        },
        {
            url: "https://learngitbranching.js.org/",
            urlText: "learngitbranching.js.org",
            taskText: "Пройдіть наступні рівні тут "
        },
        {
            url: null,
            urlText: null,
            taskText: "Створіть репозиторій та назвіть його kottans-frontend."
        },
        {
            url: null,
            urlText: null,
            taskText: "Створіть README.md для репозиторію."
        },
        {
            url: null,
            urlText: null,
            taskText: "Опишіть свої враження від вивченого матеріалу."
        },
        {
            url: null,
            urlText: null,
            taskText: "Надішліть pull-request сюди Kottans/mock-repo пропонуючи зміни."
        },
    ],
}, 

{
    id: 1,
    taskName: 'Linux CLI and Networking',
    taskExesice: [   
        {
            url: "https://linuxsurvival.com/linux-tutorial-introduction/",
            urlText: "Linux Survival (4 modules)",
            taskText: null
        },   
        {
            url: "https://code.tutsplus.com/uk/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177",
            urlText: "HTTP: Протокол, який повинен розуміти кожний веб-розробник - Частина 1",
            taskText: null
        },   
        {
            url: "https://code.tutsplus.com/uk/tutorials/http-the-protocol-every-web-developer-must-know-part-2--net-31155",
            urlText: "HTTP: Протокол, який повинен розуміти кожний веб-розробник - Частина 2",
            taskText: null
        },
    ]
},

{
    id: 2,
    taskName: 'VCS (hello gitty), GitHub and Collaboration',
    taskExesice: [   
        {
            url: "https://www.coursera.org/learn/introduction-git-github",
            urlText: "Introduction to Git and GitHub",
            taskText: "Прослухайте тижні 3 і 4 курсу"
        },   
        {
            url: "https://learngitbranching.js.org/",
            urlText: "learngitbranching.js.org",
            taskText: 'Завершіть курс "Основи. Переміщуємо роботу туди-сюди" та "Через origin – до зірок. Прогресивне використання Git Remotes"'
        },
    ]
},

{
    id: 3,
    taskName: 'Intro to HTML & CSS',
    taskExesice: [   
        {
            url: "https://www.codecademy.com/learn/learn-html",
            urlText: "Learn HTML(Eng)",
            taskText: null
        },   
        {
            url: "https://www.codecademy.com/learn/learn-css",
            urlText: "Learn CSS(Eng)",
            taskText: null
        },   
        {
            url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
            urlText: "Intro to HTML & CSS",
            taskText: "Прослухайте тижні 1 і 2 (до Introduction to Responsive Design) курсу "
        },   
    ]
},

{
    id: 4,
    taskName: 'Responsive Web Design',
    taskExesice: [   
        {
            url: "https://web.dev/i18n/en/responsive-web-design-basics/",
            urlText: "Responsive web design basics",
            taskText: null
        }, 
        {
            url: "https://www.youtube.com/playlist?list=PLM6XATa8CAG5mPV60dMmjMRrHVW4LmV2x",
            urlText: "FLEXBOX. Вчимося верстати на флексах",
            taskText: null
        },
        {
            url: "http://flexboxfroggy.com/",
            urlText: "Flexbox Froggy",
            taskText: null
        },
        {
            url: "https://www.youtube.com/watch?v=GV92IdMGFfA&list=PLM6XATa8CAG5pXQrW_kDaeZb_uIAMNZIm",
            urlText: "CSS Grid Layout",
            taskText: null
        },
        {
            url: "http://cssgridgarden.com/",
            urlText: "Grid Garden",
            taskText: null
        },
    ]
},

{
    id: 5,
    taskName: 'HTML & CSS Practice',
    taskExesice: [   
        {
            url: null,
            urlText: null,
            taskText: 'Розробити випадаюче контекстне меню.',
        },
        {
            url: null,
            urlText: null,
            taskText: 'Ніякого JavaScript, лише HTML/CSS, дозволено використання препроцесорів',
        },
        {
            url: null,
            urlText: null,
            taskText: 'Ніяких зовнішніх бібліотек чи фреймворків',
        },
        {
            url: null,
            urlText: null,
            taskText: 'Підтримка веббраузера: лише Chrome (використовуйте найновіші фічі)',
        },
    ]
},

{
    id: 6,
    taskName: 'JavaScript Basics',
    taskExesice: [   
        {
            url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/week/4",
            urlText: "Вступ до JS",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-javascript/",
            urlText: "Basic JavaScript",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-javascript/",
            urlText: "Basic JavaScript",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/",
            urlText: "ES6 Challenges",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-data-structures/",
            urlText: "Basic Data Structures",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-algorithm-scripting/",
            urlText: "Basic Algorithm Scripting",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/functional-programming/",
            urlText: "Functional Programming",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting",
            urlText: "Algorithm Scripting Challenges ",
            taskText: null
        },
    ]
},

{
    id: 7,
    taskName: 'Document Object Model - practice',
    taskExesice: [   
        {
            url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/week/5",
            urlText: "Document Object Model Manipulation",
            taskText: null
        },
        {
            url: "https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting",
            urlText: "freecodecamp Algorithm Scripting Challenges",
            taskText: null
        },
        {
            url: null,
            urlText: null,
            taskText: 'Практичне завдання: Впровадити інтерактивне side-menu без перезавантаження сторінки. Ви можете вибрати будь-яку тему: покемони, телефони, тощо.',
        },
    ]
},

{
    id: 8,
    taskName: 'Building a Tiny JS World (pre-OOP) - practice',
    taskExesice: [  
        {
            url: "https://github.com/OleksiyRudenko/a-tiny-JS-world",
            urlText: "тут",
            taskText: 'Створіть a tiny JS world model, дотримуючись інструкцій'
        }, 
        {
            url: null,
            urlText: null,
            taskText: 'На цьому етапі вам потрібно виконати лише частину First approach. Ви повернетеся до свого Tiny JS World, щоб покращити його пізніше. Отже, поки що обмежтеся засобами, у яких ви відчуваєте себе впевнено.',
        },
    ]
},

{
    id: 9,
    taskName: 'Object oriented JS - practice',
    taskExesice: [   
        {
            url: "https://www.youtube.com/watch?v=jgCiWIdUZ-s&list=PLM7wFzahDYnEltE-aVGhRHYPwIJn0Xquu&index=40",
            urlText: "ООП 1 частина - Класи",
            taskText: null
        }, 
        {
            url: "https://www.youtube.com/watch?v=e-3GS5-rak8&list=PLM7wFzahDYnEltE-aVGhRHYPwIJn0Xquu&index=46",
            urlText: "ООП 2 частина - Прототипи",
            taskText: null
        },
        {
            url: "https://github.com/kottans/frontend/blob/2022_UA/tasks/js-oop-frogger.md",
            urlText: "Практика - Classic Frogger Game",
            taskText: null
        },
        {
            url: null,
            urlText: null,
            taskText: 'Зареєструйтеся на Codewars, приєднайтеся до клану Kottans і досягніть 7 kyu.',
        },
    ]
},

{
    id: 10,
    taskName: 'OOP exercise - practice',
    taskExesice: [   
        {
            url: "https://github.com/OleksiyRudenko/a-tiny-JS-world",
            urlText: "звідси",
            taskText: 'Удосконалюйте свій tiny JS world model, яку ви форкнули'
        },
        {
            url: null,
            urlText: null,
            taskText: 'На цей раз вам не потрібен форк, працюйте з наявним репо. Git зберігає історію для вас.',
        },
        {
            url: "https://github.com/kottans/frontend/blob/2022_UA/tasks/js-oop-frogger.md",
            urlText: "link",
            taskText: 'Ці матеріали будуть корисні -'
        },
    ]
},

{
    id: 11,
    taskName: 'Offline Web Applications - optional',
    taskExesice: [  
        {
            url: 'https://learn.udacity.com/courses/ud899',
            urlText: 'Offline Web Applications',
            taskText: null,
        }, 
    ]
},

{
    id: 12,
    taskName: 'Memory pair game — real project!',
    taskExesice: [  
        {
            url: null,
            urlText: null,
            taskText: 'У цьому розділі ви створите Memory - Pair Game — карткову гру, в якій всі картки кладуться на поверхню лицьовою стороною вниз, і кожен раз перевертаються по дві картки. Мета гри - знайти пари відповідних карток. Гра закінчується, коли буде підібрана остання пара.',
        },  
        {
            url: "https://css-tricks.com/snippets/javascript/shuffle-array/",
            urlText: 'Shuffle Array',
            taskText: null,
        }, 
        {
            url: "https://www.w3schools.com/css/css3_transitions.asp",
            urlText: 'CSS3 Transitions',
            taskText: null,
        }, 
        {
            url: "https://davidwalsh.name/css-flip",
            urlText: 'Flip Animation',
            taskText: null,
        }, 
    ]
},

{
    id: 13,
    taskName: 'Website Performance Optimization - optional',
    taskExesice: [   
        {
            url: "https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/",
            urlText: 'Front-End Performance Checklist 2021',
            taskText: 'Прочитайте це -',
        }, 
    ]
},

{
    id: 14,
    taskName: 'Friends App - real project!',
    taskExesice: [   
        {
            url: "https://randomuser.me/",
            urlText: 'Random User API ',
            taskText: 'Створіть невеличку сторінку пошуку друзів у соціальних мережах з картками користувачів, пошуком, сортуванням та фільтрацією їх за віком, прізвищем, імям, або чим завгодно, за допомогою',
        }, 
    ]
},

{
    id: 15,
    taskName: 'Welcome to Kottans!',
    taskExesice: [  
        {
            url: null,
            urlText: null,
            taskText: "We are community of developers who love to code and help each other.The course contains basics of front-end development: HTML, CSS, JavaScript, TypeScript and front-end frameworks. We plan to decrease the amount of lectures in favor of collective discussions, team projects & collective work. Nevertheless, doing that on one's own can be challenging when it comes to continuing without support from surrounding people, such situation really beats the motivation, especially when encountering either boring or impossible to do (at first glance) task or illogical aspect of programming language you can't just grasp.",
        },  
    ]
},


];
export default dataObj;
