const STATES = {
    personData : [],
    sortedPersonData : [],
    filtersData: [],
    filterType: '',
    genderType: '',
}
const SELECTORS = {
    dataList : document.querySelector('.content__list'),
    radioButtons: document.getElementsByName('sort-az-age'),
    radioButtonsGender: document.getElementsByName('sort-gender'),
    clearFilterButton: document.querySelector('.search__button'),
    nameSearch: document.querySelector('.form__name'),
}

async function getPersonData() {
    const response = await fetch('https://randomuser.me/api/?results=20&inc=gender,name,email,phone,picture,dob');
    const data = await response.json();

    STATES.personData = data.results.map((personDataElement) => ({
        fullName: `${personDataElement.name.first} ${personDataElement.name.last}`,
        age: personDataElement.dob.age,
        mail: personDataElement.email,
        gender: personDataElement.gender,
        phone: personDataElement.phone,
        photo: personDataElement.picture.medium,
    }));
    STATES.sortedPersonData = [...STATES.personData];
    renderDataContent(STATES.personData);
}
getPersonData();

const renderDataContent = (arrayForFilter) => {
    SELECTORS.dataList.innerHTML = '';
    arrayForFilter.forEach((element) => {
        let {fullName, age, mail, phone, photo} = element;
        let list = `
        <li class="content__element" data-person-name="${fullName}">
            <img src="${photo}" alt="photo profile" class="element__photo">
            <div class="element__details">
                <h2 class="element__name">${fullName}</h2>
                <h4 class="element__age">Age: ${age}</h4>
                <p class="element__phone">${phone}</p>
                <p class="element__email">${mail}</p>
                <button type="button" class="button__add">Add to friend</button>
            </div>
        </li>`
        SELECTORS.dataList.innerHTML += list;
        SELECTORS.personName = document.querySelectorAll('.element__name');
    })
}

const filterGender = (filter) => {
    STATES.sortedPersonData = STATES.personData.filter((person) => person.gender === filter);
    renderDataContent(STATES.sortedPersonData);
}

const filterName = (arrayForFilter, filterContent) => {
    arrayForFilter = arrayForFilter.filter((element) => element.fullName.toLowerCase().includes(filterContent.toLowerCase()));
    renderDataContent(arrayForFilter);
}

const applySortingFilters = () => {
    STATES.filtersData.forEach((filterType) => {
        switch(filterType) {
            case 'az':
                console.log(filterType);
                STATES.sortedPersonData = STATES.sortedPersonData.sort(( a, b ) => a.fullName > b.fullName ? 1 : -1);
                break;
            case 'za':
                STATES.sortedPersonData = STATES.sortedPersonData.sort(( a, b ) => a.fullName < b.fullName ? 1 : -1);
                break;
            case 'ageUp':
                STATES.sortedPersonData = STATES.sortedPersonData.sort(( a, b ) => a.age > b.age ? 1 : -1);
                break;
            case 'ageDown':
                STATES.sortedPersonData = STATES.sortedPersonData.sort(( a, b ) => a.age < b.age ? 1 : -1);
                break;
        }
    })
    renderDataContent(STATES.sortedPersonData);
}

for (const radioButton of SELECTORS.radioButtons) {
    radioButton.addEventListener('change', function(event) {
        STATES.filterType = event.target.dataset.sortType;
        STATES.filtersData.push(STATES.filterType);
        applySortingFilters();
        SELECTORS.nameSearch.value !== '' ? filterName(STATES.sortedPersonData, SELECTORS.nameSearch.value) : false;
    });
}

for (const radioButton of SELECTORS.radioButtonsGender) {
    radioButton.addEventListener('change', function(event) {
        STATES.genderType = event.target.dataset.sortType;
        filterGender(STATES.genderType);
        applySortingFilters();
        SELECTORS.nameSearch.value !== '' ? filterName(STATES.sortedPersonData, SELECTORS.nameSearch.value) : false;
    })
}

SELECTORS.clearFilterButton.addEventListener('click', function(){
    for (const radioButton of SELECTORS.radioButtons){
        radioButton.checked = false;
    }

    for (const radioButton of SELECTORS.radioButtonsGender){
        radioButton.checked = false;
    }

    renderDataContent(STATES.personData);
});

SELECTORS.nameSearch.addEventListener('input', function(){
    filterName(STATES.sortedPersonData, this.value);
})
