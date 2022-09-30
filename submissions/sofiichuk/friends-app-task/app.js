const dudesList = document.getElementById('user_cards');
const reset = document.getElementById('reset');
const switchStyle = document.getElementById('switch_style');
const disclaimer = document.getElementById('another_gender');
const searchBar = document.getElementById('search_bar');
const ageInput = document.getElementById('age_inputs');
const genderFilter = document.getElementById('gender');
const ageAscending = document.getElementById('age_ascending');
const ageDescending = document.getElementById('age_descending');
const nameAscending = document.getElementById('name_ascending');
const nameDescending = document.getElementById('name_descending');

const UserApiUrl =
    `https://randomuser.me/api/?results=32&nat=au,us,ca,gb,fr,nl,nz&inc=nat,location,gender,name,email,dob,phone,picture`;

let theDudes = [];

const loadDudes = async () => {
    try {
        const res = await fetch(UserApiUrl);
        theDudes = await res.json();
        displayDudes(theDudes.results);
    } catch (err) {
        console.error(err);
    }
};

const displayDudes = (dudes) => {
    const htmlString = dudes
        .map((dude) => {
            return `   
            <li class="user_card">
                <div class="user_name">${dude.name.first}</div>
                 <div class="user_card_content">
                   <div class="user_photo">
                   <img src="${dude.picture.medium}" alt="">
                   </div>
                  <div class="user_about">
                    <p class="email">${dude.email.replace('@', '<br/>@')}</p>
                    <p class="phone">${dude.phone}</p>
                    <p class="city">${dude.location.city},</p>
                    <p class="country">${dude.location.country}</p>
                  </div>
                  <div class="age">Age: ${dude.dob.age}</div>
                </div>
            </li>
        `;
        })
        .join('');
    dudesList.innerHTML = htmlString;
};

reset.addEventListener('click', (e) => {
    loadDudes();
});

switchStyle.addEventListener('click', (e) => {
    document.body.style.background = 'gray';
    switchStyle.style.background = 'gray';
    switchStyle.innerText = 'Too pale?';
});

disclaimer.addEventListener('click', (e) => {
    alert("Sorry, the are only two genders");
});

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredDudes = theDudes.results.filter((dude) => {
        return (
            dude.name.first.toLowerCase().includes(searchString) ||
            dude.name.last.toLowerCase().includes(searchString)
        );
    });
    displayDudes(filteredDudes);
});

genderFilter.addEventListener('click', (e) => {
    const filteredDudes = theDudes.results.filter((dude) => {
        if (e.target.id === 'male' || e.target.id === 'female') {
            return (dude.gender===e.target.id);
        }
        else {return theDudes.results}
    });
    displayDudes(filteredDudes);
});

ageDescending.addEventListener('click', (e) => {
    const sortedDudes = theDudes.results.sort((a, b) => a.dob.age - b.dob.age);
    displayDudes(sortedDudes);
});

ageAscending.addEventListener('click', (e) => {
    const sortedDudes = theDudes.results.sort((a, b) => b.dob.age - a.dob.age);
    displayDudes(sortedDudes);
});

nameDescending.addEventListener('click', (e) => {
    const sortedDudes = theDudes.results.sort((a, b) => a.name.first.localeCompare(b.name.first));
    displayDudes(sortedDudes);
});

nameAscending.addEventListener('click', (e) => {
    const sortedDudes = theDudes.results.sort((a, b) => b.name.first.localeCompare(a.name.first));
    displayDudes(sortedDudes);
});

ageInput.addEventListener('keyup', (e) => {
    // const sortedDudes = theDudes.results.sort((a, b) => a.dob.age - b.dob.age);
    // displayDudes(sortedDudes);
    console.log(e.target.value)
});

loadDudes();
