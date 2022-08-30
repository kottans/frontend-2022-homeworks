const kaer = {
    header: "Welcome to Kaer Morhen!",
    img: "./img/kaer.webp",
    text: "From there they could see the ruins of Kaer Morhen huddled against the stone precipices - the partially demolished trapezium of the defensive wall, the remains of the barbican and gate, the thick, blunt column of the donjon.",
  };
  
  const lambert = {
    header: "Lambert",
    img: "./img/lambert.webp",
    text: "Lambert was a witcher from the School of the Wolf, active in the 13th century. Trained by Vesemir, he was known for his biting tongue, and was often rude in conversation, particularly towards Triss Merigold, addressing her only by her last name, which irritated the sorceress greatly. He did not have much use for politics, a trait common to most witchers due to their code of neutrality. He was described as being at the same age as Coën and one of the last witchers to be trained within the walls of Kaer Morhen.",
  };
  
  const eskel = {
    header: "Eskel",
    img: "./img/eskel.webp",
    text: "Eskel was a witcher of the School of the Wolf taught by Master Vesemir at Kaer Morhen and active in the 13th century. As the sorceress Triss Merigold noticed, Eskel emanated a strong magic aura. Though less famous than his peer Geralt of Rivia, Eskel became renowned in his own right as a professional, reliable witcher, and possessing a kind and relaxed disposition.",
  };
  
  const geralt = {
    header: "Geralt of Rivia",
    img: "./img/geralt.png",
    text: "Geralt of Rivia was a legendary witcher of the School of the Wolf active throughout the 13th century. He loved the sorceress Yennefer, considered the love of his life despite their tumultuous relationship, and became Ciri's adoptive father. During the Trial of the Grasses, Geralt exhibited unusual tolerance for the mutagens that grant witchers their abilities. Accordingly, Geralt was subjected to further experimental mutagens which rendered his hair white and may have given him greater speed, strength, and stamina than his fellow witchers.",
  };
  
  const vesemir = {
    header: "Vesemir",
    img: "./img/vesemir.png",
    text: "Vesemir was the oldest and most experienced witcher at Kaer Morhen in the 13th century and acted as a father figure to Geralt and the other witchers. Like many of the other witchers, he spent each winter in the fortress and set out on the path when spring arrived. He was one of the few members of the School of the Wolf to survive the assault on Kaer Morhen. By the 1260s, he was the sole old witcher remaining; however, as he was only a fencing instructor, he didn't possess the knowledge necessary to create new mutagens in order to mutate more disciples into witchers.",
  };
  
  function change(character) {
    document.getElementById("main-header").textContent = character.header;
    document.getElementById("main-img").src = character.img;
    document.getElementById("main-text").textContent = character.text;
  }
  