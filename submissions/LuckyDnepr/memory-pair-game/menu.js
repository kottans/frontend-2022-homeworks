async function makeMenuAndListeners() {
    switchMenuAndGameField();
    await readThemes(themesDataPath);
    renderMenu(themesData);
    addMenuItemsEventListeners();
}

async function readThemes(path) {
    try {
        const response = await fetch(path);
        themesData = await response.json();
    } catch (error) {
        console.log(error);
    }
}

function renderMenu(data) {
    doc.querySelector(".themes").innerHTML = new Array(themesData.length)
        .fill(0)
        .reduce((innerhtml, curr, i) => {
            const checked = i === 0 ? " checked" : "";
            return innerhtml += `<input
            type="radio"
            id="theme-${i}"
            class="nav_menu_item"
            name="theme"
            data-theme="${i}"
            ${checked}/>
            <label
            class="nav_menu_item_label"
            for="theme-${i}">
            ${themesData[i].theme}
            </label>
        `;
        }, "");
    doc.querySelector(".theme_image_img").src = themesData[0].pictures[0];
}

function addMenuItemsEventListeners() {
    doc.querySelectorAll('input[type=radio][name="field_size"]').forEach(
        (radio) =>
            radio.addEventListener("change", (e) =>
                fieldSizeChange(
                    e.target.dataset.fieldcols,
                    e.target.dataset.fieldrows
                )
            )
    );
    doc.querySelectorAll('input[type=radio][name="theme"]').forEach((radio) =>
        radio.addEventListener("change", (e) => {
            themeIndex = e.target.dataset.theme;
            themeChange();
        })
    );
    doc.querySelector(".start-game").addEventListener("click", () => {
        gameStart();
    });
    doc.querySelector("#replay").addEventListener("click", () => {
        hideWinWindow();
        foundPairs = 0;
        resetCardsStage();
        generateCardsSet(numberOfCards, themesData[themeIndex].pictures.length - 1);
    });
    doc.querySelector("#back_to_menu").addEventListener("click", () => {
        hideWinWindow();
        switchMenuAndGameField();
    });
}

function fieldSizeChange(fieldWidth, fieldHeight) {
    numberOfCards = fieldWidth * fieldHeight;
}

function themeChange() {
    doc.querySelector(".theme_image_img").src =
        themesData[themeIndex].pictures[
            Math.floor(Math.random() * themesData[themeIndex].pictures.length)
        ];
}

function switchMenuAndGameField() {
    doc.querySelector(".game_field").classList.toggle("hide");
    doc.querySelector(".nav").classList.toggle("hide");
    doc.querySelector(".header").classList.toggle("hide");
    doc.querySelector(".footer").classList.toggle("hide");

}

function showWinWindow() {
    showCoauthorLink();
    doc.querySelector(".fader").classList.remove("hide");
    doc.querySelector(".modal").classList.remove("hide");
}

function hideWinWindow() {
    doc.querySelector(".fader").classList.add("hide");
    doc.querySelector(".modal").classList.add("hide");
    showCoauthorLink();
}

function showCoauthorLink () {
    if (themeIndex != "0") {
        doc.querySelector(".coauthorlink").classList.toggle("hide");
    }
}
