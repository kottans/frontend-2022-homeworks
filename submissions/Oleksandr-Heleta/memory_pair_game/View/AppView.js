
class AppView {
    constructor() {
        this.rootElement = "";
        this.matrixView = new MatrixView();
        this.summaryView = new SummaryView();
        this.menuModel = new MenuModel();
        this.menuView = new MenuView();

    }
    beforeRender() {
        this.menuModel.subscribe(GO_TO_MENU, this.reRenderToMenu, this);
        this.menuModel.subscribe(START_GAME, this.reRenderToGame, this);
        this.matrixView.matrixModel.subscribe(CHANGE_DATA, this.matrixView.reRender, this.matrixView);
    }

    render(selector) {
        this.beforeRender()
        this.rootElement = document.getElementById(selector);
        this.menuView.show(this.rootElement);
    }

    reRenderToGame() {
        this.rootElement.innerHTML = '';
        this.summaryView.show(this.rootElement);
        this.matrixView.show(this.rootElement);
    }

    reRenderToMenu() {
        this.rootElement.innerHTML = '';
        this.menuView.show(this.rootElement);
    }
}

var appView = new AppView();
appView.render('root');

