const data = [
  {
    name: "Abyssinian",
    id: '1',
    description: [
      `The Abyssinian - is a breed of domestic short-haired cat with a distinctive 
        "ticked" tabby coat, in which individual hairs are banded with different colors. They are also 
        known simply as Abys.`,
      `The source of the name is not because Ethiopia, formerly Abyssinia, is thought to be the 
        original home of these cats, but because the first "Abyssinians" exhibited in shows in England 
        were reported to have been imported to England from there. Its true origin — according to 
        genetic studies — is likely to have been the coast of the Indian Ocean in parts of Southeast 
        Asia and it's introduction to Abyssinia (and others) was through colonialists and merchants 
        stopping through Calcutta.`,
      `Although regarded as comparatively obscure in the past as a breed compared to others, the 
        Abyssinian ranked in 2016 among the top five most popular breeds by The Cat Fancier Association 
        and The International Cat Association. `,
      `The breed's distinctive appearance, seeming long, lean, and finely colored compared to other 
        cats, has been analogized to that of human fashion models. Personality-wise, the cats 
        traditionally display active, curious attitudes in which they frequently follow owners 
        around and encourage play. Their dog-like characteristics also involve a particular 
        sense of affection and desire for interaction. Abys have a distinctive wildcat look with 
        their ticked coat and large erect ears. They are a highly social breed and can be demanding 
        of attention. They do well in multi-cat households due to their social nature. Not a snuggly 
        lap cat, Abyssinians are in constant motion, either exploring or playing.`,
    ],
    image: "./db/aby.jpg",
  },
  {
    name: "American Bobtail",
    id: '2',
    description: [
      `The American Bobtail is an uncommon breed of domestic cat which was developed 
        in the late 1960s. It is most notable for its stubby "bobbed" tail about one-third to 
        one-half the length of a normal cat's tail. This is the result of a cat body type genetic 
        mutation affecting the tail development, similar to that of a Manx cat. The breed is not 
        related to the Japanese Bobtail despite the similar name and physical type—the breeding programs 
        are entirely unrelated, and the genetic mutation causing the bobbed tail are known to be 
        different because the mutation causing the American Bobtail's tail is dominant, whereas the 
        Japanese Bobtail tail mutation is recessive.`,
      `American Bobtails are a very sturdy breed, with both short- and long-haired coats. Their coat 
        is shaggy rather than dense or fluffy. They can have any color of eyes and coat, with a strong 
        emphasis on the "wild" tabby appearance in show animals.`,
    ],
    image: "./db/bob.jpg",
  },
  {
    name: "American Curl",
    id: '3',
    description: [
      `The American Curl is a breed of cat characterized by its unusual ears, which curl 
        back from the face toward the center of the back of the skull. The breed originated in Lakewood, 
        California, as the result of a spontaneous mutation.`
    ],
    image: "./db/curl.jpg",
  },
  {
    name: "British Longhair",
    id: '4',
    description: [
      `The British Longhair is a medium-sized, semi-long-haired breed of domestic cat, 
        originating in Great Britain.`,
      `The British Longhair is a longer-haired development from the 
        longstanding British Shorthair breed. In the mid-20th century, British Shorthairs were interbred 
        with imported long-haired varieties, like the Turkish Angora and what today is called the 
        Traditional Persian, with an aim to producing more stout and round-faced stock, while retaining 
        the short coat. As a result of this hybridization, British catteries have frequently produced 
        (generally unwanted) semi-long-haired offspring among their litters. In more recent years, 
        these have been intentionally bred (often outside the UK) to each other and sometimes to 
        standard British Shorthairs, to establish a consistent, formalized British Longhair breed.`,
    ],
    image: "./db/british-long.jpg",
  },
  {
    name: "British Shorthair",
    id: '5',
    description: [
      `The British Shorthair is the pedigreed version of the traditional British domestic 
        cat, with a distinctively stocky body, dense coat, and broad face. The most familiar colour 
        variant is the "British Blue", with a solid grey-blue coat, orange eyes, and a medium-sized 
        tail. The breed has also been developed in a wide range of other colours and patterns, including 
        tabby and colourpoint.`,
      `It is one of the most ancient cat breeds known. In modern times, it remains the most popular 
        pedigreed breed in its native country, as registered by the UK's Governing Council of the Cat 
        Fancy (GCCF). A quarter of all kittens registered with the GCCF each year are British 
        Shorthairs, making the British the most popular pedigree cat in the UK.`,
      `The breed's good-natured appearance and relatively calm temperament make it a frequent media 
        star, notably as the inspiration for John Tenniel's famous illustration of the Cheshire Cat 
        from Alice in Wonderland. The Cat Fanciers' Association profile reads: "When gracelessness is 
        observed, the British Shorthair is duly embarrassed, quickly recovering with a 'Cheshire cat 
        smile'.`,
    ],
    image: "./db/british-short.jpg",
  },
];


const content = document.querySelector(".content");

function main() {
  const sideWrap = document.querySelector(".sideWrap");
  const catList = document.createElement("ul");
  catList.className = "catList";
  data.map((cat) => {
    catList.innerHTML += `<li><div class="itemMenu" data-id="${cat.id}">${cat.name}</div></li>`;
  }).join('');
  sideWrap.appendChild(catList);

  document.addEventListener('click', function (event) {
    if(event.target.dataset.id) {
      data.map((cat) => {
        if (event.target.dataset.id === cat.id) {
          content.innerHTML = `<h2 class="titleContent">${cat.name}</h2>
                                <div class="boxImg"><img class="contentImg"src="${cat.image}" 
                                alt="${cat.name}"></div> `;
          cat.description.map((desc) => {
            content.innerHTML += `<p>${desc}</p>`;
          }).join(' ');
        }
      }).join('');
    }

    if(event.target.id === 'mainTitle') {
      content.innerHTML = `<h2 class="titleContent">Hello!</h2>
      <p>In this catalog you can see some breeds of cats with description.</p>`;
    }
  });

}



window.addEventListener('load', main);

