export function createElement({ name, description, src }) {
  const HTML = `
	 <div>
			 <h1 class="main__title">${name}</h1>
			 <img class="main__image" src="./assets/images/${src}" alt="Photo of ${name}.">
			 <p class="main__description">${description}</p>
	 </div>`;
  const template = document.createElement('template');
  template.innerHTML = HTML;
  return template.content.firstElementChild;
}
