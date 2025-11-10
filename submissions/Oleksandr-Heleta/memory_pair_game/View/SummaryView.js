
class SummaryView extends BaseView {
    constructor() {
        super();
        this.rootElement = document.createElement('header');
        this.summaryModel = new SummaryModel();
        this.template = document.getElementById('summaryTemplate').innerHTML;
        this.className = 'summary';

    }

    beforeRender() {
        this.summaryModel.subscribe(CHANGE_DATA, this.reRender, this);
    }

    render() {
        return templateStr(this.template, this.summaryModel.attributes);
    }

}


