class Controller {
    constructor() {
        this.matrixModel = new MatrixModel();
        this.summaryModel = new SummaryModel();
        this.menuModel = new MenuModel();

    }

    onClickCard(event) {
        const table = event.target.closest('.tablet');
        const card = event.target.closest('.tablet-item');
        if (!card || card.classList.contains('hiden')) return;
        const cardId = card.id;
        const cardDataId = card.getAttribute('data-id');
        card.classList.toggle('hover');

        const { status, firstId, secondId } = this.matrixModel.makeActionByClickCard(cardId, cardDataId);
        this.summaryModel.makeActionByClickCard(1);

        switch (status) {
            case END:
                this.summaryModel.checkBestResult(status);
                this.matrixModel.publish(CHANGE_DATA);
                break;
            case NO_MACHING:
                table.removeEventListener('click', this.onClickCard);
                setTimeout(() => {
                    card.classList.toggle('hover');
                    const secondCad = document.getElementById(secondId);
                    secondCad.classList.toggle('hover');
                }, 500);
                setTimeout(() => {
                    this.matrixModel.publish(CHANGE_DATA);
                }, 1000);
                break;
            case MACHING:
                table.removeEventListener('click', this.onClickCard);
                setTimeout(() => {
                    this.matrixModel.publish(CHANGE_DATA);
                }, 500);
                break;
            default:
                break;
        }
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

