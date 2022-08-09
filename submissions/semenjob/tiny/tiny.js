const content = document.querySelector('.content')
const inhabitantsOfTheWorld = [
    man = {
        organism: "man",
        name: "Benjamin Geza Affleck-Bold",
        gender: "male",
        legs: 2,
        hands: 2,
        said: "Im batman",
    },
    woman = {
        organism: "woman",
        name: "Lady Diana",
        gender: "Famele",
        legs: 2,
        hands: 2,
        said: "A man is great on earth and throughout the ages, but every iota of his greatness has grown out of a woman."
    },
    dog = {
        organism: "dog",
        name: "Hachiko: The most loyal friend",
        gender: "male",
        legs: 4,
        hands: 0,
        said: "Wow my master is so cool he can drink 20 liters of beer",
    },
    cat = {
        organism: "cat",
        name: "Larry",
        gender: "male",
        legs: 4,
        hands: 0,
        said: "Man quickly bring me some water",
    },
    catWoman = {
        organism: "catWoman",
        name: "Halle Berry",
        gender: "Famele",
        legs: 2,
        hands: 2,
    }
]

Object.setPrototypeOf(catWoman, cat)

const valueInhabitantsWorld = [
    "organism",
    "name",
    "gender",
    "legs",
    "hands",
    "said"
]

const listInhabitantsWorld = inhabitantsOfTheWorld.map((item) => valueInhabitantsWorld.map((value) => item[value]))
const contents = listInhabitantsWorld.join("\n\n")
console.log(contents)

content.innerHTML = contents

