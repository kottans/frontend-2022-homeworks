document.addEventListener("DOMContentLoaded", () => {
    const initFriends = {
        profileCard: {
            width: 270,
            height: 100,
        },
        gridFriends: {
            columns: 0,
            rows: 0,
        },
        randomuser: {
            base: "https://randomuser.me/api/",
            get fullUrl() {
                return new URL(`${this.base}${this.search}`);
            },
            get search() {
                return `?results=${this.results}&gender=${this.gender}&nat=${this.nat}&inc=${this.inc}&exc=${this.exc}&noinfo`;
            },
            results: 1,
            gender: [],
            nat: [],
            inc: [],
            exc: ["login", "registered", "id"],
        },
        filter: {
            searchName: "",
            age: {
                min: 0,
                max: 0,
                currentMin: 0,
                currentMax: 0,
            },
        },
        sortCard: {
            nameABC: false,
            nameZYX: false,
            dobMinMax: false,
            dobMaxMin: false,
        },
        showCardInfo: {
            location: false,
            email: false,
            phone: false,
            cell: false,
        },
    };

    let dataFriendsServer = {};

    filteringBeforeServer = () => {
        initFriends.randomuser.results = document.querySelector("#check-totalFriend").value;

        fixationСhoice = (choice, arrayChoice, stringChoice) => {
            if (document.querySelector(choice).checked) {
                arrayChoice.push(stringChoice);
            }
        };

        const buttonGender = [];
        fixationСhoice("#check-male", buttonGender, "male");
        fixationСhoice("#check-female", buttonGender, "female");
        initFriends.randomuser.gender = buttonGender;

        const buttonNation = [];
        fixationСhoice("#check-UA", buttonNation, "UA");
        fixationСhoice("#check-ES", buttonNation, "ES");
        fixationСhoice("#check-GB", buttonNation, "GB");
        fixationСhoice("#check-NO", buttonNation, "NO");
        fixationСhoice("#check-CA", buttonNation, "CA");
        fixationСhoice("#check-US", buttonNation, "US");
        initFriends.randomuser.nat = buttonNation;
    };

    async function readDataServer() {
        const response = await fetch(initFriends.randomuser.fullUrl);
        response.ok
            ? (dataFriendsServer = await response.json())
            : alert("Error HTTP: " + response.status);
    }

    updateAgeForVisible = () => {
        initFriends.filter.age.min = Math.min(
            ...dataFriendsServer.results.map((friends) => friends.dob.age)
        );
        initFriends.filter.age.max = Math.max(
            ...dataFriendsServer.results.map((friends) => friends.dob.age)
        );

        document.querySelector("#check-minAge").min = initFriends.filter.age.min;
        document.querySelector("#check-minAge").max = initFriends.filter.age.max;
        document.querySelector("#check-minAge").value = initFriends.filter.age.min;
        document.querySelector("#check-maxAge").min = initFriends.filter.age.min;
        document.querySelector("#check-maxAge").max = initFriends.filter.age.max;
        document.querySelector("#check-maxAge").value = initFriends.filter.age.max;
    };

    readСhoiceForFiltre = () => {
        initFriends.filter.searchName = document.querySelector("#input-name").value;
        initFriends.sortCard.nameABC = document.querySelector("#check-sort-nameABC").checked;
        initFriends.sortCard.nameZYX = document.querySelector("#check-sort-nameZYX").checked;
        initFriends.sortCard.dobMinMax = document.querySelector("#check-sort-dobMinMax").checked;
        initFriends.sortCard.dobMaxMin = document.querySelector("#check-sort-dobMaxMin").checked;

        initFriends.showCardInfo.location = document.querySelector("#check-location").checked;
        initFriends.showCardInfo.email = document.querySelector("#check-email").checked;
        initFriends.showCardInfo.phone = document.querySelector("#check-phone").checked;
        initFriends.showCardInfo.cell = document.querySelector("#check-cell").checked;

        const currentSelectorMin = document.querySelector("#check-minAge");
        const currentSelectorMax = document.querySelector("#check-maxAge");

        initFriends.filter.age.currentMin = currentSelectorMin.value;
        initFriends.filter.age.currentMax = currentSelectorMax.value;

        currentSelectorMin.addEventListener("click", () => {
            if (currentSelectorMin.value > initFriends.filter.age.currentMax) {
                currentSelectorMin.value = initFriends.filter.age.currentMax;
            }
        });

        currentSelectorMax.addEventListener("click", () => {
            if (currentSelectorMax.value < initFriends.filter.age.currentMin) {
                currentSelectorMax.value = initFriends.filter.age.currentMin;
            }
        });
    };

    createDataForVisible = (dbFriends) => {
        const dbScreen = [];
        dbScreen.length = 0;
        [...dbFriends.results].forEach((elem) => {
            dbScreen.push({
                picture: elem.picture.large,
                name: [elem.name.title, elem.name.first, elem.name.last].join(" "),
                nameForSort: [elem.name.last, elem.name.first].join(" "),
                dobDate: new Date(elem.dob.date).toString().substring(4, 15),
                dobDateForSort: new Date(elem.dob.date),
                dobAge: elem.dob.age,
                gender: elem.gender,
                nat: elem.nat,
                locationCity: elem.location.city,
                locationCountry: elem.location.country,
                phone: elem.phone,
                cell: elem.cell,
                email: elem.email,
            });
        });
        return dbScreen;
    };

    nameFiltering = (dbFriends) => {
        return [...dbFriends].filter(
            (elem) =>
                elem.name.toLowerCase().indexOf(initFriends.filter.searchName.toLowerCase()) !== -1
        );
    };

    ageFiltering = (dbFriends) => {
        return [...dbFriends].filter(
            (elem) =>
                initFriends.filter.age.currentMin <= elem.dobAge &&
                initFriends.filter.age.currentMax >= elem.dobAge
        );
    };

    basedTemplateFiltering = (objectField, fieldForDelete, dbFriends) => {
        return objectField ? [...dbFriends]
            : [...dbFriends].reduce((filteredArray, friend) => {
                fieldForDelete.forEach((field) => delete friend[field]);
                filteredArray.push(friend);
                return filteredArray;
            }, []);
    }

    locationFiltering = (dbFriends) => {
        return basedTemplateFiltering(initFriends.showCardInfo.location, ['locationCity', 'locationCountry'], dbFriends);
    };

    emailFiltering = (dbFriends) => {
        return basedTemplateFiltering(initFriends.showCardInfo.email, ['email'], dbFriends);
    };

    phoneFiltering = (dbFriends) => {
        return basedTemplateFiltering(initFriends.showCardInfo.phone, ['phone'], dbFriends);
    };

    cellFiltering = (dbFriends) => {
        return basedTemplateFiltering(initFriends.showCardInfo.cell, ['cell'], dbFriends);
    };

    sortNameABC = (dbFriends) => {
        return initFriends.sortCard.nameABC
            ? [...dbFriends].sort((a, b) => a.nameForSort > b.nameForSort ? 1 : -1)
            : [...dbFriends];
    };

    sortNameZYX = (dbFriends) => {
        return initFriends.sortCard.nameZYX
            ? [...dbFriends].sort((a, b) => a.nameForSort < b.nameForSort ? 1 : -1)
            : [...dbFriends];
    };
    
    sortDobMinMax = (dbFriends) => {
        return initFriends.sortCard.dobMinMax
            ? [...dbFriends].sort((a, b) => a.dobDateForSort.getTime() > b.dobDateForSort.getTime() ? 1 : -1)
            : [...dbFriends];
    };
    
    sortDobMaxMin = (dbFriends) => {
        return initFriends.sortCard.dobMaxMin
            ? [...dbFriends].sort((a, b) => a.dobDateForSort.getTime() < b.dobDateForSort.getTime() ? 1 : -1)
            : [...dbFriends];
    };
    
    createMarkupCSS = () => {
        initFriends.gridFriends.columns =
            Math.floor(document.querySelector(".main").offsetWidth / initFriends.profileCard.width) - 2;
        if (initFriends.gridFriends.columns < 1) { initFriends.gridFriends.columns = 1 };
        document.documentElement.style.setProperty("--columns-card", initFriends.gridFriends.columns);
    };
    
    createDOM = (dbFriends) => {        
        const parentDiv = document.createElement("div");
        parentDiv.className = "main__div";
        document.querySelector(".main__div").replaceWith(parentDiv);
        const fieldPlay = [];
            
        const dbVisible = basedTemplateFiltering(false, ['nameForSort', 'dobDateForSort'], dbFriends);
        
        dbVisible.forEach((card) => {
            fieldPlay.push(`<div class="div__card">
            <div class="card-image">                
                <img class="card-photo" src=${card.picture} alt = "" >
            </div>
            <div class="card-text">
                <p>${card.name}</p>                
                <p>${card.dobDate}</p>
                <p>${card.dobAge} year - ${card.gender}</p>
                <p>${card.nat}</p>`);
            if (card.propertyIsEnumerable("locationCity")) { fieldPlay.push(`<p>${card.locationCountry}</p>`) };
            if (card.propertyIsEnumerable("phone")) { fieldPlay.push(`<p>${card.phone}</p>`) };
            if (card.propertyIsEnumerable("cell")) { fieldPlay.push(`<p>${card.cell}</p>`) };
            if (card.propertyIsEnumerable("email")) { fieldPlay.push(`<p>${card.email}</p>`) };
            fieldPlay.push(`</div></div>`);
            parentDiv.innerHTML = fieldPlay.join("");
        });
    };
    
    ["click", "input"].forEach((event) => {
        [...document.querySelectorAll(".nav__server")].forEach((elem) => {
            elem.addEventListener(event, async () => {
                await filteringBeforeServer();
                await readDataServer();
                await updateAgeForVisible();
                document.querySelector(".nav__local").click();
            });
        });
    });
    
    ["click", "input"].forEach((event) => {
        [...document.querySelectorAll(".nav__local")].forEach((elem) => {
            elem.addEventListener(event, async () => {                
                await readСhoiceForFiltre();
                createMarkupCSS();
                createDOM(
                    sortDobMaxMin(
                        sortDobMinMax(
                            sortNameZYX(
                                sortNameABC(
                                    cellFiltering(
                                        phoneFiltering(
                                            emailFiltering(
                                                locationFiltering(
                                                    ageFiltering(
                                                        nameFiltering(
                                                            createDataForVisible(
                                                                dataFriendsServer
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            });
        });
    });
    
    document.querySelector(".nav__server").click();

    window.onresize = createMarkupCSS;
});
