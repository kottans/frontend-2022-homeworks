window.addEventListener("load", windowLoad);

function windowLoad() {
  //HTML
  const htmlBlock = document.documentElement;

  // get saved theme
  const saveUserTheme = localStorage.getItem("user-theme");

  // work with system configurations
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      !saveUserTheme ? changeTheme() : null;
    });

  // change theme by click
  const themeButton = document.querySelector(".page__theme");
  const resetButton = document.querySelector(".page__reset");
  if (themeButton) {
    themeButton.addEventListener("click", function (e) {
      resetButton.classList.add("active");
      changeTheme(true);
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function (e) {
      resetButton.classList.remove("active");
      localStorage.setItem("user-theme", "");
    });
  }

  // function add theme class
  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
      resetButton.classList.add("active");
    } else {
      htmlBlock.classList.add(userTheme);
    }
  }
  // add theme class
  setThemeClass();

  // function change theme
  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains("light") ? "light" : "dark";
    let newTheme;

    if (currentTheme === "light") {
      newTheme = "dark";
    } else if (currentTheme === "dark") {
      newTheme = "light";
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem("user-theme", newTheme) : null;
  }
}

// get 10 cards
fetch("https://randomuser.me/api/?results=10")
  .then((res) => res.json())
  .then((data) => {
    let cards = data.results;

    let result = "";

    cards.forEach(function (lists) {
      result += `
                <div>
                    <div class="friend-card">
                    <div class="card-top">
                    <div><img src="${lists.picture.large}"></div>
                    <div class="bullet">
                    <div id="name"> ${lists.name.first} ${lists.name.last}</div>
                    <div>${lists.gender}</div>
                    </div>
                    </div>

                    <div class="card-bottom">

                    <div class="bullet">
                    <p class="icons"> age-image: </p>
                    <div id="age">${lists.dob.age}</div>
                    </div>

                    <div class="bullet">
                    <p class="icons"> location-image: </p>
                    <div id="location">${lists.location.city}, ${lists.location.country}</div>
                    </div>

                    <div class="bullet">
                    <p class="icons"> phone-image: </p>
                    <div id="phone">${lists.cell}</div>
                    </div>

                    <div class="bullet">
                    <p class="icons"> email-image: </p>
                    <div>${lists.email}</div>
                    </div>

                    </div>
                    </div>
                </div> `;
    });

    document.getElementById("result").innerHTML = result;
  });
