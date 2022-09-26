import man from '../../assets/man.png';
import woman from '../../assets/woman.png';
import both from '../../assets/both.png';
import abcAscending from '../../assets/ascending_sort_abc.png';
import abcDescending from '../../assets/descending_sort_abc.png';
import numbAscending from '../../assets/sort_ascending_numbers.png';
import numbDescending from '../../assets/sort_descending_numbers.png';

import {
    ABC_Ascending,
    ABC_Descending,
    AGE_Ascending,
    AGE_Descending,
    BOTH
} from "../utils/utils";

import BaseView from "./BaseView";
import Controller from "../utils/Controler";
import FormModel from "../models/FormModel";

class FormView extends BaseView {
    constructor() {
        super();
        this.rootElement = document.createElement('aside');
        this.formModel = new FormModel();
        this.controller = new Controller();
        this.template = FormView.template;
        this.className = 'aside';

    }


    beforeRender() {
        this.formModel.subscribe('changeData', this.reRender, this);
    }

    render() {
        return this.template;
    }

    afterRender() {
        const form = document.querySelector(".form");
        form.addEventListener('submit', this.controller.onSubmitForm.bind(this.controller))
        form.addEventListener('click', this.controller.onClick.bind(this.controller))
        form.addEventListener('input', this.controller.onInput.bind(this.controller))

    }

    afterUpdate() {
        this.afterRender();
    }

    static template = `<form  class="form">
        <h2 class = "form-title"> find your friend</h2>
         <div class="form-group">
             <input type="text" name="findName" id="findName" class="form-input" placeholder=" ">
             <label for="findName" class="form-label">input name</label>
         </div>
         <h3 class="form-subtitle">filter</h3>
         <div class="form-box">
             <div class="form-group">
                 <input type="number" name="findAge" id="minAge" class="form-input" placeholder=" " min="0" max="100">
                 <label for="minAge" class="form-label">min age</label>
             </div>
             <div class="form-group">
                 <input type="number" name="findAge" id="maxAge" class="form-input" placeholder=" " min="0" max="100">
                 <label for="maxAge" class="form-label">max age</label>
             </div>
         </div>
         <div class="form-box">
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="gender" id="male" value="male">
                 <label class="form-checkbox_lable button" for="male">
                     <img class="form-img" src=${man} alt="">
                 </label>
             </div>
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="gender" id="female" value="female">
                 <label class="form-checkbox_lable button" for="female">
                     <img class="form-img" src=${woman} alt="">
                 </label>
             </div>
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="gender" id="both" value=${BOTH} checked >
                 <label class="form-checkbox_lable button" for="both">
                     <img class="form-img" src=${both} alt="">
                 </label>
             </div>
         </div>
         <h3 class="form-subtitle">sort</h3>
         <div class="form-box">
             <h3 class="form-subtitle">by name</h3>
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="sort" id="abcAscending" value=${ABC_Ascending} checked>
                 <label class="form-checkbox_lable button" for="abcAscending">
                     <img class="form-img" src=${abcAscending} alt="">
                 </label>
             </div>
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="sort" id="abcDescending" value=${ABC_Descending}>
                 <label class="form-checkbox_lable button" for="abcDescending">
                     <img class="form-img" src=${abcDescending} alt="">
                 </label>
             </div>
         </div>
         <div class="form-box">
             <h3 class="form-subtitle">by age</h3>
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="sort" id="ageAscending" value=${AGE_Ascending}>
                 <label class="form-checkbox_lable button" for="ageAscending">
                     <img class="form-img" src=${numbAscending} alt="">
                 </label>
             </div>
             <div class="form-group">
                 <input class="form-checkbox" type="radio" name="sort" id="ageDescending" value=${AGE_Descending}>
                 <label class="form-checkbox_lable button" for="ageDescending">
                     <img class="form-img" src=${numbDescending} alt="">
                 </label>
             </div>
         </div>
         <button class="form-button button" type="reset" id="reset">reset</button>
         <button class="form-button button" type="submit" id="submit">submit</button>
     </form > `;
}

export default FormView

