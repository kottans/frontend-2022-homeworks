const methods = [
   {
      id: 1,
      type: "Array.prototype.filter()",
      description:
         "The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.",
      img: "./img/filter.png",
   },
   {
      id: 2,
      type: "Array.prototype.find()",
      description:
         "The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.",
      img: "./img/find.png",
   },
   {
      id: 3,
      type: "Array.prototype.forEach()",
      description:
         "The forEach() method executes a provided function once for each array element.",
      img: "./img/forEach.png",
   },
   {
      id: 4,
      type: "Array.prototype.map()",
      description:
         "The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.",
      img: "./img/map.png",
   },
   {
      id: 5,
      type: "Array.prototype.push()",
      description:
         "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
      img: "./img/push.png",
   },
   {
      id: 6,
      type: "Array.prototype.toString()",
      description:
         "The toString() method returns a string representing the specified array and its elements.",
      img: "./img/toString.png",
   },
];

const methodsList = document.querySelector(".methods-list");
const methodsDescription = document.querySelector(".methods-description");

function renderMenuList() {
   return methods.map((el) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", el.id);
      li.classList.add("methods-list__list-item");
      li.innerText = el.type;
      methodsList.append(li);
   });
}

function renderContent(data) {
   const img = document.createElement("img");
   img.classList.add("methods-description__image-example");
   img.src = data.img;
   const title = document.createElement("h4");
   title.innerText = data.type;
   title.classList.add("title");

   const description = document.createElement("p");
   description.innerText = data.description;

   methodsDescription.appendChild(title);
   methodsDescription.appendChild(description);
   methodsDescription.appendChild(img);
}

function onClick({ target }) {
   const selectedLi = target.dataset.id;
   const el = methods.find((method) => method.id == selectedLi);
   methodsDescription.innerText = "";
   renderContent(el);
}

function init() {
   renderMenuList();
   methodsList.addEventListener("click", onClick);
}

document.addEventListener("DOMContentLoaded", init);
