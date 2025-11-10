// Filter by gender

function filterFriends(friends, { search, gender }) {
  const filtredFriends = friends.filter((friend) => {
    const friendName = `${friend.name.first} ${friend.name.last}`;
    const checkedSearch =
      search === null
        ? true
        : friendName.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    const checkedGender = gender === "all" ? true : friend.gender === gender;
    return checkedSearch && checkedGender;
  });
  return filtredFriends;
}

// Sort by age, name

function sortFriends(friends, { sorting }) {
  const ascSort = (a, b) => (a < b ? -1 : 1);
  const descSort = (a, b) => (a < b ? 1 : -1);
  const sortedFriends = [...friends];
  switch (sorting) {
    case "age-desc":
      return sortedFriends.sort((a, b) => descSort(a.dob.age, b.dob.age));
    case "age-asc":
      return sortedFriends.sort((a, b) => ascSort(a.dob.age, b.dob.age));
    case "name-desc":
      return sortedFriends.sort((a, b) => descSort(a.name.first, b.name.first));
    case "name-asc":
      return sortedFriends.sort((a, b) => ascSort(a.name.first, b.name.first));
    default:
      return sortedFriends;
  }
}
