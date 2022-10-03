import BaseModel from "./BaseModel";
import {
    sortStr,
    ABC_Ascending,
    ABC_Descending,
    AGE_Ascending,
    AGE_Descending,
    BOTH,
    PAGE_LENGTH
} from "../utils/utils";


class CardsModel extends BaseModel {
    constructor() {
        super();
        this.url = 'https://randomuser.me/api/?seed=foobar&results=100&inc=gender,name,email,dob,phone,picture,location';
        this.attributes = null;
        this.users = null;
        this.pages = null;
        this.page = null;
        this.pageButtons = null;
        this.error = null;
        if (!CardsModel.instance) {
            CardsModel.instance = this;
        }

        return CardsModel.instance;
    }


    createUserList() {
        fetch(this.url)
            .then((response, reject) => this.clear(response, reject))
            .then(response => response.json())
            .then(results => results.results)
            .then(users => this.setAtributes(users))
            .catch(err => {
                this.error = err.message;
                console.error(err);
                this.publish('changeData');
            });

    }

    setAtributes(users) {
        this.users = users.map((user) => {
            return {
                image: user.picture.large,
                name: (user.name.first + ' ' + user.name.last),
                gender: user.gender,
                age: user.dob.age,
                phone: user.phone,
                email: user.email,
                location: user.location.city,
            };
        });
        this.error = null;
        this.findAndSort({ gender: BOTH, sort: ABC_Ascending })

    }

    findAndSort({ name, minAge, maxAge, gender, sort }) {
        if (!this.users) {
            this.createUserList()
        }
        this.page = null;
        this.attributes = [... this.users];
        this.filter(name, minAge, maxAge, gender);
        this.sort(sort);
        this.countPages();
        this.publish('changeData');
    }

    filter(name = '', minAge = 0, maxAge = 999, gender) {
        if (minAge > maxAge) {
            let i = minAge;
            minAge = maxAge;
            maxAge = i;
        }
        this.attributes = this.attributes.filter((user) => {
            let boolean = true;
            boolean = ((user.name.toLowerCase().includes(name.toLowerCase())
                && user.age >= minAge
                && user.age <= maxAge)) ? true : false;
            if (gender != BOTH) {
                boolean = (user.gender === gender && boolean) ? true : false;
            }
            return boolean;
        });
    }

    sort(sort) {
        switch (sort) {
            case ABC_Ascending:
                this.attributes = this.attributes.sort((a, b) => sortStr(a.name, b.name));
                break;

            case ABC_Descending:
                this.attributes = this.attributes.sort((a, b) => sortStr(b.name, a.name));
                break;
            case AGE_Ascending:
                this.attributes = this.attributes.sort(function (a, b) {
                    return a.age - b.age;
                });
                break;
            case AGE_Descending:
                this.attributes = this.attributes.sort(function (a, b) {
                    return b.age - a.age;
                });
                break;
            default:
                break;
        }
    }
    countPages() {
        if (this.attributes.length > PAGE_LENGTH) {
            this.pages = [...this.attributes];
            this.page = 1;
            const buttonsLength = Math.ceil(this.pages.length / PAGE_LENGTH);
            this.pageButtons = new Array(buttonsLength).fill(0).map((button, index) => { return button = (index + 1) });
            this.getPage(this.page, this.pages);

        }
    }
    getPage(pageNumber, pages) {
        const pageEnd = pageNumber * PAGE_LENGTH,
            pageBegin = pageEnd - PAGE_LENGTH;
        this.attributes = pages.slice(pageBegin, pageEnd);
    }

    switchPage(button) {
        this.page = button;
        this.getPage(button, this.pages);
        this.publish('changeData');
    }
}

export default CardsModel

