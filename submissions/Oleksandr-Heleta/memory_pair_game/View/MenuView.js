class MenuView extends BaseView {
    constructor() {
        super();
        this.rootElement = document.createElement('nav');

        this.menuModel = new MenuModel();

        this.controller = new Controller();
        this.template = document.getElementById('menuTemplate').innerHTML;
        this.className = 'menu';

    }
    setRootElement(element) {
        this.rootElement = element;
    }

    render() {
        let str = '';
        const header = ' <h1 id="title">Memory game</h1>'
        str = this.menuModel.buttons
            .map((button) => {
                return this.template.replace(/{{number}}/g, button,);

            })
            .join('');
        return header + str;
    }

    afterRender() {
        const menuContant = document.querySelector('.menu');
        menuContant.addEventListener('click', this.controller.onClickMenuBtn.bind(this.controller));
    }
}

