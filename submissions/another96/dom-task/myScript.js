const contentData = [
  {
    id: "rea",
    image: "icons/react.png",
    alt: "React",
    description: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality"
  },
  {
    id: "ang",
    image: "icons/angular.png",
    alt: "Angular",
    description: " AngularJS is a discontinued free and open-source JavaScript-based web framework for developing single-page applications. It was maintained mainly by Google and a community of individuals and corporations. It aimed to simplify both the development and the testing of such applications by providing a framework for client-side model-view-controller (MVC) and model-view-viewmodel (MVVM) architectures, along with components commonly used in web applications and progressive web applications. AngularJS was used as the frontend of the MEAN stack, that consisted of MongoDB database, Express.js web application server framework, AngularJS itself (or Angular), and Node.js server runtime environment. "
  },
  {
    id: "vue",
    image: "icons/vue.png",
    alt: "vue",
    description: " Vue is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex. Two core features of Vue: Declarative Rendering: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state. Reactivity: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen."
  },
  {
    id: "sve",
    image: "icons/svelve.png",
    alt: "svelve",
    description: "Svelte is a free and open-source front end compiler created by Rich Harris and maintained by the Svelte core team members. Svelte is not a monolithic JavaScript library imported by applications: instead, Svelte compiles HTML templates to specialized code that manipulates the DOM directly, which may reduce the size of transferred files and give better client performance; application code is also processed by the compiler, inserting calls to automatically recompute data and re-render UI elements when the data they depend on is modified. This also avoids the overhead associated with runtime intermediate representations, such as virtual DOM, unlike traditional frameworks (such as React and Vue) which carry out the bulk of their work at runtime, i.e in the browser. The compiler itself is written in TypeScript. Its source code is licensed under MIT License and hosted on GitHub."
  },
  {
    id: "jqe",
    image: "icons/jquery.png",
    alt: "jquery",
    description: "Svelte is a free and open-source front end compiler created by Rich Harris and maintained by the Svelte core team members. Svelte is not a monolithic JavaScript library imported by applications: instead, Svelte compiles HTML templates to specialized code that manipulates the DOM directly, which may reduce the size of transferred files and give better client performance; application code is also processed by the compiler, inserting calls to automatically recompute data and re-render UI elements when the data they depend on is modified. This also avoids the overhead associated with runtime intermediate representations, such as virtual DOM, unlike traditional frameworks (such as React and Vue) which carry out the bulk of their work at runtime, i.e in the browser. The compiler itself is written in TypeScript. Its source code is licensed under MIT License and hosted on GitHub."
  }
];

let selectedFramewok = document.getElementById("rea");
var img = document.getElementById("img");
img.src = contentData[0].image;
img.alt = contentData[0].alt;
document.getElementById("text").innerHTML = contentData[0].description;
var menu = document.querySelector(".menu");

menu.addEventListener("click", ({ target }) => {
  const value = target.id;
  if (selectedFramewok) {
    selectedFramewok.classList.remove("selectedFramework");
  }
  selectedFramewok = target;
  selectedFramewok.classList.add("selectedFramework");

  for (let i in contentData) {
    if (contentData[i].id == value) {
      img.src = contentData[i].image;
      img.alt = contentData[i].alt;
      document.getElementById("text").innerHTML = contentData[i].description;
    }
  }
});



