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
        if (this.cardsModel.error) {

            return `<h3 class="loading">Error<br>${this.cardsModel.error} </h3>`;
        }
        if (this.cardsModel.attributes) {
            let str = '<ul class="friends">';
            str += this.cardsModel.attributes
                .map((user, index) => new CardView(user))
                .map((card) => card.render())
                .join('');
            str += '</ul>'
            return str;
        } else {

            return '<h3 class="loading"> Loading...</h3>'
        }
    }

    afterRender() {
        window.onload = this.controller.onLoad.bind(this.controller);
    }

    afterUpdate() {
        this.afterRender();
    }
}

export default CardsView

