import { templateStr } from "../utils/utils";

class CardView {
    constructor(attributes) {
        this.attributes = attributes;
        this.template = CardView.template;
    }


    render() {
        return templateStr(this.template, this.attributes);
    }
    static template = `<li class="card">
        <img class="card-img" src="{{image}}" alt="">
            <div class="card-content">
                <div class="card-title">
                    <div class="card-name">{{name}}</div>
                    <div class="card-age">{{age}}</div>
                <div class="card-information">
                    <div class="card-phone">
                        <a href="tel:{{phone}}" >{{phone}}</a>
                    </div>
                    <div class="card-email">
                        <a href="mailto:{{email}}" target="_blank" >{{email}}</a>
                    </div>
                    <div class="card-location">
                        <a href="https://www.google.com.ua/maps/place/{{location}}" target="_blank">{{location}}</a>
                    </div>
                </div>
            </div>
        </div>
    </li>`;

}

export default CardView