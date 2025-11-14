class BaseView {
    constructor() {
        this.rootElement = document.createElement('div');
    }

    show(element) {
        this.beforeRender();
        this.rootElement.innerHTML = this.render();
        this.rootElement.classList.add(this.className);
        element.appendChild(this.rootElement);
        this.afterRender();
    }

    beforeRender() { }
    afterRender() { }

    reRender() {
        this.beforeUpdate();
        this.rootElement.innerHTML = this.render();
        this.afterUpdate();
    }

    beforeUpdate() { }
    afterUpdate() {

    }
}

export default BaseView

