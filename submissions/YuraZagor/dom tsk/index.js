import { data } from './data.js'  

const body = document.querySelector('body')
let text = data[0].content

const div = document.createElement('div')
div.classList.add('wrapper')

body.appendChild(div)

const main = document.createElement('main')
main.classList.add('main')
div.appendChild(main)	

const header = document.createElement('header')
header.classList.add('header')
main.appendChild(header)

const content = document.createElement('div')
content.classList.add('content')
main.appendChild(content)


const footer = document.createElement('footer')
footer.classList.add('footer')
main.appendChild(footer)

let li
content.innerHTML = text

const ul = document.createElement('ul')
ul.classList.add('sidenav--ul')
main.insertAdjacentElement('beforebegin', ul)

data.forEach((datapiece)=> {
	let sidenavLi = document.createElement('li')
	sidenavLi.classList.add('sidenav--li')
	
	ul.appendChild(sidenavLi)
	sidenavLi.setAttribute('id', datapiece.number-1)
	const img = document.createElement('img')
	img.classList.add('li--img')
	img.setAttribute('src', datapiece.img )
	img.setAttribute('alt', datapiece.text )
	sidenavLi.appendChild(img)
} )

ul.onclick = function(event) {
	li = event.target.closest('li')
	if(!li) return;
	handleClick(li.id)
}
function handleClick(){
	text = data[li.id].content
	content.innerHTML = text
}

