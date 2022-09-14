(function() {
    //vars
    const data = [
        {
            menu : ['Stats', 'Users', 'Exit'],
            stats : [
                {
                    downloads : '232',
                    uploads : '22',
                    rating : '5'
                },
                {
                    downloads : '232',
                    uploads : '22',
                    rating : '5'
                },
                {
                    downloads : '232',
                    uploads : '22',
                    rating : '5'
                },
                {
                    downloads : '232',
                    uploads : '22',
                    rating : '5'
                },
                {
                    downloads : '232',
                    uploads : '22',
                    rating : '5'
                }
            ],
            users : [
                {
                    firstName : 'Mark',
                    lastName : 'Lorem',
                    position : 'Owner'
                },
                {
                    firstName : 'Otto',
                    lastName : 'Ipsum',
                    position : 'QA'
                },
                {
                    firstName : 'Alex',
                    lastName : 'Dorom',
                    position : 'Back end dev'
                },
                {
                    firstName : 'Harry',
                    lastName : 'Potter',
                    position : 'Front end dev'
                },
                {
                    firstName : 'Lussie',
                    lastName : 'Gussie',
                    position : 'Team Lead'
                }
            ]
        }
    ];

    //helpers
    const generateTable = (table, data) => {
        let thead = table.createTHead();
        let tbody = table.createTBody();
        let rowHead = thead.insertRow();
        let titles = '';

        //Generate Headings
        for (let [index, element] of data.entries()) {
            titles = Object.keys(element);
        }

        //add titles to head
        for (let i = 0; i < titles.length; i++) {
            let cell = rowHead.insertCell(i);
            cell.innerHTML = titles[i].split(/(?=[A-Z])/).join(' ');
        }

        let cell1 = rowHead.insertCell(0);
        cell1.innerHTML = '#';

        //Generate Body
        for (let [index, element] of data.entries()) {
            let row = tbody.insertRow();
            let numberRow = row.insertCell();
            numberRow.append(index + 1);

            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }

    // init menu
    let nav = document.createElement('nav'); 
    let ul = document.createElement('ul');
    ul.classList.add('sidebar');

    data[0].menu.forEach(item => {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.classList.add('sidebar__item');

        li.innerHTML += '<a class="sidebar__link" href="#">' + item + '</a>';
    });

    document.getElementById('app__side').appendChild(nav).appendChild(ul);

    // init data
    document.querySelectorAll('a.sidebar__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            //remove active from all links
            document.querySelectorAll('a.sidebar__link').forEach(linkInner => {
                linkInner.classList.remove('sidebar__link_active');
            });

            link.classList.add('sidebar__link_active');

            let linkUrl = link.innerHTML.toLowerCase();
            let statsTable = document.createElement('table');

            if(data[0][linkUrl]) {
                generateTable(statsTable, data[0][linkUrl]);

                document.getElementById('app__content').innerHTML = null;
                document.getElementById('app__content').appendChild(statsTable);
            }
        });
    });

    //default data
    let statsTable2 = document.createElement('table');
    generateTable(statsTable2, data[0].stats);

    document.getElementById('app__content').appendChild(statsTable2);

})();