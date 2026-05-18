const
    IMAGE_URL = ['./img/cat1.jpg',
        './img/cat2.jpg',
        './img/cat3.jpg',
        './img/cat4.jpg',
        './img/cat5.jpg',
        './img/cat6.jpg',
        './img/cat7.jpg',
        './img/cat8.jpg',
        './img/cat9.jpg',
        './img/cat10.jpg'],

    LEVEL_BUTTONS = [12, 16, 20],
    CHANGE_DATA = 'changeData',
    GO_TO_MENU = 'goToMenu',
    START_GAME = 'startGame',
    END = 'end',
    NO_MACHING = 'noMaching',
    MACHING = 'Maching';


function templateStr(tpl, attributes) {
    for (var i in attributes) {
        if (attributes.hasOwnProperty(i)) {
            tpl = tpl.replace('{{' + i + '}}', attributes[i]);
        }
    }
    return tpl;
};
