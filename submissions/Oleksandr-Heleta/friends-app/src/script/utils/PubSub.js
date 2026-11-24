class PubSub {
    constructor() {
        this.subscribers = [];
    }

    subscribe(event, handler, context) {
        this.subscribers.push({ event: event, handler: handler.bind(context) });
    }

    publish(event, args) {
        this.subscribers.forEach(function (action) {
            if (action.event === event) {
                action.handler(args);
            }
        })
    }
};

export default PubSub

