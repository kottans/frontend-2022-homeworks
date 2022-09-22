import FormModel from "../models/FormModel";
import CardsModel from "../models/CardsModel";

class Controller {
    constructor() {
        this.formModel = new FormModel();
        this.cardsModel = new CardsModel();
    }

    setDataFromForm(event) {
        const formElement = event.target.closest('.form');
        const formData = {
            name: formElement.findName.value.trim(),
            minAge: +formElement.minAge.value || undefined,
            maxAge: +formElement.maxAge.value || undefined,
            gender: formElement.gender.value,
            sort: formElement.sort.value,
        };

        this.cardsModel.findAndSort(formData);
    }

    onOpenMobileMenu(event) {
        const menuBtn = event.target;
        document.body.classList.toggle('lock');
        const aside = document.querySelector('.aside');
        aside.classList.toggle('active');
        menuBtn.classList.toggle('active');
    }

    onSubmitForm(event) {
        event.preventDefault();

        this.setDataFromForm(event);
    }

    onCheck(event) {
        if (event.target.closest('.form-checkbox')) {
            const checkBox = event.target.closest('.form-checkbox');
            this.setDataFromForm(event);
            checkBox.checked = true;
        }
    }

    onInput(event) {
        const input = event.target.closest('.form-input');
        if (input) {
            // console.log(input.value);
            this.setDataFromForm(event);

        }
    }


};

export default Controller