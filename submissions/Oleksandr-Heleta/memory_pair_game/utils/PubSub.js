class PubSub {
    constructor() {
        this.subscribers = [];
        // if (!PubSub.instance) {
        //     PubSub.instance = this;
        // }

        // return PubSub.instance;
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

