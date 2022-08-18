'user strict';

const content = [
    {
        title : "Бразилія",
        subtitle : "Фернандо де Норонья",
        imgSrc : "images/Brazil.jpg",
        imgAlt : "Brazil",
        paragraphs: [
            "Головний острів, Фернанду-ді-Норонья, за яким отримав назву весь архіпелаг, має площу 26 км² і розміри 10 км завдовжки і 3,5 км завширшки. Його базою є масивна вулканічна формація за 750 м під рівнем моря. Головний острів забирає 91 % загальної площі архіпелагу, решта припадає на острови Рата, Села-Жинета, Кабелуда, Сан-Жозе і острівці Лену і Віува.", 
            "Клімат тропічний із двома чітко визначеними сезонами: дощовим — з січня по серпень, і посушливим протягом решти року. На жаль, первинна рослинність на островах була в минулому знищена, і зараз вони покриті заростями чагарників і в'юнків. Численних туристів приваблює багата флора і фауна довколишнього моря, зокрема морські черепахи і дельфіни, а також різноманіття морських птахів."
        ]
    },
    {
        title : "Гонконг",
        subtitle : "Будда, острів Лантау",
        imgSrc : "images/HongKong.jpg",
        imgAlt : "HongKong Budha photo",
        paragraphs : [
            "Основна визначна пам'ятка китайського району Гонконг – великий Будда. Цьому пам'ятнику в тутешніх місцях приділено особливу увагу. Його будівництво почалося 1990-го року і тривало протягом трьох років. 1993-го відбулося офіційне відкриття статуї, зробленої з бронзи. В даний час вона, як і раніше, зберігає звання найбільшої у всьому світі. Обличчя її вкрите золотом, що додає витонченості до цього створення.",
            "Висота статуї – 34 метри, а вона знаходиться на 482-метровій горі. Дістатися цього туристичного об'єкта можна, подолавши 268 сходинок. Зробивши це, ви максимально наблизитесь до пам'ятника. Перед самою триповерховою статуєю можна помітити 6 невеликих статуй, що підносять їй підношення. Вважається, що це гонконгське надбання символізує зв'язок між людиною і природою."
        ]
    },
    {
        title : "Китай",
        subtitle : "Національний парк Цзючжайгоу",
        imgSrc : "images/China.jpg",
        imgAlt : "China national park",
        paragraphs : [
            "Національний парк Цзючжайгоу у перекладі. «Долина дев'яти сіл» — заповідник на півночі провінції Сичуань у центральному Китаї. Відомий своїми багаторівневими водоспадами та кольоровими озерами, оголошений ЮНЕСКО всесвітньою спадщиною у 1992 році. Належить до категорії V (заповідні ландшафти) із систематизації заповідних зон IUCN.",
            "Цзючжайгоу складається з трьох долин, що утворюють разом Y-подібну фігуру. Ущелини Жицзе і Цзечава спрямовані з півдня і сходяться в центрі, де вони утворюють ущелину Шучжен, спрямовану північ до гирла долини. Район цих ущелин пов'язаний 55 км доріг для рейсових автобусів, а також гатями та маленькими павільйонами. Гаті зазвичай перебувають на протилежній автомобільній дорозі стороні озер, що захищає їх від руйнування колесами автобусів."
        ]
    },
    {
        title : "США",
        subtitle : "Національний заповідник Гіффорд Пінчот, Вашингтон",
        imgSrc : "images/USA_gifford.jpg",
        imgAlt : "USA gifford nature reserve",
        paragraphs : [
            "Національний Вулканічний Пам'ятник Гіффорд Пінчот (Gifford Pinchot) займає величезну площу – 5537,3 квадратних кілометрів у штаті Вашингтон, США. На території природоохоронного об'єкта знаходяться гори та ліси, озера та річки, але головним об'єктом все ж таки залишається вулкан Сент-Хеленс. Саме Вулкан Святої Олени дав Національному парку таку незвичайну назву.",
            "На околицях вулкана Сент-Хеленс розташована Лава поляна – величезна територія, що зберегла наслідки багатовікових вивержень. Багатосотметрові лавові труби тут є сусідами з глибокими звивистими печерами. Найвідоміша – Мавпа печера, куди туристи допускаються лише у спеціальному спелеологічному спорядженні. Мавпа печера – має найбільшу протяжність серед лавових печер США – майже 400 метрів."
        ]
    },
    {
        title : "Канада",
        subtitle : "Озеро Морейн",
        imgSrc : "images/Moraine_Lake_Canada.jpg",
        imgAlt : "Moraine Lake Canada",
        paragraphs : [
            "Озеро Морейн підживлюється льодовиком і досягає свого повного наповнення лише у другій половині червня. Головною принадою озера Морейн є синій колір води. Коли воно наповнене, в ньому відбиваються різні відтінки синього кольору через заломлення світла на кам'янистому дні озера.",
            "Поверхня озера Морейн відображає, як в дзеркалі, десять величезних канадських піків, і це робить його одним з найкрасивіших місць в Канаді. Це одне з найбільш часто фотографованих місць в Канаді, що дуже славиться красою мальовничих місць і своїми пішохідними екскурсіями."
        ]
    },
    {
        title : "Франція",
        subtitle : "Етрета, Нормандія",
        imgSrc : "images/etretat_normandy_france.jpg",
        imgAlt : "etretat normandy france",
        paragraphs : [
            "Étretat (Етрета) - невеликий курорт з прекрасними гальковими пляжами на узбережжі Алебастрового Ла Манша, одна з головних визначних пам'яток Нормандії, на півночі Франції. Він розташований біля самого пляжу, де води Англійського каналу сформували дивовижну красу прямовисні скелі з природними арками — один із найкрасивіших краєвидів Франції.",
            ""
        ]
    },
    {
        title : "Гренландія",
        subtitle : "Льодяний каньйон",
        imgSrc : "images/Grenland_canyon.jpg",
        imgAlt : "Greenland canyon",
        paragraphs : [
            "Цей воістину дивовижний острів притягує мандрівників з усього світу, як магніт.  Аналогія банальна, але краще вигадати складно. Значна частина Гренландії справді схована під надійним щитом із льоду, який останнім часом починає активно танути. Це результат глобального потепління, на яке вже багато років намагаються звернути увагу багато громадських організацій.",
            "У льодовиках утворюються численні каньйони - їх краса просто приголомшує. Таке враження, що природа, як найталановитіший художник на цій планеті, малює своїм пензлем хитромудрі, часом навіть сюрреалістичні картини."
        ]
    },
    {
        title : "Норвегія",
        subtitle : "Місто - Олесунн",
        imgSrc : "images/Alesund_norway.jpg",
        imgAlt : "Alesund norway",
        paragraphs : [
            "О́лесунн (норв. Ålesund) — місто і порт на заході Норвегії. Розташоване на північ від гирла фіорду Стур. Місто розкинулося на декількох островах, а саме — Норвьойя, Аспьойя, Гейсса (Гесса) та Окснойя, які є з'єднані мостами. За легендою, поселення бере свій початок у 9 столітті коли Ролло (Рольф) заснував поблизу маєток, де мешкав війт. Статус міста Олесунн отримав в 1848 р. Після того як місто зазнало пожежі в 1904 р., воно було відбудоване у оригінальному стилі арт-нуво.",
            "Олесунн — регіональний торговий центр і туристична база для маршрутів в регіонах Суннмьоре, долині Норанґ, льодовиках Ойє та островах Рунде та Ґіске. В місті знаходиться найбільша риболовна гавань Норвегії, пристановище для риболовних трейлерів що виловлюють тріску та палтус з виду камбалових. Разом з Тромсьо, Олесунн є осередком ловлі арктичних тюленів."
        ]
    }
];

const mainContentBlock = document.querySelectorAll('.main__content-block');
const navigationButton = document.querySelectorAll('.main__navigation-button');

const humbergerBtn = document.querySelector('.header__hamburger'),
        adaptiveTabsMenu = document.querySelector('.adaptive'),
        adaptiveNavTabsBtn = document.querySelectorAll('.adaptive__navigation-button'),
        body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', startEventsForPage());

function startEventsForPage() {
    createElements();
    hamburgerMenu();
    currentTabButton('main__navigation-button_active', '.main__navigation-list');
    mainContentBlock[0].classList.add('main__content-active');
    
    function currentTabButton(tabSelector, parrentSelector) {
        const parrentMenuWrap = document.querySelector(parrentSelector);

        navigationButton[0].classList.add('main__navigation-button_active');

        parrentMenuWrap.addEventListener('click', e => {
            let index = +e.target.getAttribute("data-number");
            
            navigationButton.forEach(item => {
                item.classList.remove('main__navigation-button_active');
            });
            mainContentBlock.forEach(item => {
                item.classList.remove('main__content-active');
            });

            e.target.classList.add(tabSelector);

            deleteInnerHtml();

            createElements(index);
            mainContentBlock[index].classList.add('main__content-active');
        });
    };

    function createElements (index = 0) {
        mainContentBlock[index].innerHTML = `
            <h2 class="main__content-title">${content[index].title}</h2>
            <p class="main__content-subtitle">${content[index].subtitle}</p>
            <img class="main__content-image" src="${content[index].imgSrc}" alt="${content[index].imgAlt}">
            <p class="main__content-descr">${content[index].paragraphs[0]}</p>
            <p class="main__content-descr">${content[index].paragraphs[1]}</p>
        `;
    };

    function deleteInnerHtml() {
        mainContentBlock.forEach(element => {
            element.innerHTML = "";
        });
    };

    function hamburgerMenu() {
        adaptiveNavTabsBtn[0].classList.add('adaptive__navigation-button__active');
        openContentWithTab('adaptive__navigation-button__active','adaptive__navigation-list');

        humbergerBtn.addEventListener('click', e => {
            e.currentTarget.classList.toggle('header__hamburger-active');
            body.classList.toggle('body__active');
            adaptiveTabsMenu.classList.toggle('adaptive__active');
        });
    };

    function openContentWithTab(activeTabSelector, parrentSelector) {
        const parrentMenuWrap = document.querySelector('.' + parrentSelector);

        parrentMenuWrap.addEventListener('click', e => {
            let index = +e.target.getAttribute("data-number");
                mainContentBlock.forEach(element => {
                    element.classList.remove('main__content-active');
                });
                adaptiveNavTabsBtn.forEach(element => {
                    element.classList.remove(activeTabSelector);
                });

                deleteInnerHtml();
                createElements(index);

                adaptiveTabsMenu.classList.toggle('adaptive__active');
                body.classList.toggle('body__active');

                humbergerBtn.classList.remove('header__hamburger-active');

                mainContentBlock[index].classList.add('main__content-active');
                adaptiveNavTabsBtn[index].classList.add(activeTabSelector);
        });
    };
}
