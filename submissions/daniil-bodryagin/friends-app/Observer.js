export class Observer {
  constructor() {
    this.callbacks = {};
  }

  emit(event, ...args) {
    this.callbacks[event](...args);
  }

  subscribe(event, callback) {
    this.callbacks[event] = callback;
  }
}
