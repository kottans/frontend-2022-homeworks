import {getPeopleInfo} from './fetchCards';
import cardsRenderOnPage from './cardsRender';
import rangeSlider from './rangeSlider';

function filterCards() {
    const requestURL = 'https://randomuser.me/api/?nat=us,ca,fr,ua,no,fi,nz&results=20&inc=name,gender,location,picture,dob,phone,nat,registered,phone,email&noinfo';

    let slider;
    let sortedCards = [];
    let dataFilterSexActiveValue = '';

    const sortFilter = document.querySelector('#navigation-top-sort'),
          sortParent = document.querySelector('.navigation-top__list');

    const searchInputValue = document.querySelector('.header__search-input');
    const searchInputBtnEnter = document.querySelector('.header__search-submit');

    const filtersBySex = document.querySelectorAll('.navigation-left__item-sex .filterBySex'),
          filterBySexParent = document.querySelector('.navigation-left__item-sex');

    const inputAgeMin = document.querySelector('.navigation-left__item-minage'),
          inputAgeMax = document.querySelector('.navigation-left__item-maxage'),
          filterByAgeSubmitBtn = document.querySelector('.navigation-left__item-submit.range-parametres');
    
    const resetFiltersBtn = document.querySelector('.navigation-left__reset-btn');

    getPeopleInfo(requestURL)
        .then(data => {
            let fetchCardsCopy = objectCopy(data);
            sortedCards = sortByAgeAndName(sortFilter.value, fetchCardsCopy);
            cardsRenderOnPage(sortedCards);

            slider = rangeSlider(minMaxNumber(fetchCardsCopy, 'min'), minMaxNumber(fetchCardsCopy, 'max'));

            filters(fetchCardsCopy);
        });

    function filters(cards) {
        let isEventSearchFilterIsDone = false;
    
        sortParent.addEventListener('change', event => {
            const target = event.target;

            if (target.name === 'sort') {   
                sortedCards = sortByAgeAndName(target.value, sortedCards);
                cardsRenderOnPage(sortedCards);
            } 
        });

        searchInputValue.addEventListener('keyup', element => { 
            sortedCards = sortByAgeAndName(sortFilter.value, cards);
            sortedCards = filterSearchByName(sortedCards, searchInputValue.value);
            sortedCards = filterBySliderAge(sortedCards);
            isEventSearchFilterIsDone = true;

            if (dataFilterSexActiveValue === 'male' || dataFilterSexActiveValue === 'female') {
                sortedCards = filterBySex(sortedCards, dataFilterSexActiveValue);
            }

            if (searchInputValue.value === '') {
                isEventSearchFilterIsDone = false;
                sortedCards = filterBySliderAge(sortedCards);

                if (dataFilterSexActiveValue === 'male' || dataFilterSexActiveValue === 'female') { 
                    sortedCards = filterBySex(sortedCards, dataFilterSexActiveValue);
                } 
            }

            searchInputBtnEnter.addEventListener('click', (event) => {
                let copyInputValue = searchInputValue.value;
                searchInputValue.value = '';
            });

            cardsRenderOnPage(sortedCards);
        });

        filterBySexParent.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains('filterBySex')) {
                filtersBySex.forEach(btn => btn.classList.remove('navigation-left__btn-active'));
                target.classList.add('navigation-left__btn-active');

                sortedCards = sortByAgeAndName(sortFilter.value, cards);
                sortedCards = filterSearchByName(sortedCards, searchInputValue.value);
                sortedCards = filterBySliderAge(sortedCards);

                switch(target.getAttribute(['data-filter'])) {
                    case 'male':
                        sortedCards = filterBySex(sortedCards, 'male');
                        dataFilterSexActiveValue = 'male';
                        break;
                    case 'female':
                        sortedCards = filterBySex(sortedCards, 'female');
                        dataFilterSexActiveValue = 'female';
                        break;
                    default :
                        dataFilterSexActiveValue = '';
                        break;
                }

                cardsRenderOnPage(sortedCards);
            }  
        });

        filterByAgeSubmitBtn.addEventListener('click', event => {
            sortedCards = filterBySliderAge(cards);
            sortedCards = sortByAgeAndName(sortFilter.value, sortedCards);
            sortedCards = filterSearchByName(sortedCards, searchInputValue.value);

            if (dataFilterSexActiveValue === 'male' || dataFilterSexActiveValue === 'female') {
                sortedCards = filterBySex(sortedCards, dataFilterSexActiveValue);
            } 

            cardsRenderOnPage(sortedCards);
        });

        resetFiltersBtn.addEventListener('click', event => {
            sortFilter.selectedIndex = 0;
            
            filtersBySex.forEach(btn => btn.classList.remove('navigation-left__btn-active'));
            filtersBySex[0].classList.add('navigation-left__btn-active');

            slider.noUiSlider.set([minMaxNumber(cards, 'min'), minMaxNumber(cards, 'max')]);

            isEventSearchFilterIsDone = false;

            sortedCards = sortByAgeAndName(sortFilter.value, cards);
            cardsRenderOnPage(sortedCards);
        });
    }

    function sortByAgeAndName(checkedValueForSort, cardsForSort) {
        switch(checkedValueForSort) {
            case 'A-Z':
                cardsForSort = cardsForSort.sort(function (a,b) {
                    return a['name']['first'] < b['name']['first'] ? -1 : 1;
                })
                break;
            case 'Z-A':
                cardsForSort = cardsForSort.sort(function (a,b) {
                    return a['name']['first'] > b['name']['first'] ? -1 : 1;
                })
                break;
            case '1-99':
                cardsForSort = cardsForSort.sort(function (a,b) {
                    return a['dob']['age'] < b['dob']['age'] ? -1 : 1;
                })
                break;
            case '99-1':
                cardsForSort = cardsForSort.sort(function (a,b) {
                    return a['dob']['age'] > b['dob']['age'] ? -1 : 1;
                })
                break;
        }

        return cardsForSort;
    }

    function filterBySex(cards, gender) {
        let result = cards.filter(props => {
            if (`'${props['gender']}'` == `'${gender}'`) {
                return `'${props['gender']}'`;
            }
        });
        return result;
    }

    function filterBySliderAge(cards) {
        let result = cards.filter(props => {
            if (props['dob']['age'] <= inputAgeMax.value && props['dob']['age'] >= inputAgeMin.value) {
                return props['dob']['age'];
            }
        });
        return result;
    }

    function filterSearchByName(cards, inputValue) {
        return cards.filter(function(props) {
            return (props['name']['first']).toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
        })
    }
    
    function minMaxNumber(cards, value) {
        let result = 0;
        let checkArr = [];
        cards.forEach(item => checkArr.push(item['dob']['age']));

        switch(value) {
            case 'min':
                result = Math.min.apply(null, checkArr);
            break;
            case 'max' :
                result = Math.max.apply(null, checkArr);
            break;
        }

        return result;
    }

    function objectCopy(object) {
        return JSON.parse(JSON.stringify(object['results']));
    }
}

export default filterCards;
