import { data } from './data.js';  

const body = document.querySelector('body');

const div = document.createElement('div');
div.classList.add('wrapper');
body.appendChild(div);

const main = document.createElement('main');
main.classList.add('main');
div.appendChild(main);	

const header = document.createElement('header');
header.classList.add('header');
main.appendChild(header);

const content = document.createElement('div');
content.classList.add('content');
main.appendChild(content);

const footer = document.createElement('footer');
footer.classList.add('footer');
main.appendChild(footer);

const ul = document.createElement('ul');
ul.classList.add('sidenav--ul');
main.insertAdjacentElement('beforebegin', ul);

data.forEach((datapiece)=> {
	const sidenavLi = document.createElement('li');
	sidenavLi.classList.add('sidenav--li');
	
	ul.appendChild(sidenavLi);
	sidenavLi.setAttribute('id', datapiece.id);
	const img = document.createElement('img');
	img.classList.add('li--img');
	img.setAttribute('src', datapiece.img );
	img.setAttribute('alt', datapiece.description );
	sidenavLi.appendChild(img);
} );

let contentText = data[0].text;
content.innerHTML = contentText;

ul.onclick = function(event) {
	if(!event.target.closest('li')) return;
	handleClick(event.target.closest('li').id);
};

function handleClick(targetID){
	const dice = data.filter(item => item.id === targetID);
	const { text } = dice[0];
	content.innerHTML = text;
};


