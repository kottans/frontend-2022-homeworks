const refs = {
	bodyWrapper: document.querySelector("body"),
	cardsWrapper: document.querySelector(".main__cards"),
	formWrapper: document.querySelector(".main__form")
};

const formRefs = {
	form: document.forms.form,
	input: document.forms.form.nameInput,
	button: document.querySelector(".form__clear"),
	sort: document.querySelector(".form__sort"),
	filter: document.querySelector(".form__gender")
};

const modalRefs = {
	open: document.querySelector(".form-filter"),
	overlay: document.querySelector(".overlay"),
	title: document.querySelector(".filter-text")
};

async function fetchUsers() {
	const response = await fetch(
		`https://randomuser.me/api/?results=1000&noinfo`
	);
	return await response.json();
}

let friends = [];

try {
	const users = await fetchUsers();
	friends = [...users.results];
} catch (error) {
	console.log(error.message);
	refs.bodyWrapper.innerHTML = `<div class='notification error'>
        Whoops, something went wrong.Please try again later.</div>`;
}

let copyUsers = [...friends];

function createUsersMarkup(users) {
	return users
		.map(
			({ email, cell, name, picture, dob }) =>
				`<div class="card">
        <div>
                    <img
                    class="card__img"
                    src=${picture.large}
                    alt=""
                    />
                    </div> 
                    <div class="card__description">
                    <p class="card__title">${name.first} ${name.last}</p>
                    <p class="card__email">${email}</p>
                    <p class="card__phone">${cell}</p>
                    <span class="card__age">${dob.age}</span>
                    </div>
                    </div>`
		)
		.join("");
}

function sliceBestMatch(users) {
	const sliceUsers = users.slice(0, 8);
	return sliceUsers;
}

function handleSubmit(event) {
	event.preventDefault();
}

formRefs.form.addEventListener("submit", handleSubmit);

function renderUsersCards(users) {
	users.length
		? (refs.cardsWrapper.innerHTML = createUsersMarkup(
				sliceBestMatch(users)
		  ))
		: (refs.cardsWrapper.innerHTML =
				"<div class='notification'>No users found</div>");
}

renderUsersCards(copyUsers);

let filteredByName = [];

function searchByName(event) {
	const inputText = event.target.value.toLowerCase();

	filteredByName = copyUsers.filter((friend) => {
		if (
			friend.name.first.toLowerCase().includes(inputText) ||
			friend.name.last.toLowerCase().includes(inputText)
		) {
			return true;
		}
	});

	renderUsersCards(filteredByName);

	if (!inputText) {
		clearFilters();
	}
}

formRefs.input.addEventListener("input", searchByName);

function handleClickForm({ target }) {
	if (target.nodeName !== "IMG" && target.nodeName !== "INPUT") {
		return;
	}

	if (target.dataset.filter) {
		const filtertAttr = target.dataset.filter;
		filteredByName.length
			? (copyUsers = [...filteredByName])
			: (copyUsers = [...friends]);
		copyUsers = getfilterByGender(copyUsers, filtertAttr);
	}
	if (target.dataset.sort) {
		const sortAttr = target.dataset.sort;
		copyUsers = getSortFriends(copyUsers, sortAttr);
	}

	renderUsersCards(copyUsers);
}

formRefs.form.addEventListener("click", handleClickForm);

function getSortFriends(users, sortFilterAttr) {
	switch (sortFilterAttr) {
		case "ascending-age":
			users.sort((a, b) => a.dob.age - b.dob.age);
			break;
		case "descending-age":
			users.sort((a, b) => b.dob.age - a.dob.age);
			break;
		case "descending-name":
			users.sort((a, b) => b.name.first.localeCompare(a.name.first));
			break;
		case "ascending-name":
			users.sort((a, b) => a.name.first.localeCompare(b.name.first));
		default:
			return users;
	}
	return users;
}

function getfilterByGender(users, sortFilterAttr) {
	switch (sortFilterAttr) {
		case "male":
		case "female":
			copyUsers = users.filter((user) => user.gender === sortFilterAttr);
			break;
		case "all":
			users;
			break;
		default:
			users;
			break;
	}
	return copyUsers;
}

function clearFilters() {
	formRefs.form.nameRadio[0].checked = true;
	formRefs.input.value = "";
	filteredByName.length = 0;
	copyUsers = [...friends];
	renderUsersCards(copyUsers);
}

formRefs.button.addEventListener("click", clearFilters);

function onbackdropClick(event) {
	if (event.currentTarget === event.target) {
		refs.formWrapper.classList.toggle("show");
		modalRefs.overlay.classList.toggle("is-hidden");
		modalRefs.title.textContent = "open filter";
	}
}

modalRefs.overlay.addEventListener("click", onbackdropClick);

function toggleModal({ target }) {
	if (target.nodeName !== "DIV") {
		return;
	}

	refs.formWrapper.classList.toggle("show");
	modalRefs.overlay.classList.toggle("is-hidden");
	modalRefs.title.textContent = "close filter";

	if (!refs.formWrapper.classList.contains("show")) {
		modalRefs.title.textContent = "open filter";
	}
}

modalRefs.open.addEventListener("click", toggleModal);
