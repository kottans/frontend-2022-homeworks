/* Данные о боссах */
const bosses = [
  {
    id: 1,
    name: "Демон Прибежища",
    image: "demon.webp",
    description:
      "Демон, который сторожит выход из Прибежища. Самый первый босс, которого встречает игрок на своем пути. У босса существует две известные альтернативные версии: Бродячий Демон и Мудрый демон Огня.",
    video: "LFOq3V9JAAc",
  },
  {
    id: 2,
    name: "Горгулья",
    image: "gargoyles.webp",
    description:
      "В качестве босса в Уезде Нежити на крыше колокольни. Как только игрок отнимет горгулье половину здоровья, появится вторая. Встречаются в Анор Лондо в качестве мини-боссов. Если у вас не был добыт Хвост-топор, то эти горгульи — второй шанс на его получение",
    video: "1ipsOo8vF-I",
  },
  {
    id: 3,
    name: "Квилег Ведьма Хаоса",
    image: "quelaag.webp",
    description:
      "Квилег — одна из дочерей ведьмы Изалита. Вместе со своей сестрой бежала из Изалита, когда город охватило Пламя Хаоса. К несчастью, их затронули мутации, хотя и не полностью. Нижние части тел сестер превратились в огромных пауков. Квилег обосновалась в нижней части Чумного Города, где ей и её сестре стала служить зараженная Черногноем нежить.",
    video: "utarxElVBFA",
  },
  {
    id: 4,
    name: "Сиф Великий Волк",
    image: "sif.webp",
    description:
      "Страж могилы Арториаса, одного из Четырёх рыцарей Гвина. Сиф, будучи ещё маленьким, сопровождал Арториаса во время его путешествия в Олачиль. Вместе они вошли в Бездну, но были окружены фантомами, похожими на человечность. Арториас использовал магию щита для создания защитного барьера и, оставив Сифа в безопасности, продолжил путь. А маленького Сифа спасает герой из будущего, приведённый к волчонку молодой Альвиной (или он выбирается сам после победы над Бездной, если игрок его не найдёт).",
    video: "8nF1VdkF6sQ",
  },
  {
    id: 5,
    name: "Вихрь",
    image: "pinwheel.webp",
    description:
      "Летающий некромант в трёх масках, укравший силу Повелителя Могил и правящий Катакомбами.",
    video: "IkiAV2kjVsk",
  },
  {
    id: 6,
    name: "Железный голем",
    image: "golem.webp",
    description:
      "Голема создали боги, чтобы он охранял проход в Анор Лондо. И это древнее создание убило множество героев, которые пытались пройти в город богов. Голем не является живым существом. Это просто груда доспехов, внутри которых заключено его ядро, сделанное из костей драконов.",
    video: "uGkxraomAas",
  },
  {
    id: 7,
    name: "Орнштейн и Смоуг",
    image: "ornstein.webp",
    description:
      "Эти боссы находятся в соборе Анор Лондо. Попасть к ним можно только через парадный вход, охраняемый Королевскими стражами, в центральный зал, где они в свою очередь охраняют покои Гвиневер Принцессы Света.",
    video: "vvqpaVSSblc",
  },
  {
    id: 8,
    name: "Ложе Хаоса",
    image: "chaos.webp",
    description:
      "Ложе Хаоса создала Ведьма Изалита, когда пыталась воссоздать Первое Пламя, но, создав его, не смогла контролировать. Ложе поглотило её, а её детей превратило в ужасных мутантов. Можно встретить некоторых из них: Квилег Ведьма Хаоса, Прекрасная Госпожа, Квилана. Также Ложе стало своеобразным инкубатором для всевозможных демонов хаоса. Отсюда родом такие как: Демон Капра, Демон Прибежища, Демон-Телец и большое количество подобных им монстров.",
    video: "tkjANPFfEXQ",
  },
  {
    id: 9,
    name: "Нагой Сит",
    image: "seath.webp",
    description:
      "Сит предал свой род и помог Гвину и другим Повелителям уничтожить род драконов. Причина в том, что он родился с дефектом — у него не было чешуи бессмертия как у других драконов, а значит рано или поздно он должен был умереть. Позже он стал герцогом и частью королевской семьи, а также получил осколок великой души от Гвина.",
    video: "Zbr6U1xujOI",
  },
  {
    id: 10,
    name: "Четыре Короля",
    image: "kings.webp",
    description:
      "Желание силы и власти стало причиной их падения во тьму, в Бездну, через которую когда-то прошёл легендарный Арториас Путник Бездны. Тёмный изначальный змей Каас даровал Четырём королям силу Повелителя Тьмы, которая способна высасывать человечность. Жители Нового Лондо были принесены в жертву Бездне, не обретя покоя и став Призраками, рыцари же стали Тёмными духами на страже затопленных руин.",
    video: "UgccH5a4QZE",
  },
  {
    id: 11,
    name: "Нито Повелитель Могил",
    image: "nito.webp",
    description:
      "Нито — первый из мёртвых, повелитель смерти. На заре Эры Огня заполучил одну из Великих Душ и в войне против Драконов, Нито насылал миазмы болезней и смерти на своих врагов.",
    video: "j8EUZKuPzAA",
  },
  {
    id: 12,
    name: "Гвин Повелитель Пепла",
    image: "gwyn.webp",
    description:
      "Гвин был повелителем Света и отцом минимум четверых детей: первенца Солнца, Гвиневер, Гвиндолина и Филианоры. Йоршка, называющая себя сестрой Гвиндолина, также может быть ещё одной дочерью Гвина. Гвин и его дети были богами, однако первенец был позже лишен божественного статуса в наказание за заключение мира с Древними Драконами.",
    video: "aM_OOcZVU9s",
  },
];

/* Создание меню с добавлением прослушивания события нажатия */
function createMenu() {
  const menu = document.querySelector(".menu");

  menu.innerHTML = bosses.reduce(
    (html, boss) =>
      html +
      `<a href="#" class="menu__item${
        completed.includes(boss.id) ? " completed" : ""
      }" id="menu_boss_${boss.id}" data-bossid="${boss.id}">${boss.name}</a>`,
    ""
  );
  menu.addEventListener("click", (e) => {
    if (e.target.dataset.bossid != undefined) {
      showBoss(parseInt(e.target.dataset.bossid));
    }
  });
}

/* Показ инфорации о выбранном боссе */
function showBoss(id) {
  const content = document.querySelector(".content");
  const boss = bosses.find((obj) => obj.id === id);
  content.innerHTML = `
  <h1 class="content__title">${boss.name}</h1>
  <img class="content__image" src="images/${boss.image}" alt="${boss.name}" />
  <p class="content__description">${boss.description}</p>
  <div class="content__video">
    <h3 class="content__subtitle">Видео</h3>
    <iframe
      width="100%"
      height="100%"
      src="${makeVideoLink(boss.video)}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  `;
  selectMenuItem(id); // Изменение активного элемента меню
  checkIsCompleted(id); // Если босс проейден, его нужно подсветить
  document
    .querySelector("h1")
    .addEventListener("click", () => toggleCompletedBoss(id)); // Добавление обработчика нажатия на имя босса
}

/* Изменение активного элемента меню */
function selectMenuItem(id) {
  const activeElement = document.querySelector(".menu__item.active");
  if (activeElement) {
    activeElement.classList.remove("active");
  }
  document.querySelector(`[data-bossid="${id}"]`).classList.add("active");
}

/* Получение элемента меню по id */
function getMenuItem(id) {
  return document.getElementById(`menu_boss_${id}`);
}

/* Генерация ссылки для встраивания видео */
function makeVideoLink(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

/* Получение из куков списка пройденных боссов */
function getCookie() {
  let matches = document.cookie.match(new RegExp("(?:^|; )completed=([^;]*)"));
  return matches
    ? decodeURIComponent(matches[1])
        .split(",")
        .map((id) => parseInt(id))
    : [];
}

/* Сохранение списка в куках */
function setCookie() {
  document.cookie = "completed=" + encodeURIComponent(completed);
}

/* Проверка, пройден ли босс. Если да, изменение цвета его отображения */
function checkIsCompleted(id) {
  const content = document.querySelector(".content");
  if (completed.includes(id)) {
    content.classList.add("completed");
    getMenuItem(id).classList.add("completed");
  } else {
    content.classList.remove("completed");
    getMenuItem(id).classList.remove("completed");
  }
}

/* Обработчик нажатия на имя босса для его добавления или удаления из пройденных */
function toggleCompletedBoss(id) {
  if (completed.includes(id)) {
    completed.splice(completed.indexOf(id), 1);
    showModal();
  } else {
    completed.push(id);
    showModal(id);
  }
  setCookie();
  setTimeout(() => {
    checkIsCompleted(id);
  }, 3000);
}

/* Показывает надпись во весь экран */
function showModal(bossId = null) {
  const wrapper = document.querySelector(".wrapper");
  const modal = document.createElement("div");
  if (bossId) {
    const boss = bosses.find((obj) => obj.id === bossId);
    modal.innerHTML = `${boss.name} повержен`;
    modal.classList.add("modal", "boss_defeted");
  } else {
    modal.innerHTML = "Вы погибли";
    modal.classList.add("modal", "you_died");
  }
  wrapper.insertAdjacentElement("beforeend", modal);
  setTimeout(() => {
    modal.classList.add("show");
  }, 0);
  setTimeout(() => {
    modal.classList.remove("show");
    modal.classList.add("hide");
  }, 3000);
  setTimeout(() => {
    modal.remove();
  }, 5000);
}

const completed = getCookie();
createMenu();

showBoss(1);
