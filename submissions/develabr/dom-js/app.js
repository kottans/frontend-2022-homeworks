import cities from './cities.js';

// Mobile menu

const iconMenu = document.querySelector('.mobile-menu');
const showMenu = document.querySelector('.navbar');

iconMenu.addEventListener('click', function (e) {
  iconMenu.classList.toggle('icon--active');
  showMenu.classList.toggle('menu--open');
});

// Insert content

const listBtn = document.querySelector('.navbar-list');
const main = document.querySelector('.main');

let [kyiv, lviv, mykolaiv, odesa, ternopil, kharkiv, kherson, chernivtsi] =
  cities;

listBtn.onclick = function (event) {
  let target = event.target;
  if (target && target.classList.contains('navbar-link')) {
    const cityItem = cities.find(({ id }) => id === target.dataset.city);
    addContent(cityItem);
  }
};

const addContent = (item) => {
  main.innerHTML = `
	<section class="main-section">
	<header class="header-content">
		<img class="emblem" src="${item.emblem}" alt="Герб ${item.name}" />
		<span class="state">${item.name}, ${item.state}</span>
	</header>
	<article class="content">
		<figure class="image-wrap">
			<img class="image" src="${item.img}" alt="Київ" />
			<figcaption class="img-caption">
			${item.source}
			</figcaption>
		</figure>
		<div class="description">
			<dl class="char-wrap">
				<dt class="char-wrap-atrr">Засноване</dt>
				<dd class="char-wrap-value">${item.founded}</dd>
				<dt class="char-wrap-atrr">Населення</dt>
				<dd class="char-wrap-value">${item.population}</dd>
				<dt class="char-wrap-atrr">Площа</dt>
				<dd class="char-wrap-value">${item.area}</dd>
				<dt class="char-wrap-atrr">Телефоний код</dt>
				<dd class="char-wrap-value">${item.code}</dd>
				<dt class="char-wrap-atrr">Номери автомобілів</dt>
				<dd class="char-wrap-value">${item.registration}</dd>
				<dt class="char-wrap-atrr">День міста</dt>
				<dd class="char-wrap-value">${item.cityday}</dd>
			</dl>
		</div>
	</article>
</section>
	`;
};
addContent(kyiv);
