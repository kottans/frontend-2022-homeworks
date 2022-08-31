"use strict";

const listOfGameClasses = document.querySelector(".menu");
const content = document.querySelector(".content");
const initialTitleText = "World of Warcraft";
const initialDescriptionText =
  "World of Warcraft (WoW; укр. Світ Воєнного ремесла) — багатокористувацька рольова онлайн-гра, розроблена компанією Blizzard Entertainment. Це четверта відеогра в серії Warcraft, не враховуючи доповнень та відхиленої Warcraft Adventures: Lord of the Clans. Події ігор серії Warcraft відбуваються у фентезійному всесвіті Warcraft, що вперше був зображений у грі Warcraft: Orcs & Humans в 1994 році. Події World of Warcraft відбуваються через п'ять років після фіналу Warcraft III: The Frozen Throne. Згідно з книгою рекордів Гіннесса, World of Warcraft є найпопулярнішою MMORPG в світі. В прес-релізі Blizzard від 23 січня 2007 року повідомлялося, що кількість передплатників гри склала більше 8 млн. осіб по всьому світу, станом на 7 жовтня 2010 року кількість передплатників перевищила вже 12 млн. World of Warcraft таким чином є найбільш популярною MMORPG в світі, і тримає місце в Книзі рекордів Гіннеса як найпопулярніша MMORPG за кількістю передплатників. Станом на липень 2012 року, Гра зібрала понад 10 млрд. доларів США, що робить World of Warcraft також найбільш касовою відеогрою всіх часів, обійшовши дохід від Call of Duty: Black Ops на 1,5 мільярди доларів. У січні 2014 було оголошено, що протягом всієї роботи гри створено понад 100 млн. акаунтів. Гра отримала декілька нагород, одна з них — Gamespot's Game of the Year Award, як найкраща гра 2004 року. WoW періодично отримує доповнення, які вносять зміни до ігрового процесу та розширюють ігровий світ. Першим з них стало World of Warcraft: The Burning Crusade, випущене 16 січня 2007 року. На 2018 рік останнім є World of Warcraft: Battle for Azeroth, вихід якого відбувся 14 серпня 2018 року.";

const classesArr = [
  {
    name: "Воїн",
    description:
      "Воїни ретельно готуються до бою, а з противником борються віч-на-віч, приймаючи всі удари на свої обладунки. Вони користуються різними бойовими тактиками і застосовують різноманітну зброю, щоб захистити своїх тендітніших союзників. Для максимальної ефективності воїни повинні контролювати свою лють - силу, що живить їх найбільш небезпечні атаки.",
  },
  {
    name: "Паладин",
    description:
      "Паладини б'ються з ворогом віч-на-віч, покладаючись на важкі обладунки та навички цілительства. Міцний щит або дворучна зброя - не так важливо, ніж володіє паладин. Він зможе не тільки захистити соратників від ворожих кігтів і клинків, але й утримає групу на ногах за допомогою зцілення.",
  },
  {
    name: "Мисливець",
    description:
      "Мисливці б'ють ворога на відстані або в ближньому бою, наказуючи вихованцям атакувати, поки самі натягують тятиву, заряджають рушницю або розбивають древковою зброєю. Їхня зброя дієва і поблизу, і здалеку. Крім того, мисливці дуже рухливі. Вони можуть ухилитися від атаки або затримати супротивника, контролюючи поле бою.",
  },
  {
    name: "Розбійник",
    description:
      "Розбійники часто нападають із тіней, починаючи бій комбінацією лютих ударів. У затяжному бою вони вимотують ворога ретельно продуманою серією атак, перш ніж завдати вирішального удару. Розбійнику слід уважно поставитися до вибору противника, щоб оптимально використовувати тактику, і не прогаяти момент, коли треба сховатися або бігти, якщо ситуація складається не на їхню користь.",
  },
  {
    name: "Жрець",
    description:
      "Жерці можуть задіяти потужну цілющу магію, щоб урятувати себе та своїх супутників. Їм підвладні й сильні атакуючі заклинання, але фізична слабкість та відсутність міцних обладунків змушують жерців боятися зближення із противником. Досвідчені жерці використовують бойові та контролюючі здібності, не допускаючи загибелі членів загону.",
  },
  {
    name: "Шаман",
    description:
      "У бою шаман ставить на землю тотеми, що контролюють і завдають шкоди, щоб допомогти союзникам і послабити противника. Шамани можуть вступати в ближній бій, так і атакувати з відстані. Мудрий шаман завжди намагається враховувати сильні та слабкі сторони ворога.",
  },
  {
    name: "Маг",
    description:
      "Маги знищують ворогів таємними заклинаннями. Незважаючи на магічну силу, маги крихкі, не носять важких обладунків, тому вразливі у ближньому бою. Розумні маги за допомогою заклинань утримують ворога на відстані або зовсім знерухомлюють його.",
  },
  {
    name: "Чорнокнижник",
    description:
      "Чорнокнижники знищують ослабленого противника, поєднуючи хвороби і темну магію. Перебуваючи під захистом своїх вихованців, чаклуни розбивають ворога на відстані. Фізично слабкі чаклуни що неспроможні носити важку броню, тому підставляють під ворожі удари своїх слуг.",
  },
  {
    name: "Чернець",
    description:
      "Незалежно від стилю ченці в бою покладаються в основному на свої кулаки і ноги, а зв'язок з внутрішньою енергією ци надає їм сил для використання особливих здібностей. Вони здатні одночасно зцілювати союзників і завдавати шкоди противникам.",
  },
  {
    name: "Друїд",
    description:
      "Друїди можуть підходити до битви по-різному. Вони вільні грати майже будь-яку роль у команді: бути цілителями, танками чи бійцями, але повинні пам'ятати про особливості кожної ролі. Друїд змушений уважно підбирати вигляд до ситуації, оскільки кожен із навичків служить певної мети.",
  },
  {
    name: "Мисливець на демонів",
    description:
      "Мисливці на демонів не користуються важкою бронею, натомість покладаючись на швидкість, яка дає їм можливість стрімко наближатися до супротивника і завдавати йому шкоди одноручною зброєю. Однак іллідары не варто забувати про те, щоб використовувати свою спритність і в захисних цілях, забезпечуючи собі сприятливий результат битви.",
  },
  {
    name: "Лицар смерті",
    description:
      "Лицарі смерті сходяться з супротивником у ближньому бою, доповнюючи удари клинка темною магією, яка робить ворога вразливим або ранить його безбожною енергією. Вони провокують противників, змушуючи їх боротися віч-на-віч і не підпускаючи їх до слабших союзників. Щоб не дати супротивникові вислизнути, лицарі смерті повинні постійно пам'ятати про силу, яку витягують з рун, і відповідним чином спрямовувати свої атаки.",
  },
];

function clearAndAppendContent(...htmlElements){
  this.replaceChildren();
  htmlElements.forEach(htmlElement => {
    this.appendChild(htmlElement)
  });
}

function printClassInformation(event) {
  
  const contentTitle = document.createElement("h2");
  contentTitle.setAttribute("class", "content__title");
  contentTitle.setAttribute("id", "content__title");
  
  const contentDescription = document.createElement("p");
  contentDescription.setAttribute("class", "content__description");
  contentDescription.setAttribute("id", "content__description");
  
  const contentImg = document.createElement("img");
  contentImg.setAttribute("class", "content__img");
  contentImg.setAttribute("id", "content__img");
  
  const contentLinkHome = document.createElement("a");
  contentLinkHome.setAttribute("class", "content__link_back");
  contentLinkHome.setAttribute("id", "content__link_back");
  contentLinkHome.innerText = "Повернутися на головну сторінку";
  
  const className = event.target.closest("a").dataset.gameClass;
  const classObj = classesArr.find(classObj => classObj.name === className)
  contentTitle.innerText = classObj.name;
  contentDescription.innerText = classObj.description;
  contentImg.setAttribute("src","./assets/illustrations/" + classObj.name + ".jpg");
  contentImg.setAttribute("alt", classObj.name);
  
  clearAndAppendContent.call(content, contentTitle, contentDescription, contentImg, contentLinkHome);
}
listOfGameClasses.addEventListener("click", printClassInformation);

function resetContent(event) {
  if (event.target.className === "content__link_back") {
    const updatedTitle = document.createElement("h2");
    updatedTitle.innerText = initialTitleText;
    updatedTitle.setAttribute("class", "content__title");
    updatedTitle.setAttribute("id", "content__title");

    const updatedDescription = document.createElement("p");
    updatedDescription.innerText = initialDescriptionText;
    updatedDescription.setAttribute("id", "content__description");
    updatedDescription.setAttribute("class", "content__description");

    clearAndAppendContent.call(content, updatedTitle, updatedDescription);
  }
}
content.addEventListener("click", resetContent);
