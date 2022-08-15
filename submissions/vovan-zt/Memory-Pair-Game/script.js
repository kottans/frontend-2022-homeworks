window.addEventListener('DOMContentLoaded', () => {

    const cards = [
        {
            name: 'card1',
            image: 'img/1.png'
        },
        {
            name: 'card1',
            image: 'img/1.png'
        },
        {
            name: 'card2',
            image: 'img/2.png'
        },
        {
            name: 'card2',
            image: 'img/2.png'
        },
        {
            name: 'card3',
            image: 'img/3.png'
        },
        {
            name: 'card3',
            image: 'img/3.png'
        },
        {
            name: 'card4',
            image: 'img/4.png'
        },
        {
            name: 'card4',
            image: 'img/4.png'
        },
        {
            name: 'card5',
            image: 'img/5.png'
        },
        {
            name: 'card5',
            image: 'img/5.png'
        },
        {
            name: 'card6',
            image: 'img/6.png'
        },
        {
            name: 'card6',
            image: 'img/6.png'
        },
        
    ];

    const wrapper = document.querySelector('.wrapper');

    cards.sort(function() { return 0.5 - Math.random() });
    
  
    cards.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('col'); 
        element.innerHTML = `
                <div class="c1" data-card='${item.name}'></div>
                <img class="c2" src="${item.image}" alt="">

        `
        wrapper.append(element);
    })                   

    const flip = document.querySelectorAll('.col');
    let cardFirst = [];

    function cancell() {
        flip.forEach(item => { 
            item.classList.remove('hover');
        })
    }

    console.log(flip);

    function visibility() {
        flip.forEach(item => { 
            item.classList.remove('visibility');
        })
    }

    function reset () {
        let count = 0;
        flip.forEach (item => {
            if (item.classList.contains('visibility')) {
                count++
            }
            if (count == 12) {
                setTimeout(function(){alert('You win') }, 500);
                setTimeout(function(){cancell(); }, 700);
                setTimeout(function(){visibility(); }, 800);
                cards.sort(function() { return 0.5 - Math.random() });
                count = 0;  
            }
        })
    }

    function changeCard(item) {
        
        if (cardFirst.length == 2 && cardFirst[0]==cardFirst[1]) {
            flip.forEach(item => { 
               if (item.classList.contains('hover')) {
                item.classList.add('visibility');
               }
            })
        } else if (cardFirst.length > 2) {
            cardFirst = []
            cancell();
        }
    }

    flip.forEach(item => {
        item.addEventListener('click', e => {
            let target = e.target;
        item.classList.toggle('hover');
        cardFirst.push(target.dataset.card)
     
            changeCard(item);

            reset ();
        })

    })

});
