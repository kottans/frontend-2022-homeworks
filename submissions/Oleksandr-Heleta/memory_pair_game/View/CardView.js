class CardView {
    constructor(attributes) {
        this.attributes = attributes;
        this.template = document.getElementById('cardTemplate').innerHTML;
    }

    render() {
        return templateStr(this.template, this.attributes);
    }
}
