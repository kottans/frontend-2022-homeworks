const url = "https://randomuser.me/api/?results=100&inc=gender,name,location,dob,picture,email";

document.addEventListener("DOMContentLoaded", getUserData());

let userStorage = [];
let gender = "all";
let rule = "none";

async function getUserData() {
  try {
    const response = await fetch(url);
    const receivedUsers = await response.json();
    receivedUsers.results.map((usersFromResponse) => {
      userStorage.push({
        firstName: usersFromResponse.name.first,
        lastName: usersFromResponse.name.last,
        picture: usersFromResponse.picture.large,
        age: usersFromResponse.dob.age,
        gender: usersFromResponse.gender,
        country: usersFromResponse.location.country,
        city: usersFromResponse.location.city,
        email: usersFromResponse.email,
      });
    });
    renderToPage(userStorage);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}

function renderToPage(userProfiles) {
  document
    .querySelectorAll(".user_profile")
    .forEach((userProfile) => userProfile.remove());
  createProfile(userProfiles);
}

function createProfile(userProfiles) {
  const userCards = document.querySelector(".usercards");
  userProfiles.forEach((userContent) => {
    let userProfile = document.createElement("div");
    let userName = [userContent.firstName, userContent.lastName].join(" ");
    userProfile.innerHTML = createUserTemplate(
      userContent.picture,
      userName,
      userContent.gender,
      userContent.age,
      userContent.city,
      userContent.country,
      userContent.email
    );
    userProfile.classList.add("user_profile");
    userProfile.classList.add(`${userContent.gender}`);
    userCards.append(userProfile);
  });
}

function createUserTemplate(
  userPhoto,
  userFullName,
  userGender,
  userAge,
  userCity,
  userCountry,
  userMail
) {
  return `
    <label class="start_chat_button" for="start_chat" 
    onclick="createChat('${userPhoto}','${userFullName}')">
        <div class="material-symbols-outlined" id="start_chat">
            chat
        </div>
    </label>
    <img class="user_pic" src="${userPhoto}" alt="Photo of user profile">
    <div class="user_info">
        <h1>
            ${userFullName}
        </h1>
        <h2>
            ${userGender}, ${userAge}
        </h2>
        <p>
            ${userCity}, ${userCountry}
        </p>
        <span>
            ${userMail}
        </span>
    </div>`;
}

function filterUsers(userProfiles, gender) {
  if (gender == "male") {
    return userProfiles.filter(({ gender }) => gender == "male");
  }
  if (gender == "female") {
    return userProfiles.filter(({ gender }) => gender == "female");
  } else {
    return userProfiles;
  }
}

function sortUsers(userProfiles, rule) {
  if (rule == "age_up") {
    return userProfiles.sort(
      ({ age: currentProfile }, { age: nextProfile }) =>
        currentProfile - nextProfile
    );
  }
  if (rule == "age_down") {
    return userProfiles.sort(
      ({ age: currentProfile }, { age: nextProfile }) =>
        nextProfile - currentProfile
    );
  }
  if (rule == "names_up") {
    return userProfiles.sort(
      ({ firstName: currentProfile }, { firstName: nextProfile }) =>
        currentProfile < nextProfile ? -1 : 1
    );
  }
  if (rule == "names_down") {
    return userProfiles.sort(
      ({ firstName: currentProfile }, { firstName: nextProfile }) =>
        currentProfile > nextProfile ? -1 : 1
    );
  } else {
    return userProfiles;
  }
}

function findUsers(userProfiles, findString) {
  if (parseInt(findString, 10)) {
    return userProfiles.filter(({ age }) => age == parseInt(findString, 10));
  } else {
    return userProfiles.filter(({ firstName, lastName }) =>
      (firstName + " " + lastName)
        .toLowerCase()
        .includes(findString.toLowerCase())
    );
  }
}

const filtering = document.querySelectorAll(".gender_check");
filtering.forEach((genderCheck) =>
  genderCheck.addEventListener("change", showFilteredUsers)
);

function showFilteredUsers() {
  gender = this.value;
  if (rule == "none") {
    renderToPage(filterUsers(findUsers(userStorage, textValue), gender));
  } else {
    renderToPage(
      filterUsers(sortUsers(findUsers(userStorage, textValue), rule), gender)
    );
  }
}

const sorting = document.querySelectorAll(".sort_check");
sorting.forEach((sortCheck) =>
  sortCheck.addEventListener("change", showSortedUsers)
);

function showSortedUsers() {
  rule = this.value;
  renderToPage(
    sortUsers(filterUsers(findUsers(userStorage, textValue), gender), rule)
  );
}

let searching = document.querySelector(".text_check");
searching = addEventListener("input", showFoundUsers);

function showFoundUsers() {
  textValue = document.getElementById("text_input").value;
  renderToPage(findUsers(filterUsers(userStorage, gender), textValue));
}

function createChat(userPicture, userFullName) {
  if (document.querySelectorAll(".chat_window").length != 0) {
    removeChat();
  }
  const userCards = document.querySelector("main");
  let userChat = document.createElement("div");
  userChat.innerHTML = createChatTemplate(userPicture, userFullName);
  userChat.classList.add("chat_window");
  userCards.append(userChat);
  sendMessage();
}

function sendMessage () {
  let sendByEnter = document.querySelector(".chat_input");
  sendByEnter = addEventListener("change", printMessage);
}

function createChatTemplate(userPhoto, userFullName) {
  return `
    <label class="hide_chat_button" for="hide_chat" onclick="removeChat()">
        <div class="material-symbols-outlined" id='hide_chat'>
            close
        </div>
    </label>
    <img class="chat_thumbnail" src="${userPhoto}" alt="Photo of user profile"> 
    <div class="chat_username">
        ${userFullName}
    </div>
    <div class="chat_area">
    </div>
    <div class="message_area">
        <input type="text" placeholder="Type your message here..." class="chat_input" id="chat_input">
        <label class="send_message_button" for="send_message" onclick="printMessage">
            <div class="material-symbols-outlined" id="send_message" >
            send
            </div>
        </label>
    </div>`;
}

function removeChat() {
  document
    .querySelectorAll(".chat_window")
    .forEach((chatWindow) => chatWindow.remove());
}

function printMessage() {
  let message = document.getElementById("chat_input").value;
  if (message) {
    let sendingTime = new Date();
    document.querySelector(
      ".chat_area"
    ).innerHTML += `<h3>You:</h3><h2>${message}</h2> \n Sent: ${sendingTime.toLocaleString()}`;
    document
      .querySelector(".chat_area")
      .scrollTo(0, document.body.scrollHeight);
    document.getElementById("chat_input").value = "";
  }
}

