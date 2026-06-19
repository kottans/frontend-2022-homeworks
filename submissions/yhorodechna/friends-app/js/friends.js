const MAIN_CONTENT_EL = document.querySelector("#main__content");
let PREVIOUS_ACTIVE_CARD;

function getFriendItemHtml({ name, gender, email, age, phone, nat, image, birthDay, registered }) {
    const friendsItemHtml =
        `
            <div class="main__friend friend">
                <div class="friend__content">
                    <div id="flip-container" class="flip-container">
                        <div class="flipper">
                            <div class="front">
                                <div class="friend__image">
                                    <img src="${image}">
                                </div>
                                <a class="friend__header">${name}</a>
                                <div class="friend__nat">
                                    <span class="friend__nat-triangle"></span>
                                    <span class="friend__nat-text">${nat}</span>
                                </div>
                                <p class="friend__age">Age ${age}</p>
                            </div>
                            <div class="back">
                                <p class="friend__gender"> Gender: ${gender}</p>
                                <p class="friend__birthDay"> Birthday: ${birthDay}</p>
                                <p class="friend__email"> Email: ${email}</p>
                                <p class="friend__phone"> Phone: ${phone}</p>
                                <p class="friend__registered"> Registered: ${registered}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    return friendsItemHtml
}

function renderFriends({ friends }) {
    const friendsHtml = friends.map(friend => {
        return getFriendItemHtml(friend);
    });
    MAIN_CONTENT_EL.innerHTML = friendsHtml.join(' ');
};
function onFriendCardClick({ target }) {
    const currentCard = target.closest('.flip-container');
    if (currentCard !== PREVIOUS_ACTIVE_CARD) {
        if (PREVIOUS_ACTIVE_CARD) {
            PREVIOUS_ACTIVE_CARD.classList.remove('active');
            PREVIOUS_ACTIVE_CARD = undefined;
        } PREVIOUS_ACTIVE_CARD = currentCard
    }
    if (currentCard) {
        currentCard.classList.toggle('active');
    }
};

MAIN_CONTENT_EL.addEventListener('click', onFriendCardClick);
