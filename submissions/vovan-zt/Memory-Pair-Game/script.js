window.addEventListener('DOMContentLoaded', () => {

    const cards = [
        { name: 'naruto', image: 'img/1.png'},
        { name: 'uchiha', image: 'img/2.png'},
        { name: 'sai', image: 'img/3.png'},
        { name: 'kakashi', image: 'img/4.png'},
        { name: 'minato', image: 'img/5.png'},
        { name: 'zetsu', image: 'img/6.png'}, 
    ];

    cards.push(...cards);
    cards.sort(() => { return 0.5 - Math.random() });
      
    const container = document.querySelector('.container');

    const generateCards = (name, image, alt) => {
        return `
            <div class ="hide-swap">
                <div class="c1" data-card='${name}'></div>
                <img class="c2" src="${image}" alt="${name}">
            </div>
        `;
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('wrapper'); 

    const cardsHTML = cards.map(card => {
        return generateCards(card.name, card.image, card.alt);
    }).join('');

    cardsDiv.innerHTML = cardsHTML
    container.append(cardsDiv);
 
    const cardsList = document.querySelectorAll('.hide-swap');
    const wrapper = document.querySelector('.wrapper');

    let cardFirst = [];

    function cancelCardActive() {
        cardsList.forEach(card => { 
            card.classList.remove('active');
        })
    }

    function removeClassVisible() {
        cardsList.forEach(card => { 
            card.classList.remove('visible');
        })
    }
    
    function resetCards () {  
        const cardsLength = document.querySelectorAll('.visible').length;
        if (cardsLength == 12) {
            setTimeout(() => alert('You win') , 400);
            setTimeout(() => removeClassVisible() , 500);
            setTimeout(() => cancelCardActive() , 600);
            cards.sort(() => (0.5 - Math.random()), 700);
        }    
    }

    function changeCard() {
        if (cardFirst.length == 2 && cardFirst[0]==cardFirst[1]) {
            cardsList.forEach(item => { 
                if (item.classList.contains('active')) {
                    item.classList.add('visible');
                }
            })
        } else if (cardFirst.length > 2) {
            cardFirst = [];
            cancelCardActive();
        } 
    }

    wrapper.addEventListener('click', ({target}) => {
        if (!target.parentElement.classList.contains('container')) {
        target.parentElement.classList.toggle('active');
        cardFirst.push(target.dataset.card);
        changeCard();
        resetCards();
        }
    })
});
