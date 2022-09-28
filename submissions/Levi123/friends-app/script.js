const STATES = {
    defaultPersonsData : [],
    sortedPersonsData : [],
    dataToSort: [],
    sortType: '',
    genderType: '',
}
const SELECTORS = {
    dataList : document.querySelector('.content__list'),
    radioButtons: document.querySelectorAll('.filter__radio'),
    clearFilterButton: document.querySelector('.search__button'),
    nameSearch: document.querySelector('.form__name'),
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function getUserData() {
    const response = await fetch('https://randomuser.me/api/?results=20&inc=gender,name,email,phone,picture,dob')
    const checkedResponse = handleErrors(response);
    const data = await checkedResponse.json();
    getRequiredData(data);
}
getUserData();

const getRequiredData = (usersData) => {
    STATES.defaultPersonsData = usersData.results.map((personsDataElement) => ({
        fullName: `${personsDataElement.name.first} ${personsDataElement.name.last}`,
        age: personsDataElement.dob.age,
        mail: personsDataElement.email,
        gender: personsDataElement.gender,
        phone: personsDataElement.phone,
        photo: personsDataElement.picture.medium,
    }));
    STATES.sortedPersonsData = [...STATES.defaultPersonsData];
    renderDataContent(STATES.defaultPersonsData);
}

const renderDataContent = (dataToRender) => {
    SELECTORS.dataList.innerHTML = '';
    dataToRender.forEach((element) => {
        let {fullName, age, mail, phone, photo} = element;
        SELECTORS.dataList.innerHTML += `
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
    })
}

const filterGender = (genderType) => {
    STATES.sortedPersonsData = STATES.defaultPersonsData.filter((person) => person.gender === genderType);
    renderDataContent(STATES.sortedPersonsData);
}

const filterName = (dataToFilter, filterContent) => {
    dataToFilter = dataToFilter.filter((element) => element.fullName.toLowerCase().includes(filterContent.toLowerCase()));
    renderDataContent(dataToFilter);
}

const applySorting = () => {
    STATES.dataToSort.forEach((sortType) => {
        switch(sortType) {
            case 'ascending':
                STATES.sortedPersonsData = STATES.sortedPersonsData.sort(( a, b ) => a.fullName > b.fullName ? 1 : -1);
                break;
            case 'descending':
                STATES.sortedPersonsData = STATES.sortedPersonsData.sort(( a, b ) => a.fullName < b.fullName ? 1 : -1);
                break;
            case 'ageUp':
                STATES.sortedPersonsData = STATES.sortedPersonsData.sort(( a, b ) => a.age > b.age ? 1 : -1);
                break;
            case 'ageDown':
                STATES.sortedPersonsData = STATES.sortedPersonsData.sort(( a, b ) => a.age < b.age ? 1 : -1);
                break;
        }
    })
    renderDataContent(STATES.sortedPersonsData);
}

for (const radioButton of SELECTORS.radioButtons) {
    radioButton.addEventListener('change', function(event) {
        if (radioButton.name === 'sort-az-age'){
            STATES.sortType = event.target.dataset.sortType;
            STATES.dataToSort.push(STATES.sortType);
        }

        if (radioButton.name === 'filter-gender'){
            STATES.genderType = event.target.dataset.sortType;
            filterGender(STATES.genderType);
        }
        applySorting();
        SELECTORS.nameSearch.value !== '' ? filterName(STATES.sortedPersonsData, SELECTORS.nameSearch.value) : false;
    });
}

SELECTORS.clearFilterButton.addEventListener('click', function(){
    for (const radioButton of SELECTORS.radioButtons){
        radioButton.checked = false;
    }
    renderDataContent(STATES.defaultPersonsData);
});

SELECTORS.nameSearch.addEventListener('input', function(){
    filterName(STATES.sortedPersonsData, this.value);
})
