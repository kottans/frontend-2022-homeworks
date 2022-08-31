function toggleDarkClass() {
  const itemsClasses = [".body", ".header", ".footer", ".sidebar", ".content", ".content-body"];
    itemsClasses.map((className) => {
        document.querySelector(className).classList.toggle("dark");
      });
}

export default toggleDarkClass;
