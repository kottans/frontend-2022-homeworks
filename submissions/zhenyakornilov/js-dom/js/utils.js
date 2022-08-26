function toggleDarkClass() {
  const itemsClasses = [".body", ".header", ".footer", ".sidebar", ".content", ".content-body"];
    itemsClasses.map((className) => {
        document.querySelector(className).classList.toggle("dark");
      });
}

function switchTheme() { 
  const checkbox = document.getElementById("switcher");
  checkbox.addEventListener("change", toggleDarkClass);
}

export default switchTheme;
