const alfas = [
    {
        id: 0,
        model: 'Alfa Romeo 8C 2900 Lungo Spider Touring 1939',
        description: 'The current world record was set during Pebble Beach week in 2016. The car in question is one of twelve Alfa Romeo 8C 2900 Lungo Spiders by Touring from 1939. After a somewhat troubled history (exported to South America in the 1950s without a body and later with its engine replaced by a Chevy V8) in 1997 it ended up in the hands of none other than Sam & Emily Mann – the collectors who have won no less than four Best of Show awards at Pebble Beach – who commissioned the restoration and reunited the chassis, engine and bodywork once again. The car was debuted at the 1999 Pebble Beach Concours d’Elegance (where it was awarded 2nd in Class), and after the competition is was not relegated to the garage but continued to be used on numerous tours and rallies. In August 2016, the car was offered for sale by RM in Monterey, where, against an estimate of $20,000,000 to 25,000,000, it was sold for $19,800,000, at the time a world record for any pre-war car.',
        price: '19 800 000$',
        img: './img/alfa1.jpeg',
    },
    {
        id: 1,
        model: 'Alfa Romeo 8C 2900 Berlinetta Touring 1938',
        description: 'The silver medal for the most expensive Alfa Romeo goes to another 8C 2900. This time it is a 1938 Berlinetta Touring (although the catalogue indicated 1939), the history of which is far better. Presumably originally sold in Italy in the summer of 1938 it had always remained in Europe, first in England (from 1939 to the mid-1960s), then in France in the hands of Nigel Mann (curious – the same surname as Sam Mann) who sold it in 1976 to its current owner, the Dutchman Jan Martens. Compared to the Spider from RM, however, it was less desirable because it was a Berlinetta and therefore, against an estimate of €16,000,000 to €22,000,000, the car was sold in February 2019 for €16,745.600, about $19,000,000.',
        price: '19 000 000$',
        img: './img/alfa2.jpeg',
    },
    {
        id: 2,
        model: 'Alfa Romeo 8C 2300 Monza Brianza 1933',
        description: 'On the same day that RM sold the 8C 2900 Lungo Spider, Gooding added some “Alpha magic” by selling the third most expensive Alfa Romeo ever. This time an 8C 2300 Monza by Brianza from 1933. I would like to briefly mention the story of this car: in the early 1930s, Zagato, financed by the Ascari family, opened a second semi-independent workshop in Via Brianza in Milan that took the name of the street where it resided; it would be what we now call a Zagato spin-off. The car belonged to Scuderia Balestrero and won the Italian Sports Car Championship in 1947. Offered with an estimate of $12,000,000 to $15,000,000, it was sold for $11,990,000.',
        price: '11 990 000$',
        img: './img/alfa3.jpeg',
    },
    
];

const menu = document.querySelector('.menu__items');
const section = document.querySelector('.section');


menu.addEventListener("click", ({ target }) => {
    const itemId = target.parentElement.id;
    const alfa = (alfas.filter(item => (item.id == itemId)));
    const { 0: {img, model, price, description} } = alfa;
    section.innerHTML = `
            <img class="article__img" src="${img}" alt="Alfa Romeo">
            <h2 class="article__title" id="article__title">${model}</h2>
            <p class="article__price">${price}</p>
            <article class="article__text" id="article__text">
            <p>${description}</p>
            </article>
            `;
});