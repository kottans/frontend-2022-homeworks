class Controller {
    constructor() {
        this.matrixModel = new MatrixModel();
        this.summaryModel = new SummaryModel();
        this.menuModel = new MenuModel();

    }

    onClickCard(event) {

        const card = event.target.closest('.tablet-item');
        if (card.classList.contains('hiden')) return;
        const cardId = card.id;
        const cardDataId = card.getAttribute('data-id');
        card.classList.toggle('hover');

        const status = this.matrixModel.makeActionByClickCard(cardId, cardDataId);
        this.summaryModel.makeActionByClickCard(1);
        this.summaryModel.checkBestResult(status);
    }

    onClickGameBtns(event) {
        const btnId = event.target.closest('.gameBtn').id;
        switch (btnId) {
            case 'resetGameBtn':
                this.matrixModel.startNewGame();
                this.summaryModel.startNewGame();
                break;
            case 'menuGameBtn':
                this.menuModel.publish(GO_TO_MENU);
                break;
            default:
                break;
        }
    }

    onClickMenuBtn(event) {
        const btnId = +event.target.closest('.menuBtn').id;
        this.matrixModel.setCardAmount(btnId);
        this.summaryModel.setCardAmount(btnId);
        this.menuModel.publish(START_GAME);

    }
};