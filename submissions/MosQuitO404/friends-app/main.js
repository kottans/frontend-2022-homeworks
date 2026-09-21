async function startApp() {
  const friends = await getFriends();
  addFriendsToDOM(friends);
  createHandler(friends, addFriendsToDOM);

  const form = document.querySelector('.form');
  const filtersButton = document.querySelector('.filters-button');

  form.addEventListener('change', formHandler);
  form.addEventListener('keyup', formHandler);
  form.addEventListener('submit', formHandler);
  form.addEventListener('reset', formHandler);

  filtersButton.addEventListener('click', () => {
    filtersButton.classList.toggle('filters-button-active');
    form.classList.toggle('form--open');
  });
}

startApp();
