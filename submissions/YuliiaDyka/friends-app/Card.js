class Card { 
    constructor (user) {
        this.name = user.name.first,
        this.age = user.dob.age,
        this.location = user.location.city,
        this.tel = user.phone,
        this.img = user.picture.large
    };
    render() {
        const user = document.createElement('div');
        user.classList.add('card');
        const photo = document.createElement('div');
        photo.classList.add('user__photo');
        const nameAge = document.createElement('span');
        nameAge.classList.add('info');
        const city = document.createElement('span');
        city.classList.add('location');
        const phoneNumber = document.createElement('span');
        phoneNumber.classList.add('additional__info');

        photo.style.backgroundImage = `url("${this.img}")`;
        nameAge.innerText = `${this.name}, ${this.age}`;
        city.innerText = `${this.location}`;
        phoneNumber.innerText = `${this.tel}`;

        photo.append(nameAge, city);
        user.append(photo, phoneNumber);
        cardsSection.append(user);
    }
};
