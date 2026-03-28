let ALL_FRIENDS = []

function createFriends(data) {
    const res = data.results.map((friend) => ({
        name: `${friend.name.first}  ${friend.name.last}`,
        gender: friend.gender,
        email: friend.email,
        age: friend.dob.age,
        phone: friend.phone,
        nat: friend.nat,
        image: friend.picture.large,
        birthDay: friend.dob.date.slice(0, 10),
        registered: friend.registered.date.slice(0, 10),
    }));
    return res;
};

const FETCH_RETRY_COUNT = 5;
function fetchFriends() {
    let limit = 0;
    const url = 'https://randomuser.me/api/?seed=foobar&results=40&nat=us,dk,fr,gb,ua&inc=gender,name,email,dob,phone,picture,nat,registered';
    async function run(resolve, reject) {
        try {
            const res = await fetch(url);
            const json = await res.json();
            resolve({ data: json });
        } catch (error) {
            setTimeout(() => {
                run(resolve, reject);
            }, 100)
        }
    }
    return new Promise(async (resolve, reject) => {
        limit += 1;
        if (limit >= FETCH_RETRY_COUNT) {
            resolve({ error: 'Too many errors' })
        }
        else {
            run(resolve, reject)
        }
    })
};

async function initFriendsAsync({ onFriendsLoaded }) {
    const { data, error } = await fetchFriends();
    if (data) {
        const friends = createFriends(data);
        ALL_FRIENDS = friends;
        onFriendsLoaded({ friends })
    }
    else {
        alert(error);
    }
}
