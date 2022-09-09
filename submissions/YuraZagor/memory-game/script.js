const cardsArr = [{
		id: 'azazaaza',
		image: './img/azazaaza.PNG',
	}, {
		id: 'bear',
		image: './img/bear.PNG',
	}, {
		id: 'fox',
		image: './img/fox.PNG',
	},	{
		id: 'nebryti-ta-negoleni',
		image: './img/nebryti-ta-negoleni.PNG',
	},	{
		id: 'rabbits',
		image: './img/rabbits.PNG',
	},	{
		id: 'tiger',
		image: './img/tiger.PNG',
	},
];

const container = document.querySelector('.container')

randomArr = [...cardsArr.concat(cardsArr)]

function randomizeCards(){
	return randomArr.sort(function() { return 0.5 - Math.random() })
}

function gameStart() {
	randomArr.forEach((card)=>{
		return (container.insertAdjacentHTML ("beforeend", `
			<div class="card" data-definition = ${card.id} >
				<img src="./img/kotyk.PNG" alt='card back' class="front" draggable='false'> 
				
				<img src=${card.image} alt="" draggable='false' class='back'>
			</div>
			`))
	})
}

let gameArr = []
let cardElem
let card1
let card2
let count = 0

container.onclick = function(event) {
	cardElem = event.target.closest('.card');
	if (!cardElem) {
		return
	} 
	if (cardElem.className.includes('open')) {
		return;
	}
	if (cardElem.className.includes('hidden')) {
		return;
	} 
	showCard(cardElem)
}

function showCard(cardElem){
	cardElem.classList.add("open")
	gameArr.push(cardElem)
	if (gameArr.length > 1) {
		checkPair()
	}	
}

function checkPair(){
	card1 = gameArr[0];
	card2 = gameArr[1];
	setTimeout(() => {
		card1.classList.remove("open")
		card2.classList.remove("open")
		if (card1.dataset.definition == card2.dataset.definition) {
			card1.classList.add("hidden")
			card2.classList.add("hidden")
			count ++
		}
		gameArr = []	
		
		console.log(count)
		if (count === 6) {
			count = 0
			wannaPlay()
		}
	}, 700);
}

function wannaPlay() {
	container.innerHTML = '';
	app() 
}

function app () {
	randomizeCards()
	gameStart()
}
app() 
