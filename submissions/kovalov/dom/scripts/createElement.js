export function createElement({ id, name, description, src }) {
  const HTML = `
	 <article class="main-section__content">
			 <h1 class="main-section__title">${name}</h1>
			 <img class="main-section__image" src="./assets/images/${src}" alt="Photo of ${name}." data-image-id="${id}">
			 <p class="main-section__lead">${description}</p>
	 </article>`;
  const template = document.createElement('template');
  template.innerHTML = HTML;
  return template.content.firstElementChild;
}
