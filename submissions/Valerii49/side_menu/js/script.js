"use strict";
import sitesArr from '../data/attractions.js';

document.addEventListener("DOMContentLoaded", InitPage(sitesArr));

function InitPage(data) {
	const menuList = document.querySelector('.menu__list');
	const h1Link = document.querySelector('.h1__link');
	//**********Init Sidebar**********
	const menuLinks = data
		.slice(1)
		.map(({ id, sightName }) => `<li><a href="#" class="menu__link" data-id="${id}">${sightName}</a></li>`)
		.join('');
	menuList.innerHTML = menuLinks;
	//**********for hover effect**********
	const menuItems = document.querySelectorAll('.menu__link');
	// running letters
	const stringToSpans = (item, delay) => {
		item.innerHTML = item.innerText
			.split('')
			.map((letter, i) => `<span style="transition-delay:${i * delay}ms;">${letter}</span>`)
			.join('');
	}
	stringToSpans(h1Link, 10);
	menuItems.forEach(element => {
		stringToSpans(element, 30);
	});
	// 
	const mediaQuery = window.matchMedia('(min-width: 48rem)');
	mediaQuery.addEventListener('change', (e) => {
		stringToSpans(h1Link, 10);
		mediaQuery.matches && menuItems.forEach(element => { stringToSpans(element, 30) });
	});
	const page = document.querySelector('.page');

	page.addEventListener("click", handlerClick);
}

function handlerClick(e) {
	const targetElement = e.target;
	const currentItem = targetElement.closest('.menu__link') ?? targetElement.closest('.h1__link');

	const currentImage = targetElement.closest('.main-module__image-gallery');

	if (currentItem) {
		if (document.documentElement.closest(".menu-open")) {
			menuBurgerToggle();
		}
		const activeItem = document.querySelector('._active');
		if (currentItem !== activeItem) {
			activeItem.classList.remove('_active');
			currentItem.classList.add('_active');
			const itemId = currentItem.dataset.id - 1;
			buildPage(sitesArr[itemId]);
		}
	}
	else if (currentImage) {
		const activeImage = document.querySelector('._active-image');
		if (currentImage !== activeImage) {
			activeImage.classList.remove('_active-image');
			currentImage.classList.add('_active-image');
			const itemIdImage = currentImage.dataset.idImage - 1;
			const menuItemActivId = document.querySelector('._active').dataset.id - 1;
			loadHighResImage(sitesArr[menuItemActivId], itemIdImage);
		}
	}
};

function buildPage(data) {
	const pageMain = document.querySelector('.main-module');
	let lowResImages = ``;
	data.gallery.lowRes.forEach((element, index) => {
		lowResImages +=
			`<a data-id-image="${index + 1}" class="main-module__image-gallery" href="#">
			 <img src=${element} alt=${data.gallery.alternateText[index]}>
		 </a>`});
	lowResImages = lowResImages.slice(0, 54) + ' _active-image' + lowResImages.slice(54);
	const mainModuleInner =
		`<div class="main-module__title">${data.sightName}</div>
		<div class="main-module__images"><div class="main-module__image"></div><div class="main-module__gallery">${lowResImages}</div></div>
`;
	pageMain.innerHTML = mainModuleInner;
	loadHighResImage(data);
};

async function loadHighResImage(data, item = 0) {
	document.querySelector('.main-module__gallery').style.pointerEvents = 'none';

	const styleVar = document.querySelector('.main-module__image').style;
	styleVar.setProperty('--display-after', 'block');

	try {
		const url = data.gallery.highRes[item];;

		const blobResult = await getImage(url);
		const imageUrl = URL.createObjectURL(blobResult);

		const mainImage = document.querySelector('.main-module__image');
		const mainImageInner = `<img src=${imageUrl} alt="${data.sightName}">
	<div class="main-module__text"><p>${data.sightAbout[item]}</p></div>`;
		mainImage.innerHTML = mainImageInner;

		const styleVar = mainImage.style;
		styleVar.setProperty('--display-after', 'none');
	} catch (error) {
		alert(error.message);
	}

	const styleGalleryVars = document.querySelectorAll('.main-module__image-gallery');
	styleGalleryVars.forEach((element) => {
		element.style.setProperty('--display-gallery', 'block');
	});

	document.querySelector('.main-module__gallery').style.pointerEvents = 'auto';

	async function getImage(url) {
		const res = await fetch(url);
		const blob = await res.blob();
		return blob;
	};
}

//*========================================
buildPage(sitesArr[0]);

function menuBurgerToggle() {
	document.documentElement.classList.toggle("locked");
	document.documentElement.classList.toggle("menu-open");
};

const iconMenu = document.querySelector('.icon-menu');
iconMenu.addEventListener("click", (e) => {
	menuBurgerToggle();
});
iconMenu.addEventListener("click", (e) => {
	document.querySelector('.arrow-main').remove();
}, { once: true });


const header = document.querySelector('header.header');
document.addEventListener("scroll", (e) => {
	const scrollTop = window.scrollY;
	if (scrollTop >= 1) {
		!header.classList.contains('header-scroll') && header.classList.add('header-scroll');
	} else {
		header.classList.contains('header-scroll') && header.classList.remove('header-scroll');
	}
});



