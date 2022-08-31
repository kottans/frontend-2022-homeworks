const methods = [
    {
        id: 1,
        type: 'Array.prototype.filter()',
        description: 'The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.',
        img: './img/filter.png'
    },
    {
        id: 2,
        type: 'Array.prototype.find()',
        description: 'The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.',
        img: './img/find.png'
    },
    {
        id: 3,
        type: 'Array.prototype.forEach()',
        description: 'The forEach() method executes a provided function once for each array element.',
        img: './img/forEach.png'
    },
    {
        id: 4,
        type: 'Array.prototype.map()',
        description: 'The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.',
        img: './img/map.png'
    },
    {
        id: 5,
        type: 'Array.prototype.push()',
        description: 'The push() method adds one or more elements to the end of an array and returns the new length of the array.',
        img: './img/push.png'
    },
    {
        id: 6,
        type: 'Array.prototype.toString()',
        description: 'The toString() method returns a string representing the specified array and its elements.',
        img: './img/toString.png'
    },
]

let methodsList = document.getElementsByClassName('methods-list')[0]
methods.forEach(el => {
    let li = document.createElement('li')
    li.innerText = el.type
    li.classList.add("methods-list__list-item");

    let img = document.createElement('img')
    img.classList.add("methods-description__image-example");
    img.src = el.img

    let title = document.createElement('h4')
    title.innerText = el.type
    title.classList.add("title");
    
    let description = document.createElement('p')
    description.innerText = el.description
    // description.classList.add('methods-description__text')

    let methodsDescription = document.querySelector('.methods-description')
    
    li.addEventListener('click', () => {
        methodsDescription.innerText=''

        methodsDescription.appendChild(title)
        methodsDescription.appendChild(description)
        methodsDescription.appendChild(img)
    })

    methodsList.append(li)
})
