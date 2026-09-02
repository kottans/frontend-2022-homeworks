import {getPeopleInfo} from './fetchCards';

function cardsRenderOnPage(filteredCards) {
    const parrentContainer = document.querySelector('.content');
    let counter = 0;
    let cardNumber = 0;
    createCards();
    effectsForCards();

    function createCards() {
        while (parrentContainer.firstChild) {
            parrentContainer.removeChild(parrentContainer.firstChild);
        }

        filteredCards.forEach(item => {
            const contentCard = document.createElement('div');
            contentCard.classList.add('content__card');
            contentCard.innerHTML = `
                <div class="content__card-front ${checkGenderForStyleCard(filteredCards)}" data-number="${counter}">
                    <img class="content__card-front-avatar" src="${item['picture']['large']}" alt="user avatar">
                    <div class="content__card-front-descr">
                        <h2 class="content__card-front-title">${item['name']['first']} ${item['name']['last']}</h2>
                        <div class="content__card-front-main">
                            <p class="content__card-front-text">${item['location']['country']}, ${item['location']['city']}</p>
                            <p class="content__card-front-text">${item['dob']['age']} y.o.,</p>
                            <p class="content__card-front-text">${item['gender']}</p>
                        </div>
                        <button class="content__card-front-more">More</button>
                    </div>
                </div>
                <div class="content__card-back" data-number="${counter}">
                    <div class="content__card-back-top">
                        <p class="content__card-back-text content__card-back-name">${item['name']['first']} ${item['name']['last']}</p>
                        <p class="content__card-back-text">${item['location']['city']}, ${item['nat']}</p>
                    </div>
                    <div class="content__card-back-main">
                        <a class="content__card-back-text phone" href="tel:${item['phone']}">${item['phone']}</a>
                        <a class="content__card-back-text mail" href="mailto:${item['email']}">${item['email']}</a>
                    </div>
                    <div class="content__card-back-bottom">
                        <p class="content__card-back-text"><span>registration</span> ${item['registered']['date'].substring(0, 10)}</p>
                        <p class="content__card-back-text"><span>on the site:</span> ${item['registered']['age']} years</p>
                    </div>
                </div>
            `;
            parrentContainer.append(contentCard);
            counter ++;
        })
    }

    function checkGenderForStyleCard(cards) {
        let currentClass = '';
            if (cards[cardNumber]['gender'] === 'male') {
                currentClass = 'content__card-front_male-bgcolor'
            } else {
                currentClass = 'content__card-front_female-bgcolor';
            }
        cardNumber ++;
        return currentClass;
    }

    function effectsForCards() {
        const parentItem = document.querySelector('.content');
        const backCard = document.querySelectorAll('.content__card-back');

        parentItem.addEventListener('click', event => {
            const cardTarget = event.target;
            const cardTargetNumber = cardTarget.offsetParent.getAttribute(['data-number']);
            backCard.forEach(item => {
                if (cardTargetNumber === item.getAttribute(['data-number'])) {
                    item.classList.add('active');
                }
            })
            if (!cardTarget.classList.contains('wrapper')) {
                backCard.forEach(item => {
                    if (cardTargetNumber === item.getAttribute(['data-number'])) {
                        item.classList.add('active');
                    }
                })
            } 
        })

        parentItem.addEventListener('mouseover', event => {
            const cardTarget = event.target;
            if (cardTarget.classList.contains('content')) {
                backCard.forEach(item => {
                    item.classList.remove('active');
                })
            }
        })     
    }
}

export default cardsRenderOnPage;
