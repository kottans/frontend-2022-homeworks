import filterCards from './modules/filterCards';
import addActiveClass from './modules/addClassForNavElements';

window.addEventListener('DOMContentLoaded', function() {
    filterCards();
    addActiveClass();
});
