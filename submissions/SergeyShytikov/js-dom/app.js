const mtbCategories = [
  {
    name: "Cross-Country",
    description:
      "Cross-country is perhaps the most famous discipline in mountain biking as it's the one you'll see at the Olympic Games, though there are actually several sub-categories of cross-country racing.",
    image: "assets/cross-country.jpg",
  },
  {
    name: "Downhill",
    description:
      "The name is a giveaway here; in downhill mountain bike racing, you start the track at the top of the mountain and race until you reach the bottom. Whoever completes the race course in the quickest time wins.",
    image: "assets/downhill.jpg",
  },
  {
    name: "Freeride",
    description:
      "Freeride makes for an incredible spectacle, with riders performing huge jumps, flips, tricks while riding on more natural terrain - such as the dramatic red rocks and cliffs of Zion National Park in Utah, USA where the Red Bull Rampage event takes place. ",
    image: "assets/freeride.jpg",
  },
  {
    name: "Slopestyle",
    description:
      "Closely related to freeride, slopestyle is all about demonstrating aerial tricks on a specially designed course of huge ramps, drops, jumps and berms. In fact, the clue is in the name; how much style can a rider demonstrate while heading down the slope.",
    image: "assets/slopestyle.jpg",
  },
  {
    name: "4X & dual slalom",
    description:
      "Four-cross, usually abbreviated to 4X, is a mountain bike race discipline that takes place on a track similar to a BMX track. Four riders race simultaneously and head-to-head, with the winner the first rider to cross the finish line. In dual-slalom, two riders compete on identical parallel tracks, similar in style to 4X tracks. ",
    image: "assets/four-cross.jpg",
  },
  {
    name: "Enduro",
    description:
      "In many ways, it is the most similar to how leisure mountain bikers ride generally outside of competition. It's all about a long day (or days) out riding in a beautiful mountain location, riding up climbs and racing down technical descents.",
    image: "assets/enduro.jpg",
  },
  {
    name: "Dirt Jumping",
    description:
      "Is the practice of riding bikes over jumps made of dirt or soil and becoming airborne.",
    image: "assets/dirt.jpg",
  },
];

const main = document.querySelector(".main");
const menuItems = document.querySelector(".menu-items");
const img = document.getElementById("image");
const buttonsList = document.createDocumentFragment();

mtbCategories.forEach((category) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  li.classList.add("menu-item");
  button.classList.add("button");
  button.innerText = category.name;
  li.appendChild(button);
  buttonsList.appendChild(li);
});
menuItems.appendChild(buttonsList);

const description = document.createElement("p");
description.classList.add("text");
main.append(description);

function displayImageAndText(event) {
  if (event.target.nodeName === "BUTTON") {
    const category = mtbCategories.find(
      (category) => category.name === event.target.innerText
    );
    img.src = category.image;
    description.innerText = category.description;
  }
}
menuItems.addEventListener("click", displayImageAndText);
