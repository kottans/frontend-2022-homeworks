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


content.innerHTML = text

const ul = document.createElement('ul')
ul.classList.add('sidenav--ul')
main.insertAdjacentElement('beforebegin', ul)

for (let i=0; i<data.length; i++){
	let sidenavLi = document.createElement('li')
	sidenavLi.classList.add('sidenav--li')

	ul.appendChild(sidenavLi)
	sidenavLi.setAttribute('id', data[i].number-1)
	const img = document.createElement('img')
	img.classList.add('li--img')
	img.setAttribute('src', data[i].img )
	img.setAttribute('alt', data[i].text )
	sidenavLi.appendChild(img)
}

document.getElementById('0').addEventListener ('click', ()=> {
	text= data[0].content
	content.innerHTML = text
	})
document.getElementById('1').addEventListener ('click', ()=> {
	text= data[1].content
	content.innerHTML = text
	})
document.getElementById('2').addEventListener ('click', ()=> {
	text= data[2].content
	content.innerHTML = text
	})
document.getElementById('3').addEventListener ('click', ()=> {
	text= data[3].content
	content.innerHTML = text
	})
document.getElementById('4').addEventListener ('click', ()=> {
	text= data[4].content
	content.innerHTML = text
	})
document.getElementById('5').addEventListener ('click', ()=> {
	text= data[5].content
	content.innerHTML = text
	})



