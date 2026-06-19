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
        const { error, attributes, pageButtons, page } = this.cardsModel;
        if (error) {

            return `<h3 class="loading">Error<br>${error} </h3>`;
        }
        if (this.cardsModel.attributes) {
            let str = '<ul class="friends">';
            str += this.cardsModel.attributes
                .map((user, index) => new CardView(user))
                .map((card) => card.render())
                .join('');
            str += '</ul>'
            if (page) {
                str += '<div class="buttons-block">';
                str += pageButtons.map(button => (button == page)
                    ? `<button class="button active"  id=${button}>${button}</button>`
                    : `<button class="button"  id=${button}>${button}</button>`).join('');
                str += '</div>';
            }
            return str;
        } else {

            return '<h3 class="loading"> Loading...</h3>'
        }
    }

    afterRender() {
        const buttons = document.querySelector(".buttons-block");
        if (buttons) {
            buttons.addEventListener('click', this.controller.onPage.bind(this.controller))
        };
        window.onload = this.controller.onLoad.bind(this.controller);

    }

    afterUpdate() {
        this.afterRender();
    }
}

export default CardsView

