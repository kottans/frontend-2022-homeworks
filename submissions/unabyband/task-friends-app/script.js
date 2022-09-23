const url = 'https://randomuser.me/api/?results=100&inc=gender,name,location,dob,picture,email'

document.addEventListener('DOMContentLoaded', getUserData());

let userStorage = [];
let gender = 'all';
let rule = 'none';

async function getUserData() {
    try{
        const response = await fetch(url);
        const data = await response.json();
        data.results.map((user) => {
            userStorage.push({
                firstName: user.name.first,
                lastName: user.name.last,
                picture: user.picture.large,
                age: user.dob.age,
                gender: user.gender,
                country: user.location.country,
                city: user.location.city,
                email: user.email,
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

function createProfile(user) {
    for(let i=0; i<user.length; i++) {
        const card = document.querySelector('.usercards');
        let userProfile = document.createElement('div');
        userProfile.innerHTML = `<label class="start_chat_button" for="start_chat" 
            onclick="createChat('${user[i].picture}','${user[i].firstName}','${user[i].lastName}')">
            <div class="material-symbols-outlined" id="start_chat">chat</div></label>
            <img class="user_pic" src="${user[i].picture}" alt="Photo of user profile">
            <div class="user_info">
            <h1>${user[i].firstName} ${user[i].lastName}</h1>
            <h2>${user[i].gender}, ${user[i].age}</h2>
            <p>${user[i].city}, ${user[i].country}</p>
            <span>${user[i].email}</span>
            </div>`;
        userProfile.classList.add("user_profile");
        userProfile.classList.add(`${user[i].gender}`);
        card.append(userProfile);
    }
}

function renderToPage(user) {
    document.querySelectorAll('.user_profile').forEach((element) => element.remove());
    createProfile(user);
}

function filterUsers(user, gender) {
    if(gender == 'male') {
        return user.filter(({gender}) => gender == 'male');
    } if (gender == 'female') {
        return user.filter(({gender}) => gender == 'female');
    } else {
        return user;
    }
}

function sortUsers(user, rule) {
    if (rule == 'age_up') {
        return user.sort(({age: a}, {age: b}) => a - b);   
    } if (rule == 'age_down') {
        return user.sort(({age: a}, {age: b}) => b - a);
    } if (rule == 'names_up') {
        return user.sort(({firstName: a}, {firstName: b}) => a < b ? -1 : 1); 
    } if (rule == 'names_down') {
        return user.sort(({firstName: a}, {firstName: b}) => a > b ? -1 : 1);
    } else {
        return user;
    }
}

function findUsers(user, stringValue) {
    if(parseInt(stringValue, 10)) {
        return user.filter(({age}) => age == parseInt(stringValue, 10));
    } else {
    return user.filter(({firstName, lastName}) => (firstName + ' ' + lastName)
    .toLowerCase().includes(stringValue.toLowerCase()));
    }
}


const filtering = document.querySelectorAll('.gender_check');
filtering.forEach((element) => element.addEventListener('change', showFilteredUsers));

function showFilteredUsers() {
    gender = this.value;
    if(rule == 'none'){
    renderToPage(filterUsers((findUsers(userStorage, textValue)), gender));
    } else {
        renderToPage(filterUsers((sortUsers((findUsers(userStorage, textValue)), rule)), gender));
    }
}

const sorting = document.querySelectorAll('.sort_check');
sorting.forEach((element) => element.addEventListener('change', showSortedUsers));

function showSortedUsers() {
    rule = this.value;
    renderToPage(sortUsers((filterUsers((findUsers(userStorage, textValue)), gender)), rule));
}

let searching = document.querySelector('.text_check');
searching = addEventListener('input', showFoundUsers);

function showFoundUsers () {
    textValue = document.getElementById('text_input').value;
    renderToPage(findUsers(filterUsers(userStorage, gender), textValue));   
}

function createChat(userpic, userFirstName, userLastName) {
    if(document.querySelectorAll('.chat_window').length != 0) {
        removeChat();
    }
        const card = document.querySelector('main');
        let userChat = document.createElement('div');
        
        userChat.innerHTML = `<label class="hide_chat_button" for="hide_chat" onclick="removeChat()">
            <div class="material-symbols-outlined" id='hide_chat'>close</div></label>
            <img class="chat_thumbnail" src="${userpic}" alt="Photo of user profile"> 
            <div class="chat_username">${userFirstName} ${userLastName}</div>
            <div class="chat_area"></div>
            <div class="message_area">
            <input type="text" placeholder="Type your message here..." class="chat_input" id="chat_input">
            <label class="send_message_button" for="send_message" onclick="printMessage">
            <div class="material-symbols-outlined" id="send_message" >send</div></label>
            </div>`;
        userChat.classList.add("chat_window");
        card.append(userChat);
        let sendByEnter = document.querySelector('.chat_input');
        sendByEnter = addEventListener('change', printMessage);
}

function removeChat() {
    document.querySelectorAll('.chat_window').forEach((chatWindow) => chatWindow.remove());
}

function printMessage() {
    let message = document.getElementById('chat_input').value;
    if(message != null) {
        let sendingTime = new Date();
        document.querySelector('.chat_area').innerHTML += 
        `<h3>You:</h3><h2>${message}</h2> \n Sent: ${sendingTime.toLocaleString()}`;   
        document.querySelector('.chat_area').scrollTo(0, document.body.scrollHeight);
        document.getElementById('chat_input').value = "";
    }
}

