// Get data (API connection)

async function getFriends() {
  const { results } = await getData('https://randomuser.me/api/?results=30');
  return results;
}

async function getData(url) {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
}

// Render friends HTML from received data

function createFriendHtml(friend) {
  const friendHtml = document.createElement('div');
  friendHtml.classList.add('friend');
  friendHtml.innerHTML = `
        <img class="friend-image" src="${friend.picture.large}" />
        <h3 class="friend-name"> ${friend.name.first} ${friend.name.last} </h3>
        <div class="friend-info">
          <div class="friend-info-elem">
            <p>Age | <b>${friend.dob.age}</b></p>
          </div>
          <div class="friend-info-elem">
            <p>Gender | <b>${friend.gender}</b></p>
          </div>
        </div>
        <p class="friend-location"> ${friend.location.city}, ${friend.location.country} </p>
        <p class="friend-email"> ${friend.email} </p>
        <p class="friend-phone"> ${friend.phone} </p>
      `;
  return friendHtml;
};

function createFriends(friends) {
  return friends.map(friend => createFriendHtml(friend));
}

const friendsContainer = document.querySelector(".friends-container");

function addFriendsToDOM(friends) {
  friendsContainer.innerHTML = '';
  friendsContainer.append(...createFriends(friends));
};
