const cats = [
    {
        id: "firelover",
        text: "This cat loves to chat a lot. He speaks even when asked to be quiet by the older cats. Will always find a way to say something. He loves to joke around and be nice. But despite his playfulness, he is lonely without a friend by his side. He really wants to communicate with a cat-girl. Beautiful cat-girl. You must be wondering why his name is Fire Lover? Well, I don't know myself, let's ask him next time you see him.",
        img: "./img/4.png",
        bodyColor: "#f4dec2",
        navColor:  "#9577f0"
    },
    {
        id: "possum",
        text: "Possum cat? Yes, we have such a character. He is also a sweet and kind cat, and also smart. Much smarter than Fire Lover. He can meow in a made-up language that almost no one knows. He loves his opossum brothers very much and often shares pictures of them with the kittens. His advice is always helpful. And when he sleeps no one knows. He helps all the kittens find their inner cat... even though he's a possum.",
        img: "./img/Opossum.webp",
        bodyColor: "antiquewhite",
        navColor: "#e57c6d",
        num: 'text1'
    },
    {
        id: "wise",
        text: "Hmm. Although it has become less cozy and cute, you are out of danger. This cat is also smart, he solves problems quickly and with great interest. He prefers to work at night and stay in the dark, but this does not make him evil at all. This is a wise cat, but also snarky and a little sarcastic, because he is smarter than others. But despite this, the Wise Cat also helps all kittens solve their problems and find their inner cat. Okay, let's get out of here, he doesn't like to talk in vain and get distracted.",
        img: "./img/3.png",
        bodyColor: "black",
        navColor:  "#ed4538",
        num: 'text2'
    },
    {
        id: "redhead",
        text: "This is Red Head. She, like all kittens, immediately went to solve all cases at once, while not forgetting about beauty. Faced with problems, she does not despair, but copes with them, albeit with hard work, but how else? Sometimes helps other kittens by showing their mistakes and giving advice. Is she smart? I don't know, but I know for sure that by perseverance she gets excellent results.",
        img: "./img/5.png",
        bodyColor: "#e0e8ba",  
        navColor:  "#bd3529",
        num: 'text3'
    },
    {
        id: "manul",
        text: "And this is me, Manul. Yes, it was I who told you about other cats and kittens. And I hope you liked it, especially those kittens I wrote about, and older cats will like it too. I am a simple kitten, like everyone else. I also like to chat sometimes and help other kittens in any way I can, because I started not so long ago as a Wise Cat or Possum. I don't always have the brains, perseverance, or creativity, but I keep going. Sometimes I stop to warm my paws. Hope to see you again!",
        img: "./img/7.jpg",
        bodyColor: "#ccc3f0",
        navColor:  "#ac6d5e",
        num: 'text4'
    },
];

const buttonContainer = document.querySelector('#buttons');
const contentElement = document.querySelector('.content');

buttonContainer.addEventListener('click', ({target}) => {
  if (target.closest(".nav_bar")) {
    const content = cats.find((cat) => cat.id === target.id);
    contentElement.innerHTML = renderElement(content);
  }
});

const bodyElem = document.querySelector("body");
const navBar = document.querySelector("#side");

const renderElement = ({text, img, bodyColor, navColor, num}) => {
	bodyElem.style.backgroundColor = bodyColor;
    navBar.style.color = navColor;
    return ` <img class="image" src="${img}"id="descr_img" alt="meow">
     <p class="text ${num}">${text}</p>`
};
