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

const [kyiv, lviv, mykolaiv, odesa, ternopil, kharkiv, kherson, chernivtsi] =
  cities;

listBtn.onclick = function ({ target }) {
  if (target.classList.contains('navbar-link')) {
    const cityItem = cities.find(({ id }) => id === target.dataset.city);
    addContent(cityItem);
  }
};

const addContent = (city) => {
  const {
    id,
    name,
    state,
    img,
    emblem,
    source,
    population,
    area,
    founded,
    code,
    registration,
    cityday,
  } = city;
  main.innerHTML = `
	<section class="main-section">
	<header class="header-content">
		<img class="emblem" src="${emblem}" alt="Герб ${name}" />
		<span class="state">${name}, ${state}</span>
	</header>
	<article class="content">
		<figure class="image-wrap">
			<img class="image" src="${img}" alt="Київ" />
			<figcaption class="img-caption">
			${source}
			</figcaption>
		</figure>
		<div class="description">
			<dl class="char-wrap">
				<dt class="char-wrap-atrr">Засноване</dt>
				<dd class="char-wrap-value">${founded}</dd>
				<dt class="char-wrap-atrr">Населення</dt>
				<dd class="char-wrap-value">${population}</dd>
				<dt class="char-wrap-atrr">Площа</dt>
				<dd class="char-wrap-value">${area}</dd>
				<dt class="char-wrap-atrr">Телефоний код</dt>
				<dd class="char-wrap-value">${code}</dd>
				<dt class="char-wrap-atrr">Номери автомобілів</dt>
				<dd class="char-wrap-value">${registration}</dd>
				<dt class="char-wrap-atrr">День міста</dt>
				<dd class="char-wrap-value">${cityday}</dd>
			</dl>
		</div>
	</article>
</section>
	`;
};
addContent(kyiv);
