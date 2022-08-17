
window.addEventListener('DOMContentLoaded', () => {

    async  function getResponse () {
        let response = await fetch('https://randomuser.me/api/?results=20');
        let content = await response.json(); 

        const {results} = content;
        let dataBase = [...results];

        function render (data) {
            data.forEach (item => {
                let card = document.createElement('div')
                card.classList.add('cards__wrapper');
              
                card.innerHTML = `
                    <div class="cards__wrapper-name">
                        <h3> ${item.name.first} ${item.name.last}</h3>
                    </div>

                    <div class="cards__wrapper-photo">
                        <img src=${item.picture.large} alt="photo">
                    </div>

                    <div class="cards__wrapper-years">
                    I have ${item.dob.age} years old
                    </div>

                    <div class="cards__wrapper-email">
                        ${item.email}
                    </div>

                    <div class="cards__wrapper-phone">
                        ${item.cell}
                    </div>

                    <div class="cards__wrapper-city">
                        ${item.location.city}
                    </div>

                    <hr class="devider">

                    <div class="cards__wrapper-sex">${item.gender}</div>
                
                `
                document.querySelector('.cards').appendChild(card);
               
            });

               
            document.querySelectorAll('.cards__wrapper-sex').forEach(item => {
                if (item.innerHTML =="female") {
                    item.classList.add('color_violet');
                    item.parentNode.firstElementChild.classList.add('bgcolor_violet'); 
                } 
            });
        }
        render (dataBase);

        let cardsWrapper = document.querySelectorAll('.cards'),
            ageUp = document.querySelector('.filter__age-up'),
            ageDown = document.querySelector('.filter__age-down'),
            ageSearch = document.querySelector('.filter__age-searchTerm'),
            nameUp = document.querySelector('.filter__name-up'),
            nameDown = document.querySelector('.filter__name-down'),
            nameSearch = document.querySelector('.filter__name-searchTerm'),
            male = document.querySelector('#male'),
            female = document.querySelector('#female'),
            allPeople = document.querySelector('#all'),
            reset = document.querySelector('.filter__reset-button');

        function deleteDataBase () {
            cardsWrapper.forEach(item => {
                item.innerHTML = '';
            }) 
        }  

        // Сортировка по возрасту
        function sortByAgeUp(arr) {
            arr.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
        }

        function sortByAgeDown(arr) {
            arr.sort((a, b) => a.dob.age < b.dob.age ? 1 : -1);
        }

        function filterAge(filter, sorting) { 
            filter.addEventListener('click', e => {
                e.preventDefault();
                sorting(dataBase);
                deleteDataBase();        
                render(dataBase);
            });
        }

        function sortByAge() {
            ageSearch.addEventListener('input', e => {
                let target = e.target.value;
                console.log(target.length)
                let newarr = dataBase.filter(age => age.dob.age == target);
                deleteDataBase();     
                render(newarr);
                if (target.length == 0) {
                    render(dataBase);
                }
            })
        }

        filterAge(ageUp, sortByAgeUp);
        filterAge(ageDown, sortByAgeDown);
        sortByAge();


         // Сортировка по имени
        function sortByNameUp(arr) {
            arr.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
        }

        function sortByNamedDown(arr) {
            arr.sort((a, b) => a.name.first < b.name.first ? 1 : -1);
        }

        function sortByName() {
            nameSearch.addEventListener('input', e => {
                let target = e.target.value;
                console.log(target.length)
                let newarr = dataBase.filter(age => age.name.first.toLowerCase() == target.toLowerCase());
                deleteDataBase();     
                render(newarr);
                if (target.length == 0) {
                    render(dataBase);
                }
            })
        }

         filterAge(nameUp, sortByNameUp);
         filterAge(nameDown, sortByNamedDown);
         sortByName()


         // Сортировка по полу
         function sortBySex(gender) {
            gender.addEventListener('change', e => {
                let target = e.target.value;
                console.log(target)
                let newarr = dataBase.filter(gender => gender.gender == target);
                deleteDataBase();     
                render(newarr);
                if (target == 'all') {
                    render(dataBase);
                }
            })
        }

        sortBySex(male);
        sortBySex(female);
        sortBySex(allPeople);


        // сброс фильтров
        function resetFilter () {
            reset.addEventListener('click', e => {
                e.preventDefault();
                deleteDataBase();     
                render(results);
            });
        }  
        resetFilter();
    }
    getResponse ();
});
