window.onload = function () {
    const navigation = document.querySelector('.nav');
    const burgerButton = document.querySelector('.burger');
    const mainContent = document.querySelector('.first-content');
    burgerButton.onclick = function () {
        navigation.classList.add('nav-shown');
    }
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(function (menuItem) {
        menuItem.onclick = function (e) {
            navigation.classList.remove('nav-shown');
            createContent(e.target.textContent);
        }
    });
    function createContent(monster) {
        mainContent.innerHTML = '';
        const img = document.createElement('img');
        img.classList.add(monsters[monster].class);
        img.setAttribute('src', monsters[monster].img);
        mainContent.append(img);
        const title = document.createElement('h1');
        title.classList.add('content-title');
        title.textContent = monsters[monster].title;
        mainContent.append(title);
        const text = document.createElement('p');
        text.classList.add('content-text');
        text.textContent = monsters[monster].text;
        mainContent.append(text);
        console.log(img);

    }
    
    const monsters = {
        'Howard Phillips Lovecraft': {
            img: './img/hpl1.jpg',
            title: 'Howard Phillips Lovecraft',
            text: 'Any talk of horror history somehow inevitably turns to Howard Phillips Lovecraft, the failed writer who, after his death, suddenly found greatness that he could not even imagine in his lifetime.Only then did readers (and other writers) suddenly realize what a fundamental invention the pale guy from Providence had introduced into culture. He was not the first to guess that the worst thing is the misunderstood and inaccessible to understanding, devoid of our logic. But it was in his hands that this rule received its clearest confirmation.',
            class: 'content-img'
        },
        'Azathoth': {
            img: './img/azathoth3.png',
            title: 'Azathoth',
            text: 'Azathoth is the supreme among the Other Gods, the "formless sultan of demons" who swirls in the very center of infinity. This is the blind and insane ruler of all things, forever surrounded by the maddening howl of flutes and the roar of drums.',
            class: 'azathoth'
        },
        'Yog-Sothoth': {
            img: './img/yog-sothoth.png',
            title: 'Yog-Sothoth',
            text: 'Yog-Sothoth the All-Containing, for example, is a hodgepodge of thousands of star-like spheres (or eyes?), hanging outside the universe and commanding time.',
            class: 'yog-sothoth'
        }, 
        'Shub-Niggurath': {
            img: './img/shub-niggurath.png',
            title: 'Shub-Niggurath',
            text: 'Shub-Niggurath, which can be attributed with some success to the female gender, is considered a symbol of perverted fertility, therefore this slimy flying mass with limbs sticking out in all directions, including goat limbs, rarely appears without its brood.',
            class: 'shub-niggurath'
        },
        'Nyarlathotep': {
            img: './img/nyarlathotep.png',
            title: 'Nyarlathotep',
            text: 'Nyarlathotep is one of the few beings who is not in cosmic exile or a sleep like death. Moreover, this is perhaps the only deity capable of understanding people, communicating with them in their language and taking on a human form. His true appearance is perfectly described by Nyarlathotep\'s middle name - Creeping Chaos. That is, it is not described in any way.',
            class: 'nyarlathotep'
        },
        'Cthulhu': {
            img: './img/Cthulhu.png',
            title: 'Cthulhu',
            text: 'Cthulhu is a giant with the head of an octopus. From his underwater R\'Lyeh, he involuntarily emits radiation, muffled by the titanic water column. As R\'lyeh rises from the bottom, this influence intensifies, and waves of tantrums, suicides, and blood orgies spread across the Earth. When Cthulhu finally throws off the shackles of sleep, like death, humanity will probably complete its journey and perish.',
            class: 'cthulhu'
        }
    };

}