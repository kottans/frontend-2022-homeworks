
class MatrixView extends BaseView {
    constructor() {
        super();

        this.matrixModel = new MatrixModel();
        this.controller = new Controller();
        this.template = document.getElementById('matrixTemplate').innerHTML;
        this.className = 'main';

    }

    beforeRender() {

    }


    render() {
        let str = '';
        str = this.matrixModel.attributes
            .map((attributes, index) => new CardView(attributes))
            .map((card) => card.render())
            .join('');

        return this.template.replace('{{matrix}}', str);
    }

    afterRender() {
        const tabletContant = document.getElementById('tablet');
        tabletContant.addEventListener('click', this.controller.onClickCard.bind(this.controller));
        const gamesBtns = document.getElementById('gamesButtons');
        gamesBtns.addEventListener('click', this.controller.onClickGameBtns.bind(this.controller));
    }

    afterUpdate() {
        this.afterRender();
    }
}

