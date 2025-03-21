const series = [
    ['popular',
    'Разберитесь с деньгами',
    '<img id="main-img" src="images/money-problems.png">',
    'Финансовые консультанты делятся простыми советами о том, как меньше тратить и больше экономить, чтобы контролировать свои средства и достигать задуманного.'],

    ['detective',
    'Женщина живущая в доме напротив девушки в окне',
    '<img id="main-img" src="images/woman-next-door.png">',
    'В перерывах между вином, таблетками и запеканками впечатлительная Анна влюбляется в красавчика-соседа и становится свидетельницей убийства. Или ей показалось?'],

    ['comedy',
    'В лучшем мире',
    '<img id="main-img" src="images/goodplace.png">',
    'Элеанор умирает и оказывается в раю, в который попадают только очень нравственные люди. Она понимает, что ее приняли за кого-то другого.'],

    ['criminal',
    'Линкольн для адвоката',
    '<img id="main-img" src="images/lincolnlawyer.png">',
    'Микки Холлер, успешный адвокат из Лос-Анджелеса, оказавшийся вне игры после аварии, берется за дело об убийстве, чтобы вернуться в строй и за руль фирменного «Линкольна».'],

    ['fantacy',
    'Архив 81',
    '<img id="main-img" src="images/archiv81.png">',
    'Архивиста, восстанавливающего поврежденные видеозаписи, затягивает в водоворот мистических событий, связанных с исчезновением режиссера и деятельностью сатанинской секты.'],

    ['anime',
    'Дядя из другого мира',
    '<img id="main-img" src="images/another-uncle.png">',
    'После 17 лет в коме дядя Такафуми внезапно просыпается в зрелом возрасте и начинает говорить на неизвестном языке, демонстрируя магические способности.'
    ],

    [ 'main',
    'Кинозал Kottans',
    '<img id="main-img" src="images/cinema.jpg">',
    'Не знаешь что посмотреть - добро пожаловать в рандомный подбор от студента Kottans'
    ]

];

//Изменяет популярное
function popular(event) {
    document.getElementById("title").textContent = series[0][1];
    document.getElementById("image").innerHTML = series[0][2];
    document.getElementById("description").textContent = series[0][3];
};

document.getElementById("popular").addEventListener("click", popular);

//Изменяет Детективы
function detective(event) {
    document.getElementById("title").textContent = series[1][1];
    document.getElementById("image").innerHTML = series[1][2];
    document.getElementById("description").textContent = series[1][3];
};

document.getElementById("detective").addEventListener("click", detective);

//Изменяет Комедии
function comedy(event) {
    document.getElementById("title").textContent = series[2][1];
    document.getElementById("image").innerHTML = series[2][2];
    document.getElementById("description").textContent = series[2][3];
};

document.getElementById("comedy").addEventListener("click", comedy);

//Изменяет Криминал
function criminal(event) {
    document.getElementById("title").textContent = series[3][1];
    document.getElementById("image").innerHTML = series[3][2];
    document.getElementById("description").textContent = series[3][3];
};

document.getElementById("criminal").addEventListener("click", criminal);

//Изменяет Фантастику
function fantacy(event) {
    document.getElementById("title").textContent = series[4][1];
    document.getElementById("image").innerHTML = series[4][2];
    document.getElementById("description").textContent = series[4][3];
};

document.getElementById("fantacy").addEventListener("click", fantacy);

//Изменяет Аниме
function anime(event) {
    document.getElementById("title").textContent = series[5][1];
    document.getElementById("image").innerHTML = series[5][2];
    document.getElementById("description").textContent = series[5][3];
};
document.getElementById("anime").addEventListener("click", anime);

//Возвращает исходник
function mainInfo(event) {
    document.getElementById("title").textContent = series[6][1];
    document.getElementById("image").innerHTML = series[6][2];
    document.getElementById("description").textContent = series[6][3];
};
document.getElementById("main-info").addEventListener("click", mainInfo);