(function() {
    //vars
    const data = {
        menu : ['Stats', 'Users', 'Big Data'],
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
        ],
        bigdata : [
            {
                "get": "energy",
                "pitch": "difficult",
                "basket": 813996226,
                "hunter": true,
                "third": -1001012644.0587597,
                "low": "whistle",
                "unusual": "saved",
                "corn": -169536990.83476973,
                "solution": true,
                "salt": false,
                "join": "afraid"
            },
            {
                "get": "energy",
                "pitch": "difficult",
                "basket": 813996226,
                "hunter": true,
                "third": -1001012644.0587597,
                "low": "whistle",
                "unusual": "saved",
                "corn": -169536990.83476973,
                "solution": true,
                "salt": false,
                "join": "afraid"
            },
            {
                "get": "energy",
                "pitch": "difficult",
                "basket": 813996226,
                "hunter": true,
                "third": -1001012644.0587597,
                "low": "normal",
                "unusual": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, aperiam autem, doloribus ducimus facilis fuga officiis pariatur qui soluta, temporibus voluptatem. Itaque officia, totam? Doloremque enim eos fugiat porro!",
                "corn": -169536990.83476973,
                "solution": true,
                "salt": false,
                "join": "afraid"
            },
            {
                "get": "energy",
                "pitch": "easy",
                "basket": 813996226,
                "hunter": true,
                "third": -1001012644.0587597,
                "low": "whistle",
                "unusual": "saved",
                "corn": -169536990.83476973,
                "solution": true,
                "salt": false,
                "join": "afraid"
            },
            {
                "get": "energy",
                "pitch": "difficult",
                "basket": 813996226,
                "hunter": false,
                "third": -1001012644.0587597,
                "low": "whistle",
                "unusual": "saved",
                "corn": -169536990.83476973,
                "solution": true,
                "salt": false,
                "join": "afraid"
            },
            {
                "get": "energy",
                "pitch": "difficult",
                "basket": 813996226,
                "hunter": false,
                "third": -1001012644.0587597,
                "low": "whistle",
                "unusual": "saved",
                "corn": -169536990.83476973,
                "solution": true,
                "salt": false,
                "join": "afraid"
            },
            {
                "get": "energy",
                "pitch": "difficult",
                "basket": 813996226,
                "hunter": true,
                "third": -1001012644.0587597,
                "low": "whistle",
                "unusual": "saved",
                "corn": -169536990.83476973,
                "solution": false,
                "salt": false,
                "join": "afraid"
            }
        ]
    };

    const appContainer = document.getElementById('app__content');
    const appSidebar = document.getElementById('app__side');
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('table-container');

    //helpers
    const generateTable = (table, data) => {
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const rowHead = thead.insertRow();
        let titles = '';

        //Generate Headings
        for (const [index, element] of data.entries()) {
            titles = Object.keys(element);
        }

        //add titles to head
        for (let i = 0; i < titles.length; i++) {
            const cell = rowHead.insertCell(i);
            cell.innerHTML = titles[i].split(/(?=[A-Z])/).join(' ');
        }

        const cell1 = rowHead.insertCell(0);
        cell1.innerHTML = '#';

        //Generate Body
        for (const [index, element] of data.entries()) {
            const row = tbody.insertRow();
            const numberRow = row.insertCell();
            numberRow.append(index + 1);

            for (key in element) {
                const cell = row.insertCell();
                const text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }

    // init menu
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.classList.add('sidebar');

    data.menu.forEach((item, index) => {
        const li = document.createElement('li');
        
        li.classList.add('sidebar__item');
        li.innerHTML += `
            <span class="sidebar__link ${index===0 ? 'sidebar__link_active' : ''}" data-item="${item.toLowerCase().replace(/ /g,'')}">${item}</span>`;

        ul.append(li);
    });

    appSidebar.appendChild(nav).appendChild(ul);

    // init data
    appSidebar.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('sidebar__link')) {
            //remove active from all links
            document.querySelectorAll('.sidebar__link').forEach(linkInner => {
                linkInner.classList.remove('sidebar__link_active');
            });

            e.target.classList.add('sidebar__link_active');
        }

        const linkUrl = e.target.getAttribute("data-item");

        const statsTable = document.createElement('table');

        if(data[linkUrl]) {
            generateTable(statsTable, data[linkUrl]);
            statsContainer.innerHTML = null;
            statsContainer.append(statsTable);
            appContainer.append(statsContainer);
        }
    });

    //default data
    const statsTableDefault = document.createElement('table');
    generateTable(statsTableDefault, data.stats);

    statsContainer.append(statsTableDefault);
    appContainer.append(statsContainer);

})();
