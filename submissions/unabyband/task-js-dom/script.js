//DOM functions here

const content = {
    textContent: [
      "Color temperature is 8000K and above.<br>This is intended for bright days and adds a bit of a warmer effect on your photographs.",
      "Color temperature is between 6500K and 8000K.<br>Shade causes colors to look even more blue than clouds, so this setting will add even more warmth!",
      "Color temperature is between 6000K and 7000K.<br>Clouds act as a diffuser over the sun and can cast images to be a bit on the blue side. This color temp affects then the Sun is about on noon",
      "Color temperature is between 5000K and 6000K.<br>This white balance is intended for artificial light, it combats any color casts that may arise out of using flashes, strobes, and speedlites.",
      "Color temperature is between 4000K and 5000K.<br>The least liked type of lighting for photographers, fluorescent lights turn your subject green or cyan-ish and very sickly colors. This white balance brings back a natural look to your images.",
      'Color temperature is between 3000K and 4000K.<br>The period of daytime during which daylight is redder and softer than when the sun is higher in the sky. This time is also called the "golden hour", by most of videographers and photographers, who adore to shoot during this period.',
      "Color temperature is between 2000K and 3000K.<br>These lights are fairly common in indoor settings. These lights are very warm, so the white balance<br>setting will counteract by cooling the colors down.",
      "Color temperature is about 2000K and below.<br>This is the most warm color from visible spectre. Candles, campfires and some other natural sources can create it. It also usually has lowest intensity from another ranges of light.",
    ],
    imgContent: [
      ['src/bright_sun.jpg', 'Clear Sky'],
      ['src/summer_shade.jpg', 'Shade or Clouds'],
      ['src/day_light.jpg', 'Day light'],
      ['src/studio_light.jpg', 'Studio flashlights'],
      ['src/fluo_light.jpg', 'Moon light'],
      ['src/sunset.jpg', 'Sunrise ot sunset'],
      ['src/lamps_light.jpg', 'Electric lamp light'],
      ['src/candle_light.jpg', 'Candle light'],
    ],
    colorContent: ["blue", "skyblue", "lightblue", "white", "gray", "yellow", "gold", "orange"],
  };
  
const selectors = document.querySelectorAll('.side-menu-item');
let previousStyle = 'default';

selectors.forEach((selector) => selector.onclick = function () {
  let tabIndex = selector.dataset.tab;
  document.querySelector(".content").innerHTML = 
  `<span class="inner-text">
  <img src="${content.imgContent[tabIndex][0]}" alt="${content.imgContent[tabIndex][1]}">
  <br>${content.textContent[tabIndex]}</span>`;

  document.querySelector(".content").classList.replace(previousStyle, content.colorContent[selector.dataset.tab]);
  previousStyle = content.colorContent[selector.dataset.tab];
});

  