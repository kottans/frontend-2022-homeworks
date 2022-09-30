function sortDown(friends, key) {
    return friends.sort((firstFriends, secondFriends) => {
        if (firstFriends[key] > secondFriends[key]) return 1;
        if (firstFriends[key] < secondFriends[key]) return -1;
        return 0;
    });
}

function sortUp(friends, key) {
    return friends.sort((firstFriends, secondFriends) => {
        if (firstFriends[key] < secondFriends[key]) return 1;
        if (firstFriends[key] > secondFriends[key]) return -1;
        return 0;
    });
}

function sortCards(friends) {
    const selectedSort = document.querySelector("#select__sort").value;
    let [key, diraction] = selectedSort.split("-");

    friends = diraction === "up" ? sortUp(friends, key) : sortDown(friends, key);

    createFriendsCards(friends);
    return friends;
}

function filterCards(friends, friendsCopy) {
    const selectedGender = document.querySelector("#select__filter").value;

    if (selectedGender === "all") {
        friendsCopy = [];
        Object.assign(friendsCopy, friends);
    } else {
        friendsCopy = friends.filter((friend) => {
            return friend.gender === selectedGender;
        })
    }

    sortCards(friendsCopy), createFriendsCards(friendsCopy);
    return friendsCopy;
}

function searchByFullname(friends) {
    const searshInput = document.querySelector(".searsh__input").value;
    const searchedFriends = [];

    for (let i = 0; i < friends.length; i++) {
        if (friends[i].fullname.toUpperCase().indexOf(searshInput.toUpperCase()) > -1) {
            searchedFriends.push(friends[i]);
        }
    }

    createFriendsCards(searchedFriends);
}

function resetForm(friends) {
    const gendersSelect = document.querySelector("#select__filter");
    const sortSelect = document.querySelector("#select__sort");
    const [[firstFilter], [firstSort]] = [gendersSelect.children, sortSelect.children];

    firstFilter.selected, firstSort.selected = "selected";
    filterCards(friends), sortCards(friends);
    createFriendsCards(friends);
}

function processData(friends) {
    let result = [];

    friends.forEach((friend) => {
        result.push({
            age: friend.dob.age,
            fullname: friend.name.first + " " + friend.name.last,
            gender: friend.gender,
            phone: friend.phone,
            picture: friend.picture.large
        });
    });

    return result;
}

function createFriendsCards(friends) {
    let cards = "";
    const mainInner = document.querySelector(".main__inner");

    friends.forEach(({age, fullname, gender, phone, picture}) => {
        cards += `<div class="card">
            <div class="card__inner">
            <img src="${picture}" alt="" class="card__image">
            <div class="card__name">${fullname}</div>
            <div class="card__age-and-gender">${age}, ${gender}</div>
            <div class="card__telephone">${phone}</div>
            </div>
            </div>`;
    });

    mainInner.innerHTML = cards;
}

const searshInput = document.querySelector(".searsh__input");
const gendersSelect = document.querySelector("#select__filter");
const sortSelect = document.querySelector("#select__sort");
const resetButton = document.querySelector(".sidebar__button");

fetch("https://randomuser.me/api/?results=21&inc=dob,gender,name,phone,picture")
.then((results) => {
    return results.json();
})
.then((data) => {
    const friends = processData(data.results);
    let friendsCopy = [];
    Object.assign(friendsCopy, friends);
    createFriendsCards(friendsCopy), resetForm(friendsCopy);
    searshInput.addEventListener("keyup", () => {searchByFullname(friendsCopy)});
    gendersSelect.addEventListener("change", () => {friendsCopy = filterCards(friends, friendsCopy)});
    sortSelect.addEventListener("change", () => {friendsCopy = sortCards(friendsCopy)});
    resetButton.addEventListener("click", () => {resetForm(friends)});
});
