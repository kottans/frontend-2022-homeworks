const catsRating = [
  {
      id: 1,
      title: "1. American Shorthair Cat",
      img: "./images/American_shorthair_cat.jpeg",
      alt: "American shorthair cat's photo",
      description: "The domestic shorthair is adaptable and good-natured. They are easy to groom and generally a healthy breed, which keeps both grooming and vet costs low. Farmers, shopkeepers and householders often turn to this amiable cat to protect their homes and stores from mice, rats and other vermin.",
  },
  {
    id: 2,
    title: "2. Persian Cat",
    img: "./images/Persian_cat.jpeg",
    alt: "Persian cat's photo",
    description: "The Persian is dignified and docile. They are known for being a quiet and affectionate breed. The cat is bred to have a round head, short face, snub nose, chubby cheeks, rounded ears, big eye and a sturdy body. They are going to require more grooming than many other cat breeds because of their fluffy, long fur. Although they are beautiful and sweet, Persians are prone to a number of potential health problems, most commonly related to their facial structure.",
  },
  {
      id: 3,
      title: "3. Maine Coon Cat",
      img: "./images/Maine_coon_cat.jpeg",
      alt: "Maine coon cat's photo",
      description: "One thing about the Maine Coon is that they’re big kitties! Some can tip the scales at over 20 pounds. They are native New Englanders, hailing from Maine where they have been a popular farm cat and mouser as far back as the early 19th century. Some believe they were brought to America by the Vikings and got their name because they resemble raccoons. Today this big, beautiful breed is one of the world’s most popular breeds.",
  },
  {
    id: 4,
    btnText: "4 place",
    title: "4. Siamese Cat",
    img: "./images/Siamese_cat.jpeg",
    alt: "Siamese cat's photo",
    description: "The sophisticated Siamese looks dressed for an elegant masquerade ball. The Siamese cat’s pale body, in stark contrast to their chic black trim and tanzanite-blue eyes are stunning and mesmerizing to look at. Don’t let the fancy duds fool you, this gorgeous cat is also extremely affectionate, which would explain their worldwide popularity.",
  },
  {
    id: 5,
    title: "5. Abyssinian Cat",
    img: "./images/Abbyssinian_cat.jpeg",
    alt: "Abyssinian cat's photo",
    description: "A love of heights is a signal trait of the Abyssinian cat breed. This kitty loves to be as high up as possible and would love if you could build them a ceiling-height cat tree. Of all the cat breeds, you might say this one lives life to the fullest. This cat will climb higher, jump farther, and play harder than many of the other popular breeds out there. Some people call them “Aby-grabbys” because of their propensity for taking things that pique their interest.",
  }
];
const menu = document.querySelector(".menu");
const allContent = document.querySelector(".content");
function createMenuList() {
  return catsRating.forEach((place) => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("menu__item");
      menuItem.setAttribute("data-id", place.id);
      menuItem.innerText = place.title;
      menu.append(menuItem);
  });
};
createMenuList();
function createContentBox(cat) {
  const titleContent = document.createElement("h2");
  titleContent.classList.add("content__title");
  titleContent.innerText = cat.title;
  const img = document.createElement("img");
  img.classList.add("content__image");
  img.setAttribute("src", cat.img);
  img.setAttribute("alt", cat.alt);
  const description = document.createElement("p");
  description.classList.add("content__description");
  description.innerText = cat.description;
  allContent.appendChild(titleContent);
  allContent.appendChild(description);
  allContent.appendChild(img);
  return allContent;
}
function showContent ({ target }) {
  const currentMenuItem = target.dataset.id;
  const place = catsRating.find((catRating) => catRating.id == currentMenuItem);
  allContent.innerText = "";
  createContentBox(place);
}
menu.addEventListener("click", showContent);
