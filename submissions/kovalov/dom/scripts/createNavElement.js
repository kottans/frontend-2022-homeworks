export function createNavElement(data) {
  const listElements = data.map(
    (item) =>
      `
			<li class="navigation__list-item">
				<a
					href="#"
					class="navigation__list-link"
					data-side-menu-id="${item.id}">
					${item.name}
				</a>
			</li>
		`
  );
  const listContainer = document.createElement('ul');
  listContainer.classList.add('navigation__list');
  listContainer.innerHTML = listElements;
  return listContainer;
}
