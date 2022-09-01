const mainContent = document.querySelector('.content');
const navigation = document.querySelector('.cards');
const startHeader = document.querySelector('.header');
const startNav = document.querySelector('.menu');
const resetBtn = document.querySelector('.reset-btn');
const burgenBtn = document.querySelector('.burger');
const burgenIcon = document.querySelector('.burger-icon');
const footer = document.querySelector('.footer');


const data = {
    'Sky Diving': {
        img: 'img/sky_diving.jpg',
        text: "<p class='content-text__item'>The sport traces its beginnings to the descents made from a hot-air balloon by the French aeronaut André-Jacques Garnerin in 1797, but modern skydiving is usually performed from a propeller-driven airplane. At events such as the annual World Free Fall Convention in Quincy, Illinois, however, parachutists are afforded the opportunity to jump from such diverse craft as hot-air balloons, helicopters, and a Boeing 727.</p><p class='content-text__item'>Typical jump altitudes in modern times for experienced skydivers range from 7,500 to 15,000 feet (2,300 to 4,600 metres) above ground level, yielding a freefall time of between 40 and 85 seconds.</p>",
    },
    'Wingsuit Flying': {
        img: 'img/wingsuit_flying.jpg',
        text: "<p class='content-text__item'>The sport of skydiving using a webbing-sleeved jumpsuit called a wingsuit to add wetted area to the diver's body and generate increased lift, which allows extended air time by gliding flight rather than just free falling. The modern wingsuit, first developed in the late 1990s, uses a pair of fabric membranes stretched flat between the arms and flanks/thighs to imitate an airfoil, and often also between the legs to function as a tail and allow some aerial steering.</p><p class='content-text__item'>Like all skydiving disciplines, a wingsuit flight almost always ends by deploying a parachute, and so a wingsuit can be flown from any point that provides sufficient altitude for flight and parachute deployment – a drop aircraft, or BASE-jump exit point such as a tall cliff or mountain top. The wingsuit flier wears parachuting equipment specially designed for skydiving or BASE jumping. While the parachute flight is normal, the canopy pilot must unzip arm wings (after deployment) to be able to reach the steering parachute toggles and control the descent path.</p>",
    },
    'Gliding': {
        img: 'img/gliding.jpg',
        text: "<p class='content-text__item'>Gliding is a recreational activity and competitive air sport in which pilots fly unpowered aircraft known as gliders or sailplanes using naturally occurring currents of rising air in the atmosphere to remain airborne. The word soaring is also used for the sport.</p><p class='content-text__item'>Gliding as a sport began in the 1920s. Initially the objective was to increase the duration of flights but soon pilots attempted cross-country flights away from the place of launch. Improvements in aerodynamics and in the understanding of weather phenomena have allowed greater distances at higher average speeds. Long distances are now flown using any of the main sources of rising air: ridge lift, thermals and lee waves. When conditions are favourable, experienced pilots can now fly hundreds of kilometres before returning to their home airfields; occasionally flights of more than 1,000 kilometres (621 mi) are achieved.</p><p class='content-text__item'>Some competitive pilots fly in races around pre-defined courses. These gliding competitions test pilots' abilities to make best use of local weather conditions as well as their flying skills. Local and national competitions are organized in many countries, and there are biennial World Gliding Championships. Techniques to maximize a glider's speed around the day's task in a competition have been developed, including the optimum speed to fly, navigation using GPS and the carrying of water ballast. If the weather deteriorates pilots are sometimes unable to complete a cross-country flight.</p>"
    },
    'Hang gliding': {
        img: 'img/hang_gliding.jpg',
        text: "<p class='content-text__item'>The air sport or recreational activity in which a pilot flies a light, non-motorised foot-launched heavier-than-air aircraft called a hang glider. Most modern hang gliders are made of an aluminium alloy or composite frame covered with synthetic sailcloth to form a wing. Typically the pilot is in a harness suspended from the airframe, and controls the aircraft by shifting body weight in opposition to a control frame.</p><p class='content-text__item'>Early hang gliders had a low lift-to-drag ratio, so pilots were restricted to gliding down small hills. By the 1980s this ratio significantly improved, and since then pilots have been able to soar for hours, gain thousands of feet of altitude in thermal updrafts, perform aerobatics, and glide cross-country for hundreds of kilometers. The Federation Aeronautique Internationale and national airspace governing organisations control some regulatory aspects of hang gliding. Obtaining the safety benefits of being instructed is highly recommended and indeed a mandatory requirement in many countries.</p>",
    },
    'Paragliding': {
        img: 'img/paragliding.jpg',
        text: "<p class='content-text__item'>The recreational and competitive adventure sport of flying paragliders: lightweight, free-flying, foot-launched glider aircraft with no rigid primary structure. The pilot sits in a harness or lies supine in a cocoon-like 'pod' suspended below a fabric wing. Wing shape is maintained by the suspension lines, the pressure of air entering vents in the front of the wing, and the aerodynamic forces of the air flowing over the outside.</p><p class='content-text__item'>Despite not using an engine, paraglider flights can last many hours and cover many hundreds of kilometres, though flights of one to two hours and covering some tens of kilometres are more the norm. By skillful exploitation of sources of lift, the pilot may gain height, often climbing to altitudes of a few thousand metres.</p>",
    },
    'Canopy Piloting': {
        img: 'img/canopy_piloting.jpg',
        text: "<p class='content-text__item'>Canopy Piloting is a high speed discipline involving small and very agile parachutes and highly trained pilots to fly them. The competitions are held over a stretch of water for safety reasons and can be watched from just a few meters away from the ground. The athletes accelerate their parachutes by flying one or more steep turns and then plain out over the surface of the water to enter the course. Three classic disciplines define the champion of canopy piloting, that is Accuracy, Speed and Distance.</p>",
    },
};

function createNavigation(item) {
    for (item in data) {
        let navItem = document.createElement('li');
        navItem.classList.add('cards__item');

        let h3 = document.createElement('h3');
        h3.classList.add('cards__title');
        h3.textContent = item;
        navItem.appendChild(h3);

        navigation.append(navItem);
    }
}

function createSideNavigation() {
    startHeader.classList.remove('header-active');
    startNav.classList.remove('start-menu');
    startNav.classList.add('side-menu');
    resetBtn.classList.remove('non-active');
    mainContent.classList.remove('non-active');
    burgenBtn.classList.remove('non-active');

    if (!mainContent.classList.contains('non-active')) {
        footer.classList.add('footer--element-end');
    }
}

function goToStartPage() {
    startHeader.classList.add('header-active');
    startNav.classList.remove('side-menu');
    startNav.classList.add('start-menu');
    resetBtn.classList.add('non-active');
    mainContent.classList.add('non-active');
    burgenBtn.classList.add('non-active');
    startNav.classList.add('_start--marker');
    document.body.classList.remove('_scroll-lock');
    burgenIcon.classList.remove('burger-icon--active');
    footer.classList.remove('footer--element-end');
}

function burgerHandler() {
    document.body.classList.toggle('_scroll-lock');
    startNav.classList.toggle('side-menu--active');
    burgenBtn.classList.toggle('burger--white');
    burgenIcon.classList.toggle('burger-icon--active');
}

function navigationHandler(event) {
    if (startHeader.classList.contains('header-active') && startNav.classList.contains('start-menu')) {
        createSideNavigation();
        createContent(event.target.textContent);
    }

    if (startNav.classList.contains('_start--marker')) {
        startNav.classList.remove('side-menu--active');
        startNav.classList.remove('_start--marker');
        burgenBtn.classList.remove('burger--white');
        burgenIcon.classList.remove('burger-icon--active');
    }

    if (startNav.classList.contains('side-menu--active')) {
        startNav.classList.remove('side-menu--active');
        startNav.classList.remove('_start-marker');
        burgenBtn.classList.remove('burger--white');
        document.body.classList.remove('_scroll-lock');
        burgenIcon.classList.remove('burger-icon--active');
    }

    createContent(event.target.textContent);
}

function createContent(item) {
    mainContent.innerHTML = '';

    const img = document.createElement('img');
    img.classList.add('content-img');
    img.setAttribute('src', data[item].img);
    mainContent.append(img);

    const title = document.createElement('h2');
    title.classList.add('content-title');
    title.textContent = item;
    mainContent.append(title);

    const text = document.createElement('div');
    text.classList.add('content-text');
    text.innerHTML = data[item].text;
    mainContent.append(text);
}

function main() {
    createNavigation();
    navigation.addEventListener('click', navigationHandler);
    resetBtn.addEventListener('click', goToStartPage);
    burgenBtn.addEventListener('click', burgerHandler);
}

main();