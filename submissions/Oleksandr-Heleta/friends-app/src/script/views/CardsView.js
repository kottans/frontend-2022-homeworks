import BaseView from "./BaseView";
import Controller from "../utils/Controler";
import CardsModel from "../models/CardsModel";
import CardView from "./CardView";

class CardsView extends BaseView {
    constructor() {
        super();
        this.rootElement = document.createElement('main');
        this.cardsModel = new CardsModel();
        this.controller = new Controller();
        this.userCard = new CardView();
        this.template = '';
        this.className = 'main';

    }


    beforeRender() {
        this.cardsModel.subscribe('changeData', this.reRender, this);
    }

    render() {
        if (this.cardsModel.attributes) {
            let str = '<ul class="friends">';
            str += this.cardsModel.attributes
                .map((attributes, index) => new CardView(attributes))
                .map((card) => card.render())
                .join('');
            str += '</ul>'
            // if (this.cardsModel.attributes.length > 10) {
            // const lengthArr = this.cardsModel.attributes.length / 10;
            // const buttons = new Array(lengthArr)
            // .map((element, index) => element = `<button id="${index}" class="form-button button" >${index}</button>`)
            // .join('');
            // console.log(buttons);
            // str += `<div>${buttons}</div>`;
            // }
            return str;
        } else {
            this.cardsModel.createUserList();
            return '<h3 class="loading"> Loading...</h3>'
        }
    }

    afterRender() {



    }

    afterUpdate() {
        this.afterRender();
    }
}

export default CardsView