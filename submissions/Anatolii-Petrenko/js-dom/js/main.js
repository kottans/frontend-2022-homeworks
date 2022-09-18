const content = [
  {
    id: 1,
    menuItem: "Cappuccino",
    img: "img/cappuccino.png",
    description:
      "Cappuccino presumably originated in Italy in 1901, shortly after the invention of the espresso machine. However, the first official record of the cappuccino dates from 1930. Cappuccino is usually consumed at breakfast in Italy and continental Europe but is a popular drink at any time of day in other parts of the world.</br></br>The classic cappuccino recipe is made with one part espresso, one part steamed milk, and one part milk foam. People often top it with cinnamon or chocolate powder. It has a smooth, slightly sweet taste, with a lightness from the foam.",
  },
  {
    id: 2,
    menuItem: "Espresso",
    img: "img/espresso.png",
    description:
      "Espresso coffee originated with the invention of the espresso machine. The first espresso machine was a bulk brewer invented in 1884 in Turin by Angelo Moriondo. The first single-serve espresso machine was patented in 1901 by Luigi Bezzera, and was put into production by the Pavoni company in 1905.</br></br>Espresso coffee is made by forcing hot water through fine ground coffee at 9 bars of pressure. Espresso is a strong, concentrated coffee that makes it a great base for milk coffees.",
  },
  {
    id: 3,
    menuItem: "Americano",
    img: "img/americano.png",
    description:
      "Americano is a hot coffee drink made with espresso and hot water. The Americano originated during World War 2, where American soldiers added hot water to espresso to help extend their coffee rations. It’s also said that they were not used to the strong taste of the local espresso coffee.</br></br>Americano coffee is made by pulling a shot of espresso into a large cup, then topping it with hot water. It has a less-concentrated taste than espresso but more complex tasting notes than drip coffee.",
  },
  {
    id: 4,
    menuItem: "Cortado",
    img: "img/cortado.png",
    description:
      "Cortado coffee is a hot coffee made from equal parts of espresso and steamed milk. It originates in the Basque region of Spain, but the exact history and age are unknown. Cortado spread to the United States in the 1960s, where it became known as Gibraltar and is also popular in Latin American countries.</br></br>Cortado is made by pulling a single shot of espresso in a small glass then adding an equal amount of steamed milk, with no foam. This coffee drink has a strong taste that is well-balanced by the milk.",
  },
  {
    id: 5,
    menuItem: "Red Eye",
    img: "img/red-eye.png",
    description:
      "Red Eye is one of the latest coffee-drink inventions. The history of the red eye is mainly unknown, but we know that it originated in the United States. Its name comes from the late-night red-eye flights that need an extra boost of caffeine to recover from.</br></br>Red Eye coffee is made by adding a shot of espresso to a cup of drip coffee. Though not as concentrated as espresso, it has a strong coffee taste and is served without milk. It has a a few variations including lazy eye coffee, black eye coffee, and dead eye aka dripped eye coffee.",
  },
  {
    id: 6,
    menuItem: "Latte",
    img: "img/latte.png",
    description:
      "Latte is one of the most popular milky coffee drinks. The combination of coffee and milk dates back as far as the 17th century, but the latte as we know it today originates in the 1950s. The Caffe Mediterraneum in Berkeley, California, standardized it as a menu item, and it became more common as it spread to Seattle cafes in the 1980s.</br></br>Latte consists of a shot of espresso, topped by two parts steamed milk and a small amount of milk foam. It has a sweeter, creamier taste than a cappuccino due to the higher ratio of steamed milk.",
  },
  {
    id: 7,
    menuItem: "Macchiato",
    img: "img/macchiato.png",
    description:
      'Macchiato is a variation to a simple espresso shot. Macchiato is believed to date back to the 1980s in Italy. The story says that baristas would add a small dollop of foam to help waiters distinguish between plain espresso and espresso with a small amount of milk added.</br></br>A macchiato, also known as "espresso macchiato", is prepared by adding a small amount of steamed milk or milk foam to a shot of espresso. Unlike some other coffee drinks, there is no standard recipe, and the preparation varies from place to place. It has a strong taste of espresso, which is tempered slightly by milk.</br></br>This coffee drink also has a latte variation called the "latte macchiato".',
  },
  {
    id: 8,
    menuItem: "Flat White",
    img: "img/flat-white.png",
    description:
      "Flat white is yet another recently invented coffee drink. The first documented reference to the modern flat white coffee dates back to 1983 in Sydney, Australia, mentioned in the Miller’s Treat cafe review. Still, there are claims that the drink was prepared in cafes in both New Zealand and Australia, as far back as the 1960s.</br></br>Flat white coffee is a double shot of espresso, topped with steamed milk, but no milk foam. It has a stronger coffee taste than a latte because of the extra shot of espresso.",
  },
  {
    id: 9,
    menuItem: "Cafe Au Lait",
    img: "img/cafe-au-lait.png",
    description:
      "Cafe au Leit is coffee with milk. The first reference to the cafe au lait dates back to the late 1600s, when cafes first started appearing in Paris. Cafe au lait is simply the French term for “coffee with milk”, so this would have referred to any coffee served with milk, rather than a particular drink.</br></br>Europeans usually prepare cafe au lait with a shot of espresso topped with warm milk. Still, Americans prepare it with concentrated drip coffee, topped with steamed milk. The taste will depend on the preparation, but it will generally have a milky taste like a latte.",
  },
  {
    id: 10,
    menuItem: "Irish Coffee",
    img: "img/irish-coffee.png",
    description:
      "Irish coffee is coffee with whiskey. Chef Joe Sheridan invented Irish coffee in 1943 who worked at the Fort Payne Airbase. One night his flight was canceled due to bad weather, and Sheridan created the coffee drink to keep the passengers warm.</br></br>Original Irish coffee is prepared with strong brewed coffee, a shot of whiskey, brown sugar, and a whipped cream topping. It has a sweet, creamy taste with strong flavors of coffee and whiskey.",
  },
  {
    id: 11,
    menuItem: "Turkish Coffee",
    img: "img/turkish-coffee.png",
    description:
      "Turkish coffee is a type of coffee drink that originates in Turkey. Coffee was first introduced to Turkey around 1540 by the Turkish governor of Yemen. It was first limited to the ruling classes, where the Sultan’s staff developed the method of preparation. By the 1550s, the general population enjoyed it, and coffee houses began to spread through Turkey.</br></br>Turkish coffee is a method of brewing coffee. You make it by boiling water, sugar, and extra-fine coffee grounds together. Turkish coffee has a robust and sweet flavor, with a thick descriptionure",
  },
  {
    id: 12,
    menuItem: "Italian Coffee",
    img: "img/italian-coffee.png",
    description:
      "Italian coffee has always been highly regarded and is well-known around the world. Italian-style coffee can be made from various beans and origins and is typically roasted on the darker side to give it the strong flavor and body that we have come to expect. Arabica coffee, which has a smoother, more acidic flavor than Robusta coffee and half the caffeine content, was almost entirely used to make Italian coffee.",
  },
];

const navMenu = document.querySelector(".nav__menu");
const mainContent = document.querySelector(".main-content");

function createMenuItems(menuItems) {
  const navMenuItems = menuItems
    .map(
      (item) =>
        `<a id = "${item.id}" href = "#coffee${item.id}" class="menu__item">${item.menuItem}</a>`
    )
    .join("");
  navMenu.innerHTML = navMenuItems;
}

createMenuItems(content);

function showArticles(id, menuItem, img, description) {
  const article = `
	<h1 id = "coffee${id}" class="main-content__header">${menuItem}</h1>
	<img class = "main-content__image" src="${img}" alt="cup of ${menuItem}" />
	<p class="main-content__description">${description}</p>
	<div id="scrollTop" class="scroll-to-top-btn scroll-to-top-btn_hide">
		<a class="scroll-to-top__icon" href="#main-header">^</a>
	</div>`;
  mainContent.innerHTML = article;
}

const changeArticle = function (event) {
  const { id, menuItem, img, description } = content.find(
    (obj) => obj.id === Number(event.target.id)
  );

  showArticles(id, menuItem, img, description);
};

navMenu.addEventListener("click", changeArticle);
