import noUiSlider from './nouislider';

function rangeSlider(minAge = 20, maxAge = 60) {
    const minAgeInput = document.querySelector('.navigation-left__item-minage'),
          maxAgeInput = document.querySelector('.navigation-left__item-maxage'),
          parrentInputs = document.querySelector('.navigation-left__item-min-max-wrapper');
    const sliderValue = document.querySelector('.noUi-handle');

    let slider = document.getElementById('range-slider');
    noUiSlider.create(slider, {
        start: [minAge, maxAge],
        connect: true,
        step: 1,
        range: {
            'min': 16,
            'max': 99
        }
    });

    slider.noUiSlider.on('update', updateInputValues);

    parrentInputs.addEventListener('keyup', e => {
        let currentInput = e.target.value;
        const regExp = /\D/gi;
        if (currentInput > 99) {
            e.target.value = currentInput.substring(0, 2);
        }
        if (regExp.test(currentInput)) {
            e.target.value = '';
        }
    });

    parrentInputs.addEventListener('change', e => {
        if (e.target.classList.contains('range-parametres')) {
            if (e.target.id === 'first-input') {
                slider.noUiSlider.set([e.target.value.substring(0, 2), null]);
            } else {
                slider.noUiSlider.set([null, e.target.value]);
            }
            
        }
    });


    function updateInputValues () {
        minAgeInput.value = Math.floor(slider.noUiSlider.get()[0]);
        maxAgeInput.value = Math.floor(slider.noUiSlider.get()[1]);
    }

    return slider;
}

export default rangeSlider;
