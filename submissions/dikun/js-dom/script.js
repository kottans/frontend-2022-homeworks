'use strict';
window.addEventListener("DOMContentLoaded", () => {
    const sevenWonders = {
        lavra: {
            title: 'kyiv pechersk lavra',       
            img: 'img/lavra.jpg',
            descr: "Kyiv Pechersk Lavra or the Cave Monastery is a historic Orthodox Christian monastery in Kyiv. Founded as a cave monastery in 11th century Lavra is listed in the UNESCO list of world heritage sites. It is one of the oldest and most important monasteries in the country and Eastern Europe. Its Great Lavra Belltower is one of the most notable features of the Kyiv skyline and among the main attractions of the Lavra. It was the tallest free-standing belltower at the time of its construction in 1731-1745. Its total height is 96.5 meters."
        },
        sofiyivsky: {
            title: 'sofiyivsky park',        
            img: 'img/sofiyivsky.jpg',
            descr: "Located in Uman, Cherkasy region, the park of almost 180 hectares, was founded in 1796. It is one of the world famous garden-park art creations. There are many scenic areas including waterfalls, fountains, ponds and a stone garden. It is one of the most famous examples of late 17th or early 18th century European landscape garden design that has been preserved to the present time."
        },
        castle: {
            title: 'kamyanets-podilskyi',       
            img: 'img/zamok_2019.jpg',
            descr: "It is one of the oldest cities in the country famous especially for its medieval spirit and a historic castle. Located in southwestern Ukraine Kamyanets-Podilskyi is a city boasting of marks of various nations who resided here over the history. Thanks to that the city has a Polish, Ruthenian, as well as an Armenian Market. A famous landmark is an ancient castle, and numerous architectural attractions in the city's center, including a cathedral, a city hall, and numerous fortifications. Since the late 1990s, the city has been regarded as the main tourist spot in the western Ukraine."
        },
        khortytsia: {
            title: 'khortytsia island',       
            img: 'img/khortyrsya.jpg',
            descr: "The biggest island on the Dnepr River is a unique nature and historical complex. The island is situated within the modern industrial city of Zaporizhia in the Kakhovka Reservoir and it extends from northwest to southeast for more than twelve kilometers. There are oak groves, spruce woods, meadows, and steppe. Nowadays, Khortysia is designated a national museum. The rural landscape of the island features the Zaporizhian Cossack Museum and a Cossack horse show. The museum contains exhibits dating from the Stone Age to the 20th century, including a panorama representing the Battle for Zaporizhia, fought during World War II on October 14, 1943."
        },
        chersonesos: {
            title: 'chersonesos',        
            img: 'img/khersones.jpg',
            descr: "Chersonesos was an ancient Greek colony founded approximately 2500 years ago in the southwestern part of Crimea, known then as Taurica. The ancient city is located on the shore of the Black Sea at the outskirts of Sevastopol and has been nicknamed the 'Ukrainian Pompeii'. Chersonesos' ancient ruins are presently located in one of Sevastopol's suburbs. They are today a popular tourist attraction, protected by the state as an archaeological park. The buildings mix influences of Greek, Roman and Byzantine culture. The defensive wall is hundreds of meters long. Buildings include Roman amphitheatre and a Greek temple."
        },
        sophia: {
            title: 'saint sophia cathedral',       
            img: 'img/sophia.webp',
            descr: "Chersonesos was an ancient Greek colony founded approximately 2500 years ago in the southwestern part of Crimea, known then as Taurica. The ancient city is located on the shore of the Black Sea at the outskirts of Sevastopol and has been nicknamed the 'Ukrainian Pompeii'. Chersonesos' ancient ruins are presently located in one of Sevastopol's suburbs. They are today a popular tourist attraction, protected by the state as an archaeological park. The buildings mix influences of Greek, Roman and Byzantine culture. The defensive wall is hundreds of meters long. Buildings include Roman amphitheatre and a Greek temple."
        },
        khotyn: {
            title: 'the khotyn fortress',        
            img: 'img/khotyn.jpg',
            descr: "The Khotyn Fortress is a fortification complex located on the shores of the Dniester River in Khotyn in western Ukraine. The construction of the current fortress was started in 1325. The fortress is a large tourist attraction in the area and Ukraine. Thanks to its preserved historical atmosphere the fortress is often used as a setting for movies. It has represented various French and English castles, historical locations, and fortifications. Most recently, it appeared in a Russian movie Taras Bulba, The Three Musketeers, or the Arrows of Robin Hood."
        }
    };

    const list = document.querySelector(".list_items");
    const content = document.querySelector(".content");
    
    
    
    function createListHtml(obj) {
        Object.values(obj).forEach((key) => {
            list.innerHTML += `<li class="list_item"><button class="list_btn">${key.title}</button></li>`;
        });        
    }
    createListHtml(sevenWonders);
    
    function createMainContent (key) { 
        content.innerHTML = '';  
        const titleContent = document.createElement('h2');
        titleContent.classList.add("content_title");
        titleContent.innerText = key.title;           
        content.append(titleContent);
        
        const imgContent = document.createElement('img');
        imgContent.classList.add("content_img");
        imgContent.src =  key.img;
        content.append(imgContent);

        const descrContent = document.createElement('p');
        descrContent.classList.add("content_descr");
        descrContent.innerText = key.descr;
        content.append(descrContent);          
        
    }     

   function changeContentByTitle(obj) {
    let keysNames = Object.values(obj);   

    createMainContent(keysNames[0]);

    const btns = document.querySelectorAll('.list_btn'); 

    for(let i = 0; i < btns.length; i++) {
        
        btns[i].addEventListener('click', (e) => {
            e.preventDefault();            
                       
            createMainContent(keysNames[i]);        
           
        });        
      }      
    
    }           
    changeContentByTitle(sevenWonders); 
});
    
