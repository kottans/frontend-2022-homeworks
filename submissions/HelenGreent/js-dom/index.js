const herbs = [
  {
    name: "Aconitum",
    blossoming: "June-August",
    location: "North America, Europe, and Asia",
    image: "https://media.istockphoto.com/photos/wildflowers-picture-id846069016?k=20&m=846069016&s=612x612&w=0&h=dN4M66iDCb8sT-eZq-k4omrBjno0jzvBKMLKwYh0s9g=",
    desc: "Aconitum  also known as aconite, monkshood, wolf's-bane, leopard's bane, mousebane, women's bane, devil's helmet, queen of poisons, or blue rocket, is a genus of over 250 species of flowering plants belonging to the family Ranunculaceae. These herbaceous perennial plants are chiefly native to the mountainous parts of the Northern Hemisphere in North America, Europe, and Asia; growing in the moisture-retentive but well-draining soils of mountain meadows. Most Aconitum species are extremely poisonous and must be handled very carefully.[4] Several Aconitum hybrids, such as the Arendsii form of Aconitum carmichaelii, have won gardening awards—such as the Royal Horticultural Society's Award of Garden Merit.",
  },
  {
    name: "Artemisia",
    blossoming: "June-September",
    location: "Mediterranean regions in Northern Africa, Western Asia and Southwestern Europe",
    image: "https://semena.in.ua/content/images/22/480x480l50nn0/polin-lekarstvennaya-fasovka-01-g-84836489796055.jpg",
    desc: "This species of sagebrush is widely used in herbal medicine for its antiseptic, vermifuge and antispasmodic properties. Artemisia herba-alba was reported as a traditional remedy of enteritis, and various intestinal disturbances, among the Bedouins in the Negev desert. Based on laboratory assays, essential oil showed antibacterial activity, as well as, antispasmodic activity on rabbits and cytotoxic effect on cancer cells.Artemisia herba-alba based teas were used in Iraqi folk medicine for the treatment of diabetes mellitus. An aqueous extract of aerial parts of the plant has shown a hypoglycemic effect in alloxan-induced diabetic rabbits and mice.",
  },
  {
    name: "Ambrosia",
    blossoming: "June",
    location: "America and Southwestern Europe",
    image: "https://svidok.info/sites/default/files/ambroziya.jpg",
    desc: "Ambrosia artemisiifolia, with the common names common ragweed, annual ragweed, and low ragweed, is a species of the genus Ambrosia native to regions of the Americas. The species name, artemisiifolia, is given because the leaves were thought to bear a resemblance to the leaves of Artemisia, the true wormwoods. It has also been called the common names: American wormwood, bitterweed, blackweed, carrot weed, hay fever weed, Roman wormwood, short ragweed, stammerwort, stickweed, tassel weed.",
  },
  {
    name: "Belladonna",
    blossoming: "June-August",
    location: "Europe, North Africa, and Western Asia",
    image: "https://www.jnsm.com.ua/ures/book/img/belladonna.jpg",
    desc: "Belladonna is one of the most toxic plants known, and its use by mouth increases risk in numerous clinical conditions, such as complications of pregnancy, cardiovascular diseases, gastrointestinal disorders, and psychiatric disorders, among others.Atropa belladonna, commonly known as belladonna or deadly nightshade, is a toxic perennial herbaceous plant in the nightshade family Solanaceae,[1] which also includes tomatoes, potatoes, and eggplant (aubergine). It is native to Europe, North Africa, and Western Asia. Its distribution extends from Great Britain in the west to western Ukraine and the Iranian province of Gilan in the east. It is also naturalised or introduced in some parts of Canada and the United States.",
  },
  {
    name: "Hyoscyamus niger",
    blossoming: "June-August",
    location: "Europe and Siberia, Great Britain, Ireland",
    image: "https://herbalapothecaryuk.com/wp-content/uploads/2020/07/3086_fresh.jpg",
    desc: "Hyoscyamus niger, commonly known as henbane, black henbane, or stinking nightshade, is a plant that is poisonous in large quantities, in the nightshade family Solanaceae. It is native to temperate Europe and Siberia, and naturalised in Great Britain and Ireland. Henbane ingestion by humans is followed simultaneously by peripheral inhibition and central stimulation.[14] Common effects of henbane ingestion include hallucinations,[2] dilated pupils, narcosis, restlessness, and flushed skin. Less common effects are tachycardia, convulsions, vomiting, hypertension, hyperpyrexia, and ataxia. Initial effects typically last for three to four hours, while aftereffects may last up to three days. The side effects of henbane ingestion are dryness in the mouth, confusion, visual illusions, bizarre thoughts, locomotor and memory disturbances, and farsightedness, similar in style to those of other tropane-based deliriants such as plants of the New World genus datura. As a result of this distinct chemical and pharmacological profile, overdoses can result not only in delirium, but also severe anticholinergic syndrome, coma, respiratory paralysis, and death. Low and average dosages have inebriating and aphrodisiac effects.",
  },
];

const main = document.querySelector("#main");
const nav = document.querySelector("#nav");

let navLinks = herbs.map((herb) => `<li class ='nav_item'><a href='#'>${herb.name}</a></li>`).join("");
nav.innerHTML = navLinks;

function createArticle(item) {
  const article = document.createElement("article");
  article.className = "article";
  article.innerHTML = `
    <div class='article-wrapper'>
    <div class = 'article-desc'>
        <div><h2>Name: </h3><span> ${item.name}</span></div>
        <div><h2>Blossom time: </h3><span> ${item.blossoming}</span></div>
        <div><h2>Location: </h3><span> ${item.location}</span></div>
    </div>
    <figure>
        <img class='image' src='${item.image}' alt='${item.name}'/>
        <figcaption class='figcaption'>${item.name}</figcaption>
    </figure>
    </div>
    <p class='description'>${item.desc}</p>`;
  return article;
}

nav.addEventListener("click", (event) => {
  let currentLink;
  if (event.target.innerText !== currentLink) {
    currentLink = event.target.innerText;
    main.innerHTML = "";
    main.appendChild(
      createArticle(herbs.find((item) => item.name === event.target.innerText))
    );
  }
});
