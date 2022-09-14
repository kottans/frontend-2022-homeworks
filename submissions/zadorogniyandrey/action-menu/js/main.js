const iconMenu = document.querySelector(".menu__btn");
const menuBody = document.querySelector(".sidebar");
if (iconMenu) {
  iconMenu.addEventListener("click", function () {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
const companies = [
  {
    id: 1,
    title: "Dell Technologies",
    image: "img/1.jpeg.webp",
    description:
      "Сегодня Dell считается компанией ИТ с самым большим доходом в мире. Ее годовая прибыль составляет $108 млрд., а количество клиентов по всему миру превышает отметку в 10 млн. Интересно, что почти 99% компаний из рейтинга Fortune 500 сотрудничают с этим айти гигантом. Dell была основана в 1984 году 19-летним студентом Майклом Деллом. Тогда его главной идеей была продажа ПК с адаптивными конфигурациями — при покупке клиент мог выбирать любые необходимые комплектующие, которые полностью соответствовали бы его индивидуальным потребностям. Со временем предприятие стало одним из самых популярных производителей ПК и оборудования. Но с недавних пор, благодаря своим дочерним компаниям EMC, Pivotal, RSA, Secureworks, Virtustream, и VMware, оно начало больше фокусироваться на ПО, облачных хранилищах, виртуальной реальности, ИТ инфраструктурах, дата-центрах и цифровой безопасности. В 2015 году Dell приобрела EMC за $67 млрд., что до сих пор считается одной из самых дорогих покупок в IT индустрии. Компания работает в 180 странах мира. Штаб-квартира находится в Раунд-Роке, Техас, США.",
  },
  {
    id: 2,
    title: "IBM",
    image: "img/2.jpeg.webp",
    description:
      'IBM — вторая по доходности IT компания в мире с годовым доходом превышающим $67 миллиардов. И это не странно, учитывая, что почти 97% мировых банков и 80% компаний розничной торговли используют продукты и услуги этой фирмы. Компания International Business Machines (IBM) или "Голубой Гигант" (Big Blue), как ее иногда называют, была основана в 1911 году Чарльзом Флинтом. За свою столь длинную историю, IBM подарила нашему миру много отличных изобретений, среди которых дискеты, жесткие диски, магнитная полоса на кредитках, система штрих-кодов и много другое. Кстати, первый банкомат тоже появился благодаря мэйнфрейму компании. Сегодня одни из самых популярных сервисов IBM связаны с облачными и когнитивными вычислениями, IT инфраструктурой, компьютерной безопасностью, интернетом вещей, анализом данных, блокчейном и искусственным интеллектом (ИИ). На протяжении своего существования, у компании было более 130 поглощений и слияний. Но самой дорогой считается сделка с Red Hat стоимостью $34 млрд. IBM имеет представительства в более чем 170 странах мира. Главный офис находится в Армонке, Нью Йорк, США.',
  },
  {
    id: 3,
    title: "HP Enterprise",
    image: "img/3.jpeg.webp",
    description:
      "HP Enterprise появилась в 2015 году после распада Hewlett Packard на две компании: HP Inc., которая занимается производством ПК и оборудования, решениями для 3D принтеров и т.д. HPE, которая фокусируется на бизнес консультировании и финтех услугах. Компания предоставляет услуги в области ПО, SAAS и облачных вычислений. Также она занимается разработкой центров данных, приложений для эффективной работы, системных и финтех решений. Еще HPE имеет финансовый отдел, который занимается архитектурными и инвестиционными решениями, и подразделение корпоративных инвестиций, которые включают исследовательские лаборатории и бизнес-инкубационные проекты. Среди клиентов компании есть как предприятия разных размеров, так и государственные, учебные и медицинские учреждения. Главный офис расположен в Пало-Альто, Калифорния, США.",
  },
  {
    id: 4,
    title: "Accenture",
    image: "img/4.jpeg.webp",
    description:
      'Accenture была создана как технологическое подразделение бухгалтерской фирмы под названием "Arthur Andersen", но в 1989 году она превратилась в независимую компанию. Сегодня это одно из самых крупных предприятий работающих в сфере цифрового маркетинга и предоставляющих бизнес-консультирование, технологические решения, приложения для безопасности и повышения продуктивности и т.д. Но компания не собирается останавливаться на этом. Следующий приоритетный и довольно амбициозный шаг для Accenture – квантовые вычисления. Сегодня компания обслуживает клиентов из более чем 120 стран. Клиентская база Accenture включает даже таких гигантов как Microsoft, Oracle и SAP. И да, если вы не в курсе, название "Accenture" происходит от фразы "акцент на будущем" (the accent of the future).',
  },
  {
    id: 5,
    title: "Cisco Systems",
    image: "img/5.jpeg.webp",
    description:
      "Cisco Systems — пятая самая успешная IT компания в мире по доходу. Ее годовая прибыль уже превысила $52 млрд. Обычно Cisco знают как производителя коммутаторов, роутеров и другого сетевого оборудования. Но с 2015 года компания решила углубиться в инновационные сферы, связанные с ПО. Сегодня Cisco также занимается интернетом вещей, кибербезопасностью, облачными вычислениями, дата-центрами и анализом данных. Компания была основана в 1984 году Леонардом Босаком и Сандрой Лернер. Они создали коммерчески успешный многопротокольный маршрутизатор, который соединял ранее несовместимые компьютеры и был построен на базе стэндфордского Blue Box Router. Интересно, что в 2000 году Cisco была самой дорогой компанией в мире, благодаря так называемому Пузырю доткомов (Dot-com bubble). Рыночная капитализация компании достигла рекордной отметки в $500 млрд. Начиная с 1993 года Cisco поглотила примерно 170 разных предприятий. Сегодня она имеет представительства в более чем 160 странах, а главный офис находится в Сан-Хосе, Калифорния, США.",
  },
];
const menu = document.querySelector(".sidebar__menu");
const main = document.querySelector(".main");
const addmenuItems = (item, menuList) => {
  item.map(function (item) {
    let sideWrap = document.createElement('template');
    sideWrap.innerHTML = `<li class="sidebar__menu__item"><button class="sidebar__btn" data-company = ${item.id}>${item.title}</button></li>`;
    menuList.append(sideWrap.content);
  });
};
const addcontent = (i = 1, arr = companies) => {
  const selectedCompany = arr.find((item) => item.id == i);
  const { title, image, description, } = selectedCompany;
  main.innerHTML = `
        <h1 class="main__title" >${title}</h1>
        <p class="main__description" >${description}</p>
        <img  class="main__img" src=${image} alt=${title}>
    `;
};
const changeContent = (e) => {
  let btn = e.target;
  addcontent(btn.dataset.company);
};
menu.addEventListener("click", changeContent);
addmenuItems(companies, menu);
addcontent();
