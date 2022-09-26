import PubSub from "../utils/PubSub";
class BaseModel extends PubSub {
    constructor() {
        super();

    }

    clear(response, reject) {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }
};

export default BaseModel