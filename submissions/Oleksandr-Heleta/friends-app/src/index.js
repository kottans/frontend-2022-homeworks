import "./style/style.css";

import HeaderView from './script/views/HeaderView';
import FormView from './script/views/FormView';
import CardsView from './script/views/CardsView';


class AppView {
    constructor() {
        this.headerView = new HeaderView();
        this.formView = new FormView();
        this.cardsView = new CardsView();
    }

    render(selector) {
        const element = document.getElementById(selector);
        this.headerView.show(element);
        this.formView.show(element);
        this.cardsView.show(element);
    }
}

var appView = new AppView();
appView.render('root');

