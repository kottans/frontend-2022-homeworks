import BaseModel from "./BaseModel";

class FormModel extends BaseModel {
    constructor() {
        super();
        this.attributes = {



        };
        if (!FormModel.instance) {
            FormModel.instance = this;
        }

        return FormModel.instance;
    }


}

export default FormModel