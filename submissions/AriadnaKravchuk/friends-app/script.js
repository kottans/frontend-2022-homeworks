function sortDown(friends, key) {
    return friends.sort((firstFriend, secondFriend) =>
        firstFriend[key] < secondFriend[key] ? 1 : -1
    );
}

function sortUp(friends, key) {
    return friends.sort((firstFriend, secondFriend) =>
        firstFriend[key] > secondFriend[key] ? 1 : -1
    );
}

function sortCards(friends) {
    const [key, diraction] = document.querySelector("#select__sort").value.split("-");

    return diraction === "up" ? sortUp(friends, key) : sortDown(friends, key);
}

function filterCards(friends) {
    const selectedGender = document.querySelector("#select__filter").value;

    return selectedGender === "all"
        ? Object.assign([], friends)
        : friends.filter(({ gender }) => gender === selectedGender);
}

function searchByFullname(friends) {
    const searchInput = document.querySelector(".search__input").value;

    return friends.filter(({ fullname }) => 
        fullname.toUpperCase().indexOf(searchInput.toUpperCase()) > -1
    );
}

function resetForm() {
    const [[firstFilter], [firstSort]] = [
        document.querySelector("#select__filter").children,
        document.querySelector("#select__sort").children,
    ];

    firstFilter.selected = "selected";
    firstSort.selected = "selected";
    document.querySelector(".search").reset();
}

function processData(friendsData) {
    const processedData = [];

    friendsData.forEach((friendData) => 
        processedData.push({
            age: friendData.dob.age,
            fullname: friendData.name.first + " " + friendData.name.last,
            gender: friendData.gender,
            phone: friendData.phone,
            picture: friendData.picture.large
        })
    );

    return processedData;
}

function createFriendsCards(friends) {
    let friendsCards = "";
    const mainInner = document.querySelector(".main__inner");

    friends.forEach(({ age, fullname, gender, phone, picture }) => 
        friendsCards += `<article class="card">
                             <div class="card__inner">
                                 <img src="${picture}" alt="" class="card__image">
                                 <p class="card__name">${fullname}</p>
                                 <p class="card__age-and-gender">${age}, ${gender}</p>
                                 <a href="tel:${phone}" class="card__telephone">${phone}</a>
                             </div>
                         </article>`
    );

    mainInner.innerHTML = friendsCards;
}

async function getFriends() {
    try{
        const results = await fetch(
            "https://randomuser.me/api/?results=21&inc=dob,gender,name,phone,picture"
        );
        return results.json();
    } catch(error) {
        console.log(error);
        alert(error);
    }
}

async function loadMain() {
    try{
        const data = await getFriends();
        const friends = sortCards(processData(data.results));
        let friendsCopy = Object.assign([], friends);

        createFriendsCards(friendsCopy);

        document.querySelector(".search__input").addEventListener("keyup", () => {
            friendsCopy = searchByFullname(filterCards(friends));
            createFriendsCards(friendsCopy);
        });

        document.querySelector("#select__filter").addEventListener("change", () => {
            friendsCopy = searchByFullname(filterCards(friends));
            createFriendsCards(sortCards(friendsCopy));
        });

        document.querySelector("#select__sort").addEventListener("change", () => {
            friendsCopy = sortCards(friendsCopy);
            createFriendsCards(friendsCopy);
        });

        document.querySelector(".sidebar__button").addEventListener("click", () => {
            resetForm();
            friendsCopy = sortCards(filterCards(friends));
            createFriendsCards(friendsCopy);
        });
    } catch(error) {
        console.log(error);
        alert(error);
    }
}

loadMain();
