import BaseView from "./BaseView";
import Controller from "../utils/Controler";

class HeaderView extends BaseView {
    constructor() {
        super();
        this.rootElement = document.createElement('header');
        // this.headerModel = new HeaderModel();
        this.controller = new Controller();
        this.template = HeaderView.template;
        this.className = 'header';

    }


    beforeRender() {

    }

    render() {
        return this.template;
    }

    afterRender() {
        const menuBtn = document.querySelector('.mob_menu');
        menuBtn.addEventListener('click', this.controller.onOpenMobileMenu.bind(this.controller));
    }

    afterUpdate() {
        this.afterRender();
    }

    static template = `<div class="mob_menu">
                            <span></span>
                        </div>
                        <h1 class="header-title">Friends App</h1>
                        <div class="user_img">
                            <img src="https://randomuser.me/api/portraits/men/17.jpg" alt="">
                        </div>`;
}

export default HeaderView