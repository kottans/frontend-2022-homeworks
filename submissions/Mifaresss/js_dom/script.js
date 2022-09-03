const filter = document.querySelectorAll('.main__content-item');

document.querySelector('nav').addEventListener('click', event => {
	if (event.target.tagName !== 'BUTTON') return false;
	let filterClass = event.target.dataset['f'];

	filter.forEach(element => {
		element.classList.remove('display-none');
		if (!element.classList.contains(filterClass)) {
			element.classList.add('display-none');
		}
		if (iconMenu.classList.contains('_active')) {
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
			document.body.classList.remove('_lock');
		};
	})
});


const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
iconMenu.addEventListener('click', e => {
	iconMenu.classList.toggle('_active');
	menuBody.classList.toggle('_active');
	document.body.classList.toggle('_lock');
})
