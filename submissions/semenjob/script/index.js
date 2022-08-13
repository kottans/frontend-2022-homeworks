window.addEventListener("DOMContentLoaded", () => {
  const contentTitle = document.querySelector(".music__title"),
    contentDescr = document.querySelector(".music__descr"),
    parentItems = document.querySelector(".wrapper__list");

  const listMusicStyles = {
    Pop: {
      title: "Pop",
      desc: "Pop music is a field of mass culture, covering various forms, genres and styles of entertainment and applied music of the 2nd half of the 20th - early 21st centuries. Type of mass culture. The main features of pop music are the simplicity of the instrumental part, rhythm, emphasis on vocals.",
    },
    Kpop: {
      title: "K-pop",
      desc: "K-pop is a musical genre that originated in South Korea and incorporates elements of western electropop, hip-hop, dance music, and contemporary rhythm and blues. Starting as a musical genre, K-pop has grown into a massive musical subculture with millions of fans around the world.",
    },
    Rock: {
      title: "Rock",
      desc: "Rock generalizing name for a number of areas of popular music. The word rock (translated from English - “rock”, “sway”, “rock”) arose as an abbreviation for the name of rock and roll, chronologically the first genre of rock music, and denotes the rhythmic sensations characteristic of rock and roll , associated with a certain form of movement, by analogy with roll, twist, swing, shake. Most often (but not necessarily) rock is performed using electric guitars and drums. For rock musicians, it is typical to perform compositions of their own composition. However, these elements alone do not make music rock, and therefore the belonging of some styles of music to rock is disputed..",
    },
    lternative: {
      title: "lternative Rock",
      desc: "Alternative rock is a genre of rock music that emerged from the musical underground of the 1980s and became popular in the 1990s and 2000s. In this case, the word 'alternative' implies the antithesis of mainstream rock music.",
    },
    Dance: {
      title: "Dance/Electronic",
      desc: "Electronic dance music is a wide range of genres and styles of electronic music aimed primarily at the entertainment industry. EDM is the backbone of musical accompaniment for nightclubs and electronic music festivals.",
    },
    Classical: {
      title: "Classical music",
      desc: "Classical music is exemplary musical works, the golden fund of world musical culture. Classical musical works combine depth, content, ideological significance with the perfection of form..",
    },
    Rap: {
      title: "Hip-hop and Rap",
      desc: "Hip hop, also hip hop music or rap music, is a genre of popular music developed in the United States by African Americans and Hispanics living in the poorer parts of the Bronx in New York City in the 1970s.",
    },
  };

  parentItems.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("wrapper__item")) {
      const musicType = target.dataset.type;
      const music = listMusicStyles[musicType];
      contentTitle.innerText = music.title;
      contentDescr.innerText = music.desc;
    }
  });

  function createMusicStyleElement(musicStyleName) {
    const musicStyle = document.createElement("div");
    musicStyle.classList.add("wrapper__item");
    musicStyle.innerText = musicStyleName;
    musicStyle.dataset.type = musicStyleName;
    return musicStyle;
  }
  Object.keys(listMusicStyles).forEach((listMusicStyles) => {
    const musicStyle = createMusicStyleElement(listMusicStyles);
    parentItems.append(musicStyle);
  });
});
