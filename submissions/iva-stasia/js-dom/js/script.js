'use strict';

const characters = [
  {
    id: 1,
    name: 'Cowboy Bebop',
    quote: '"Whatever happens, happens." — Spike Spiegel',
    description1: 'Cowboy Bebop (カウボーイビバップ Kaubōi Bibappu) is a Japanese animated television series, movie and other media created by Shinichiro Watanabe. Set in 2071 and centered on the adventures of a gang of bounty hunters in space, the story delves into the unresolved issues of the protagonists\' past, exploring concepts such as existentialism, boredom, loneliness, and the influence of the past.',
    description2: 'The Sessions, produced by Sunrise, aired for the first time in Japan on TV Tokyo from April 3, 1998 to June 26, 1998, but because of the controversial content of the series only 12 out of the 26 episodes produced, plus a special, aired. The totality of the episodes later aired on the satellite channel WOWOW from October 24, 1998 to April 24, 1999. Other media based on the anime includes two manga published in the magazine Asuka Fantasy DX of Kadokawa Shoten, a film titled Knockin\' on Heaven\'s Door, two video games distributed by Bandai for PlayStation and PlayStation 2, and a live-action TV series remake released on Netflix.',
    description3: 'Cowboy Bebop has gained widespread critical and commercial success both in Japan and internationally. The series has won numerous awards in the field of animation and science fiction and has been recognized for its style, characters, plot, dubbing, animation, and soundtrack. Over the years the series has unfolded as a masterpiece of Japanese animation, and many critics consider it one of the best anime of all time.',
    image:'./img/bebop.png',
    subtitle: 'The crew of the Bebop',
    extra: 'Spike Spiegel, a former affiliate of the Red Dragon, and Jet Black, a former ISSP investigator, are two bounty hunters who move from planet to planet aboard their spaceship, the Bebop. They are eventually (and hesitantly) joined by three new companions: the hyper-intelligent Pembroke Welsh Corgi Ein, the provocative scammer wanted by creditors Faye Valentine, and the eccentric and brilliant pre-adolescent hacker Radical Edward.'
  },
  {
    id: 2,
    name: 'Spike Spiegel',
    quote: '"I\'m not going there to die. I\'m going there to find out if I\'m really alive." — Spike Spiegel',
    description1: 'Spike Spiegel (スパイク・スピーゲル Supaiku Supīgeru) is a bounty hunter on a spaceship called the Bebop and travels through the space with his crew. Before becoming a bounty hunter, Spike was a member of the Red Dragon Crime Syndicate. Spike displayed many talents and abilities, including being skilled in hand-to-hand combat and martial-arts fighting.',
    description2: 'Spike was partnered with Vicious in the Red Dragon Crime Syndicate criminal organization, and the two garnered a reputation as the Syndicate\'s strongest fighters. But all that changed after Spike started a romantic affair with Vicious\' girlfriend Julia, causing the two to become bitter enemies. After finding happiness outside violence, Spike tried to leave the Syndicate, and was then forced to fake his own death and separate from Julia in order to leave. After Spike fakes his death to escape the Syndicate, Julia never arrives to rendezvous with him—instead she goes into hiding to avoid betraying him or being killed herself.',
    description3: 'Spike eventually met and teamed up with former Inter-Solar System Police (ISSP) officer and bounty hunter Jet Black, the captain of the Bebop. Spike also became a pilot and flied a converted Asteroid racer called the Swordfish II. As legal bounty hunters, Spike and Jet travel the Solar System\'s inhabited worlds hunting bounty heads across the populated planets and moons of the solar system. They are later joined by Faye Valentine, Edward, and Ein. During his adventures on board the Bebop, Spike confronted various bounty heads and had interactions with other people, including a terrorist, a deranged serial killer, and a bounty hunter styled after an American Western cowboy.',
    image: './img/spike_main.png',
    subtitle: 'Personality',
    extra: 'Spike is a slothful, nonchalant, indifferent, and lazy character. He passes the vast majority of his time on the Bebop lounging, watching TV, or sleeping. He is a hardened smoker, shown with a cigarette in his mouth in practically every shot. He repeatedly states he hates dogs, children, and women with attitudes, and is anything but happy when each one of the three joins the Bebop. On the other hand, as the series progressed, he warmed up to Edward, Ein, and Faye, all three of which fall in the category of the three things he particularly hates. He also claims to dislike cats.'
  },
  {
    id: 3,
    name: 'Faye Valentine',
    quote: '"They often say that humans can\'t live alone, but you can live pretty long by yourself. Instead of feeling alone in a group, it\'s better to be alone in your solitude." — Faye Valentine',
    description1: 'Faye Valentine (フェイ・ヴァレンタイン Fei Varentain) is a former wanted bounty head who later became a member of the bounty hunting crew aboard the Bebop. Although appearing to be no more than 23 years old, Faye is actually around 77 years old. This is because she was put into a cryogenic freeze after a space shuttle accident, wherein she spent fifty-four years in suspended animation.',
    description2: 'During her adventures on the Bebop, Faye crosses paths with Spike Spiegel and Jet Black twice and makes herself at home aboard their ship the second time around, much to the consternation and disapproval of the two men, both of whom have their own reservations about women in general.',
    description3: 'Faye is a young woman of Singaporean descent with chin-length dark purple hair and green eyes. Her frame is tall and slender, and her skin is pale. Her standard outfit consists of yellow shorts, a matching buttoned shirt, white ankle boots, flesh-colored stockings, and a loose red jacket. The Beta tape found in Speak Like A Child, suggests that Faye has changed a lot from the innocent girl she used to be. As someone who constantly lives in an environment where she must seize every opportunity to find money, dressing revealingly makes people pay more attention to her and also distracts them long enough for her to take advantage of them. She is seen doing this in many instances throughout Cowboy Bebop, with the first being her first appearance in Honky Tonk Women.',
    image: './img/faye_main.png',
    subtitle: 'Personality',
    extra: 'Faye is an arrogant and lazy character. She\'s often seen lying around while the others work on a bounty and spends a majority of her time taking care of her appearance. She presents a long series of bad habits such as pathological gambling, alcoholism, excessive consumption of cigarettes and cigars, unwarranted violence, and forcing work on others. Although for the entire duration of the series the distinctive characteristics of Faye are her sarcasm and presumption, her character noticeably develops.'
  },
  {
    id: 4,
    name: 'Jet Black',
    quote: '"Everything has a beginning and an end. Life is just a cycle of starts and stops. There are ends we don\'t desire, but they\'re inevitable, we have to face them. It\'s what being human is all about." — Jet Black',
    description1: 'Jet Black (ジェット・ブラック Jetto Burakku) is an officer of the ISSP and later bounty hunter. He partnered with Fad until losing his arm in the mid-2060s. He then captained the Bebop and led a bounty-hunting crew including himself, Spike Spiegel, Faye Valentine, and Edward. Jet Black was born on December 3, 2035, on Ganymede. He developed a love of blues through his mother and would often get advice from his grandmother as well as life lessons from his father.',
    description2: 'Jet possesses a tall, broad, and muscular appearance. He is balding and only the sides and back of his head have hair. His sideburns continue down his cheeks to form a beard, giving him a slight resemblance to Daisuke Jigen. This is compliments Spike\'s tall, lanky body that gives him a slight resemblance to Lupin III and Vicious\' wild, untamed hair. Furthermore, his love for wielding the Katana resembles Goemon Ishikawa. His left arm is a synthetic, robotic limb that seems to heighten his strength. His original limb was lost when he was ambushed by a syndicate assassin and his crooked cop partner. The metallic piece under his right eye has no known purpose, but it is not likely a cosmetic choice.',
    description3: 'He wears a flight suit most of the time but has been known to dress up for trips to a nightclub or casino. The scar on his face may imply that he has been in some fights as a cop and bounty hunter. The scar is directly over his eye, but the eye itself is apparently unharmed.',
    image: './img/jet_main.png',
    subtitle: 'Personality',
    extra: 'Jet, as the senior member of the Bebop, is presented as mature, wise, and austere. He often gives wise advice to his companions and always shows great patience for their over-the-top attitudes. In particular, he\'s very patient with Spike. On the other hand, due to Spike\'s excessive exuberance when chasing after bounties, often prevents them from collecting the total reward due to refunds caused by damage. Although everyone on the Bebop considers him kind of a father figure, a situation proved by his occasional scolding for some of his companions\' attitudes and him being the ship\'s cook.'
  },
  {
    id: 5,
    name: 'Edward',
    quote: '"Ed will introduce Ed. Full name Edward Wong Hau Pepelu Tivruski IV... Ed made up that name for Ed, isn\'t it cooool?" — Edward',
    description1: 'Edward Wong Hau Pepelu Tivruski IV (エドワード・ウォン・ハウ・ペペル・チブルスキー4世 Edowādo Won Hau Peperu Chiburusukī Yonsei), born Françoise Appledelhi and colloquially known as Radical Edward, was a child prodigy skilled in hacking originally from Earth. Her father was the cartographer Mr. Appledelhi.',
    description2: 'Edward was born on January 1, 2058 on Earth. Her father, an eccentric man who was forgetful with anything but his work, left her at a day care center in 2064 and forgot to pick her up. Edward then spent two years in the care of other people before wandering into an orphanage in 2066. Under the care of Sister Clara, she was quickly part of the family there. Her best friend during her time there was a boy named Tomato who was also passionate about computer science. She named her computer Tomato after him. Having grown up without parents, she gave herself the name Edward Wang Hwe Pepel Cybulski 4th. In 2068, Ed fled the orphanage for reasons unclear to Clara: perhaps to search for her father, or perhaps out of a desire for freedom.',
    description3: 'Ed is a skinny copper-colored teenager with tufts of bright red hair. She is drawn with red cheek marks to accentuate her youth. Edward wears a loose midriff-baring sleeveless white shirt, showing her navel, compression shorts, and never wears footwear of any kind. Once she attempted to wear socks in Mushroom Samba but she immediately lost her balance, suggesting she may have never even worn shoes. She permanently wears a pair of large green goggles on her head or dangling from her neck. The goggles hook up to her computer and allow her to "net dive". Her somewhat androgynous appearance often causes her to be mistaken for a boy.',
    image: './img/ed_main.png',
    subtitle: 'Personality',
    extra: 'Ed is an eccentric, resourceful, giggly, childlike, odd curious, happy-go-lucky and extremely intelligent teenager. Ed has many attitudes, typically manifested by eccentric geniuses, such as a great susceptibility to distraction, and a tendency to talk to herself aloud and sing nursery rhymes or other literature popular among children. She often repeats the last words of the people who spoke before her and answers questions with seemingly meaningless phrases and sometimes real nonsense.'
  },
  {
    id: 6,
    name: 'Ein',
    quote: '"Bow-wow!" — Ein',
    description1: 'Ein (アイン Ain) is a Pembroke Welsh Corgi and "data dog," meaning that his intelligence was greatly enhanced by a research facility. What exactly was done to him was not widely known. Ein became part of the Bebop crew and was a good friend of Edward.',
    description2: 'Ein was modified in a laboratory until Abdul Hakim stole him intending to sell him. Hakim put him into a briefcase and escaped the facility. While setting up a rendezvous with the buyer, the briefcase was stolen by another thief unaware of its contents. The thief went to Animal Treasure hoping to cash in but was caught by Spike Spiegel, who was looking for Hakim. The shop owner was forced to open the briefcase and Ein was revealed. Spike left, thinking it wasn\'t related to Hakim, but then Hakim soon appeared to confront the thief. He tried to grab Ein, but Ein jumped and caused a commotion which freed other animals in the shop. Hakim ran after Ein with Spike in pursuit, drawn to the commotion. Ein was able to lose Hakim and get close to Spike, who he immediately trusted, by enticing Hakim to jump onto a boat while Ein slowed Spike down while he chased after him.',
    description3: 'Spike walked Ein later as bait for Hakim, only for Ein to be drawn to a dog whistle from the research scientists who were still looking for him. Hakim saw Ein run by, and was able to grab him, rendering him unconscious, and drive away in a stolen car. Ein woke up, however, and interfered with Hakim\'s driving as he avoided Spike in the Swordfish II. Ein jumped out of the car and was fortunately saved by Spike. With Hakim captured, Ein was then part of the crew, despite Spike\'s dislike of animals.',
    image: './img/ein_main.png',
    subtitle: 'Personality',
    extra: 'Being a dog, Ein isn\'t exactly loaded with personality hooks. He tends to act like your average everyday dog—most of the time. However, he\'s very smart, and understands people perfectly, and will react to people who react negatively to him. He gets along quite well with Ed, and the two are close friends.'
  }
];

const menuSizeBttn = document.querySelector('.nav_less_bttn');
const menu = document.querySelector('.nav_bar');
const tabs = document.querySelectorAll('.tab');
const mainContent = document.querySelector('.main');
const [initialFirstHero] = characters;


const generateContent = ({name, quote, description1, description2, description3, image, subtitle, extra}) => {
  return `
    <article class="article">
      <h1 class="char_name">${name}</h1>
      <blockquote class="quote">${quote}</blockquote>
      <div class="char_description">
        <p class="descr">${description1}</p>
        <p class="descr">${description2}</p>
        <p class="descr">${description3}</p>
      </div>
    </article>
    <img src="${image}" class="char_img" alt="" />
    <div class="char_extra">
      <h2 class="exrta_info_title">${subtitle}</h2>
      <p class="extra_info">
        ${extra}
      </p>
    </div>
  `;
}

const getContent = ({target}) => {
  tabs.forEach(tab => {
    tab.classList.remove('tab_active');
  });

  if (target.closest('.tab')) {
    const tabId = target.closest('.tab').dataset.tabTarget;
    target.closest('.tab').classList.add('tab_active');
    mainContent.innerHTML = generateContent(characters.find(({id}) => id == tabId));
    menu.classList.add('nav_narrow');
  };
};

const changeMenuSize = ({target}) => {
  if (target === menuSizeBttn) {
    menu.classList.toggle('nav_narrow');
  };
};

window.addEventListener('DOMContentLoaded', () => {
  menu.addEventListener('click', getContent);
  menuSizeBttn.addEventListener('click', changeMenuSize)
  mainContent.innerHTML = generateContent(initialFirstHero);
});
