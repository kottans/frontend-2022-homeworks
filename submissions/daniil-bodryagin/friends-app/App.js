import {Observer} from "./Observer.js";

export class App {
  constructor(selector, components) {
    this.$container = document.querySelector(selector);
    this.components = components || [];
    this.observer = new Observer();
  }

  create() {
    this.components = this.components.map(Component => {
      const component = new Component(this.observer);
      this.$container.insertAdjacentHTML('beforeend', component.toHTML());
      component.init();
      return component;
    });
  }
}
