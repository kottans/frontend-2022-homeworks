let content = document.querySelector('.content');

let aside = document.createElement('aside');
aside.classList.add('asideBlock');
content.append(aside);

let main = document.createElement('main');
main.classList.add('mainBlock');
content.append(main);

let arrOfDatas = [
    
    {
        title: 'The College Dropout',
        dataName: '1',
        description: [
            "Intro", "We Don't Care", "Graduation Day", "All Falls Down", "I'll Fly Away", "Spaceship", "Jesus Walks", "Never Let Me Down", "Get Em High",
            "Workout Plan", "The New Workout Plan", "Slow Jamz", "Breathe In Breathe Out", "School Spirit Skit 1", "School Spirit", "School Spirit Skit 2",
            "Lil Jimmy Skit", "Two Words", "Through the Wire", "Family Business", "Last Call"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg',
        alt: 'The College Dropout',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4Uv86qWpGTxf7fU7lG5X6F?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'colledge'
    },
    {
        title: 'Late Registration',
        dataName: '2',
        description: [
            "Wake Up Mr. West", "Heard 'Em Say", "Touch the Sky", "Gold Digger", "Skit #1", "Drive Slow", "My Way Home", "Crack Music", "Roses",
            "Bring Me Down", "Addiction", "Skit #2", "Diamonds From Sierra Leone (Remix)", "We Major", "Skit #3", "Hey Mama", "Celebration", "Skit #4",
            "Gone", "Diamonds from Sierra Leone", "Back to Basics", "We Can Make It Better", "Late"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Late_registration_cd_cover.jpg/220px-Late_registration_cd_cover.jpg',
        alt: 'Late Registration',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5ll74bqtkcXlKE7wwkMq4g?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'late'
    },
    {
        title: 'Graduation',
        dataName: '3',
        description: [
            "Good Morning", "Champion", "Stronger", "I Wonder", "Good Life", "Can't Tell Me Nothing", "Barry Bonds", "Drunk and Hot Girls", "Flashing Lights",
            "Everything I Am", "The Glory", "Homecoming", "Big Brother", "Good Night"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Graduation_%28album%29.jpg/220px-Graduation_%28album%29.jpg',
        alt: 'Graduation',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4SZko61aMnmgvNhfhgTuD3?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'graduation'
    },
    {
        title: '808s & Heartbreak',
        dataName: '4',
        description: [
            "Say You Will", "Welcome to Heartbreak", "Heartless", "Amazing", "Love Lockdown", "Paranoid", "RoboCop", "Street Lights", "Bad News",
            "See You in My Nightmares", "Coldest Winter", "Pinocchio Story"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/808s_%26_Heartbreak.png/220px-808s_%26_Heartbreak.png',
        alt: '808andHeartbreak',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/3WFTGIO6E3Xh4paEOBY9OU?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,

        class: 'heartbreak'
    },
    {
        title: 'My Beautiful Dark Twisted Fantasy',
        dataName: '5',
        description: [
            "Dark Fantasy", "Gorgeous", "POWER", "All of the Lights (Interlude)", "All of the Lights", "Monster", "So Appalled", "Devil In a New Dress",
            "Runaway", "Hell of a Life", "Blame Game", "Lost In the World", "Who Will Survive In Americe"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/b/be/MBDTF_ALT.jpg',
        alt: 'MBDTF',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/20r762YmB5HeofjMCiPMLv?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'mbdtf'
    },
    {
        title: 'Yeezus',
        dataName: '6',
        description: [
            "On Sight", "Black Skinhead", "I Am a God", "New Slaves", "Hold My Liquer", "I'm In It", "Blood on the Leaves", "Guild Trip", "Send It Up", "Bound 2"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Yeezus_album_cover.png/220px-Yeezus_album_cover.png',
        alt: 'Yeezus',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/7D2NdGvBHIavgLhmcwhluK?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'yeezus'
    },
    {
        title: 'The Life of Pablo',
        dataName: '7',
        description: [
            "Ultralight Beam", "Father Strech My Heands, Pt.1", "Pt.2", "Famous", "Feedback", "Low Lights", "Highlights", "Freestyle 4", "I Love Kanye", "Waves",
            "FML", "Real Friends", "Wolves", "Frank's Tracks", "Siiiilver Surfffffer Intermission", "30 Hours", "No More Parties In LA", "Facts", "Fade", "Saint Pablo" 
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/4/4d/The_life_of_pablo_alternate.jpg',
        alt: 'TLOP',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/7gsWAHLeT0w7es6FofOXk1?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'tlop'
    },
    {
        title: 'Ye',
        dataName: '8',
        description: [
            "I Thought About Killing You", "Yikes", "All Mine", "Wouldn't Leave", "No Mistake", "Ghost Town", "Violent Crimes"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Ye_album_cover.jpg/220px-Ye_album_cover.jpg',
        alt: 'Ye',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/2Ek1q2haOnxVqhvVKqMvJe?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'ye'
    },
    {
        title: 'Jesus Is King',
        dataName: '9',
        description: [
            "Every Hour", "Selah", "Follow God", "Closed on Sunday", "On God", "Everything We Need", "Water", "God Is", "Hands On", "Use This Gospel", "Jesus Is Lord"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Kanye_West_-_Jesus_Is_King.png/220px-Kanye_West_-_Jesus_Is_King.png',
        alt: 'JiK',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/0FgZKfoU2Br5sHOfvZKTI9?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'jis'
    },
    {
        title: 'Donda',
        dataName: '10',
        description: [
            "Donda Chant", "Jail", "God Breathed", "Off The Grid", "Hurricane", "Praise God", "Jonah", "Ok Ok", "Junya", "Believe What I Say", "24", "Remote Control",
            "Moon", "Heaven and Hell", "Donda", "Keep My Spirit Alive", "Jesus Lord", "New Again", "Tell The Vision", "Lord I Need You", "Pure Souls", "Come to Life",
            "No Child Left Behind", "Life Of The Party"
        ],
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Almost_black_square_020305.png/640px-Almost_black_square_020305.png',
        alt: 'Donda',
        source: `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5CnpZV3q5BcESefcB3WJmz?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        `,
        class: 'donda'
    }
];

arrOfDatas.forEach(item => {
    renderAsideItems(item);
});

function renderAsideItems(item) {
    aside.innerHTML += `
        <button class='asideBtn' data-attribute='${item.dataName}'>${item.title}</button>
    `;
}

let asideBtn = document.querySelectorAll('.asideBtn');
document.querySelector('.asideBlock').addEventListener('click', function(e) {
    if (e.target && e.target.classList == 'asideBtn') {
        renderMain(e);
    }
})


function renderMain(event) {
    if (!event) {
        asideBtn[0].classList.add('clicked');
        addToMain(arrOfDatas[0]);

        return;
    }

    document.querySelector('.asideBtn.clicked').classList.remove('clicked');
    event.target.classList.add('clicked');
    let thatTarget = event.target.dataset.attribute;
    main.innerHTML = '';

    let mainItem = arrOfDatas.find(function({dataName}) {
        return dataName === thatTarget;
    });

    addToMain(mainItem);
}
renderMain();


function addToMain(item) {
    content.classList = "";
    content.classList.add('content', item.class);

    main.innerHTML = `
        <div class='mainHeader'>${item.title}</div>
        <div class='mainContent'>
            <div class='mainDescr'></div>
            <img class='mainImg' src='${item.img}' alt='${item.alt}' />
        </div>
        <div class='mainSource'>${item.source}</div>
    `;

    document.querySelector('.mainDescr').append(createOl(item));
}

function createOl(item) {
    let ol = document.createElement('ol');
    ol.classList.add('mainDescrOl');
    item.description.forEach(el => {
        let li = document.createElement('li');
        li.classList.add('mainDescrLi');
        li.textContent = el;
        ol.append(li);
    });

    return ol;
}

