let allFriends = [];
let outcomeFriends = null;
let defaultStatus = {
  gender: 'all',
  search: null,
  sorting: 'default',
};

function resetToDefaultStatus() {
  return defaultStatus = {
    gender: 'all',
    search: null,
    sorting: 'default',
  };
};

function formHandler({ type, target }) {
  if (type === 'submit') {
    preventDefault();
  }

  if (type === 'reset') {
    resetToDefaultStatus();
  }

  defaultStatus[target.name] = target.value;
  const filtredFriends = filterFriends(allFriends, defaultStatus);
  const sortedFriends = sortFriends(filtredFriends, defaultStatus);
  outcomeFriends(sortedFriends);
};

function createHandler(friends, addFriendsToDOM) {
  allFriends = friends;
  outcomeFriends = addFriendsToDOM;

  return formHandler;
}
