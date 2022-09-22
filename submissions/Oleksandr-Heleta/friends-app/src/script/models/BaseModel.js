import PubSub from "../utils/PubSub";
class BaseModel extends PubSub {
    constructor() {
        super();

    }

    clear() {
        throw new Error('Need to override clear method');
    }
};

export default BaseModel