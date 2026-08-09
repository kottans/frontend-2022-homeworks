class MenuModel extends BaseModel {
    constructor() {
        super();

        this.buttons = LEVEL_BUTTONS;
        this.attributes = {

        };
        if (!MenuModel.instance) {
            MenuModel.instance = this;
        }

        return MenuModel.instance;
    }
}

