//DOM functions here

const obj = {
    tabindex: ['#tab-0', '#tab-1', '#tab-2', '#tab-3', '#tab-4', '#tab-5', '#tab-6', '#tab-7'], 
    textcontent:["Color temperature is 8000K and above.<br>This is intended for bright days and adds a bit of a warmer effect on your photographs.", 
                "Color temperature is between 6500K and 8000K.<br>Shade causes colors to look even more blue than clouds, so this setting will add even more warmth!",
                "Color temperature is between 6000K and 7000K.<br>Clouds act as a diffuser over the sun and can cast images to be a bit on the blue side. This color temp affects then the Sun is about on noon", 
                "Color temperature is between 5000K and 6000K.<br>This white balance is intended for artificial light, it combats any color casts that may arise out of using flashes, strobes, and speedlites.",
                "Color temperature is between 4000K and 5000K.<br>Probably the least liked type of lighting for photographers, fluorescent lights turn your subject green or cyan-ish and very sickly colors. This white balance brings back a natural look to your images.",
                'Color temperature is between 3000K and 4000K.<br>The period of daytime during which daylight is redder and softer than when the sun is higher in the sky. This time is also called the "golden hour", by most of videographers and photographers, who adore to shoot during this period.',
                "Color temperature is between 2000K and 3000K.<br>These lights are fairly common in indoor settings. These lights are very warm, so the white balance<br>setting will counteract by cooling the colors down.",
                "Color temperature is about 2000K and below.<br>This is the most warm color from visible spectre. Candles, campfires and some other natural sources can create it. It also usually has lowest intensity from another ranges of light."],
    imgcontent:['<img src="src/bright_sun.jpg" alt="Clear Sky">',
                '<img src="src/summer_shade.jpg" alt="Shade or Clouds">',
                '<img src="src/day_light.jpg" alt="Day light">',
                '<img src="src/studio_light.jpg" alt="Studio flashlights">',
                '<img src="src/fluo_light.jpg" alt="Moon light">',
                '<img src="src/sunset.jpg" alt="Sunrise ot sunset">',
                '<img src="src/lamps_light.jpg" alt="Electric lamp light">',
                '<img src="src/candle_light.jpg" alt="Candle light">'],
    colorrange:["background-image: linear-gradient(blue, deepskyblue);",
                "background-image: linear-gradient(deepskyblue, skyblue);",
                "background-image: linear-gradient(skyblue, lightblue);",
                "background-image: linear-gradient(lightblue, white, lightgray);",
                "background-image: linear-gradient(lightgray, lightgreen, yellow);",
                "background-image: linear-gradient(yellow, gold);",
                "background-image: linear-gradient(gold, darkorange);",
                "background-image: linear-gradient(orange, red);"]
            };

for (let i = 0; i < obj.tabindex.length; i++) {
    document.querySelector(obj.tabindex[i]).onclick = function () {
    document.querySelector(".content").innerHTML = 
    '<span class="inner-text">'+ obj.imgcontent[i] + '<br>' + obj.textcontent[i] + '</span>';
    document.querySelector(".content").style = obj.colorrange[i];
}
}
