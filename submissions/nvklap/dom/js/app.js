const taskmasterData = [
  {
    id: 0,
    title: 'Taskmaster',
    img: './img/series-promo.jpg',
    alt: 'Series promo picture',
    series: 'TV series',
    cast: ['Alex Horne', 'Greg Davies'],
    text: [
      "Taskmaster is a British comedy panel game show created by comedian and musician Alex Horne and presented by both Horne and Greg Davies. In the programme a group of five celebrities – mainly comedians – attempt to complete a series of challenges, with Horne acting as umpire in each challenge and Davies judging the work and awarding points based on contestants' performances. The concept for the programme was first created by Horne for the Edinburgh Festival Fringe in 2010; he later secured a deal with Dave to adapt it for television with the first episode premiering in 2015. After the ninth series in 2019 the programme was acquired by Channel 4 who commissioned six new series to be broadcast over the following three years.",
    ],
  },
  {
    id: 1,
    title: 'Melon Buffet',
    img: './img/series-1.jpg',
    alt: 'Series 1 promo picture',
    series: 'Series 1',
    cast: [
      'Frank Skinner',
      'Josh Widdicombe',
      'Roisin Conaty',
      'Romesh Ranganathan',
      'Tim Key',
    ],
    text: [
      "The first series was aired during 2015 on Dave for six episodes, between 28 July to 1 September. The contestants for this series were Frank Skinner, Josh Widdicombe, Roisin Conaty, Romesh Ranganathan and Tim Key, with the series' overall winner being Widdicombe – both Skinner and Ranganathan tied as runner-ups, Key placed fourth, and Conaty finished in last place. During its broadcast, the series averaged over 420,000 viewers. Following his participation, Key later went on to provide assistance with production of the programme in future series.",
      'For the team tasks, the team of three consisted of Widdicombe, Conaty and Ranganathan, while the team of two consisted of Skinner and Key.',
    ],
  },
  {
    id: 2,
    title: 'Fear of Failure',
    img: './img/series-2.jpg',
    alt: 'Series 2 promo picture',
    series: 'Series 2',
    cast: [
      'Doc Brown',
      'Joe Wilkinson',
      'Jon Richardson',
      'Katherine Ryan',
      'Richard Osman',
    ],
    text: [
      "The second series was broadcast during 2016 for five episodes, between 21 June to 19 July. This series started the tradition of awarding a golden trophy of Greg Davies' head, unlike the previous season's prize, won by Josh Widdicombe, which had been a generic sports trophy. The contestants for this series were Doc Brown, Joe Wilkinson, Jon Richardson, Katherine Ryan and Richard Osman, with the series' overall winner being Ryan – Richardson ended as the runner-up, Osman placed 3rd, Brown placed 4th, and Wilkinson finished last. During its broadcast, the series averaged over 710,000 viewers.",
      'For the team tasks, the team of three consisted of Ryan, Brown and Wilkinson, while the team of two consisted of Osman and Richardson.',
      'Previous contestant Josh Widdicombe appeared in episode 3 to aid Osman and Richardson in a team task.',
    ],
  },
  {
    id: 3,
    title: 'A Pea in a Haystack',
    img: './img/series-3.jpg',
    alt: 'Series 3 promo picture',
    series: 'Series 3',
    cast: [
      'Al Murray',
      'Dave Gorman',
      'Paul Chowdhry',
      'Sara Pascoe',
      'Rob Beckett',
    ],
    text: [
      "The third series was broadcast during 2016 for five episodes, between 4 October to 1 November; it was initially planned for 2017, but was aired earlier due to improved viewing figures for the programme after the second series. The contestants for this series were Al Murray, Dave Gorman, Paul Chowdhry, Rob Beckett and Sara Pascoe, with the series' overall winner being Beckett – Gorman ended as the runner-up, Murray placed 3rd, Pascoe placed 4th, and Chowdhry finished last. During its broadcast, the series averaged over 930,000 viewers.",
      'For the team tasks, the team of three consisted of Murray, Gorman and Chowdhry, while the team of two consisted of Beckett and Pascoe.',
      'Broadcaster and writer Ben Fogle made a cameo appearance in episode 5 due to coincidentally being in the same location during filming of a task.',
    ],
  },
  {
    id: 4,
    title: 'A Fat Bald White Man',
    img: './img/series-4.jpg',
    alt: 'Series 4 promo picture',
    series: 'Series 4',
    cast: [
      'Hugh Dennis',
      'Joe Lycett',
      'Lolly Adefope',
      'Mel Giedroyc',
      'Noel Fielding',
    ],
    text: [
      "The fourth series was broadcast during 2017 for eight episodes, between 25 April to 13 June. The contestants for this series were Hugh Dennis, Joe Lycett, Lolly Adefope, Mel Giedroyc and Noel Fielding, with the series' overall winner being Fielding – Lycett ended as the runner-up, Giedroyc placed 3rd, Dennis placed 4th, and Adefope finished last. During its broadcast, the series averaged over 800,000 viewers.",
      'For team tasks, the team of three was made up of Lycett, Adefope and Fielding, with the team of two consisting of Dennis and Giedroyc.',
      'Former series 3 contestant Al Murray made a cameo in episode 3, and former series 1 contestant Tim Key made a cameo in episode 8.',
    ],
  },
  {
    id: 5,
    title: 'Dignity Intact',
    img: './img/series-5.jpg',
    alt: 'Series 5 promo picture',
    series: 'Series 5',
    cast: [
      'Aisling Bea',
      'Bob Mortimer',
      'Mark Watson',
      'Nish Kumar',
      'Sally Phillips',
    ],
    text: [
      "The fifth series was broadcast during 2017 for eight episodes, between 13 September to 1 November. The contestants for this series were Aisling Bea, Bob Mortimer, Mark Watson, Nish Kumar and Sally Phillips, with the series' overall winner being Mortimer – both Watson and Phillips tied as the runner-up, Bea placed 4th, and Kumar finished last. During its broadcast, the series averaged over 700,000 viewers.",
      'For team tasks, the team of three was made up of Bea, Mortimer and Phillips, with the team of two consisting of Watson and Kumar.',
    ],
  },
  {
    id: 6,
    title: 'The Old Soft Curved Padlock',
    img: './img/series-6.jpg',
    alt: 'Series 6 promo picture',
    series: 'Series 6',
    cast: [
      'Alice Levine',
      'Asim Chaudhry',
      'Liza Tarbuck',
      'Russell Howard',
      'Tim Vine',
    ],
    text: [
      "The sixth series was broadcast during 2018 for ten episodes, between 2 May to 4 July. The contestants for this series were Alice Levine, Asim Chaudhry, Liza Tarbuck, Russell Howard and Tim Vine, with the series' overall winner being Tarbuck – Vine ended as the runner-up, Howard placed 3rd, Chaudhry placed 4th, and Levine finished last. During its broadcast, the series averaged over 810,000 viewers.",
      'For team tasks, the team of three consisted of Chaudhry, Tarbuck and Vine, while the team of two was made up of Levine and Howard.',
    ],
  },
  {
    id: 7,
    title: 'The Mean Bean',
    img: './img/series-7.jpg',
    alt: 'Series 7 promo picture',
    series: 'Series 7',
    cast: [
      'James Acaster',
      'Jessica Knappett',
      'Kerry Godliman',
      'Phil Wang',
      'Rhod Gilbert',
    ],
    text: [
      "The seventh series was broadcast during 2018 for ten episodes, between 5 September to 7 November. The contestants for this series were James Acaster, Jessica Knappett, Kerry Godliman, Phil Wang and Rhod Gilbert, with the series' overall winner being Godliman – Knappett ended as the runner-up, Gilbert placed 3rd, Acaster placed 4th, and Wang finished last. During its broadcast, the series averaged over 1.2 million viewers.",
      'For team tasks, the team of three was made up of Acaster, Wang and Gilbert, with the team of two consisting of Knappett and Godliman.',
      "Previous contestant Richard Osman appeared in episode 5 as part of Acaster's attempt at a task.",
    ],
  },
  {
    id: 8,
    title: 'Hello',
    img: './img/series-8.jpg',
    alt: 'Series 8 promo picture',
    series: 'Series 8',
    cast: [
      'Iain Stirling',
      'Joe Thomas',
      'Lou Sanders',
      'Paul Sinha',
      'Sian Gibson',
    ],
    text: [
      "The eighth series was broadcast during 2019 for ten episodes, between 8 May to 10 July. The contestants for this series were Iain Stirling, Joe Thomas, Lou Sanders, Paul Sinha and Sian Gibson, with the series' overall winner being Sanders – Stirling ended as the runner-up, Thomas placed 3rd, Gibson placed 4th, and Sinha finished last. During its broadcast, the series averaged over 1.36 million viewers, the highest viewed series of the programme during its time on Dave.",
      'For team tasks, the team of three was made up of Stirling, Sanders and Sinha, with the team of two consisting of Thomas and Gibson.',
      "Previous contestant Romesh Ranganathan appeared as part of Thomas and Gibson's attempt at a task in episode 5.",
    ],
  },
  {
    id: 9,
    title: 'Join Our Cult',
    img: './img/series-9.jpg',
    alt: 'Series 9 promo picture',
    series: 'Series 9',
    cast: [
      'David Baddiel',
      'Ed Gamble',
      'Jo Brand',
      'Katy Wix',
      'Rose Matafeo',
    ],
    text: [
      "The ninth series was broadcast during 2019 for ten episodes, between 4 September to 6 November, and was the last series to be aired on Dave, before its move to Channel 4 the following year. The contestants for this series were David Baddiel, Ed Gamble, Jo Brand, Katy Wix and Rose Matafeo; due to illness, Wix was unable to attend filming of the studio segments for the fifth and sixth episodes, leading to former contestants Kerry Godliman and Katherine Ryan each standing in for these periods respectively. The series' overall winner was Gamble – Matafeo ended as the runner-up, Wix placed 3rd, Brand placed 4th, and Baddiel finished last. During its broadcast, the series averaged over 1.33 million viewers.",
      'For team tasks, the team of three was made up of Gamble, Wix and Matafeo, with the team of two consisting of Baddiel and Brand, although this changed for a live task, with Baddiel and Gamble paired up.',
    ],
  },
  {
    id: 10,
    title: "God's Haemorrhoid",
    img: './img/series-10.jpg',
    alt: 'Series 10 promo picture',
    series: 'Series 10',
    cast: [
      'Daisy May Cooper',
      'Johnny Vegas',
      'Katherine Parkinson',
      'Mawaan Rizwan',
      'Richard Herring',
    ],
    text: [
      'The tenth series consisted of ten episodes and was the first series to be broadcast on Channel 4, broadcast between 15 October and 17 December 2020. Production on the series was affected by the outbreak of the COVID-19 pandemic and was therefore the first to be filmed without a studio audience. The majority of the tasks had been filmed prior to UK going into lockdown, but some team tasks were modified to follow social distancing The panellists were Daisy May Cooper, Johnny Vegas, Katherine Parkinson, Mawaan Rizwan and Richard Herring.',
      'For most team tasks, the team of three was made up of Vegas, Parkinson and Rizwan and the team of two was made up of Cooper and Herring, although these teams changed for some live tasks.',
      'Herring was the overall winner, with Cooper as runner-up, Rizwan in 3rd, Vegas in 4th and Parkinson finishing last.',
      'During its broadcast, the series averaged over 2.83 million viewers, an improvement on previous figures as a result of its move to a channel with a broader audience.',
    ],
  },
  {
    id: 11,
    title: "It's Not Your Fault",
    img: './img/series-11.jpg',
    alt: 'Series 11 promo picture',
    series: 'Series 11',
    cast: [
      'Charlotte Ritchie',
      'Jamali Maddix',
      'Lee Mack',
      'Mike Wozniak',
      'Sarah Kendal',
    ],
    text: [
      'The eleventh series was broadcast during 2021 with the usual ten-episode format, from 18 March to 20 May, and the contestants for that series were Charlotte Ritchie, Jamali Maddix, Lee Mack, Mike Wozniak and Sarah Kendall.',
      'For team tasks in this series, the team of three was made up of Ritchie, Maddix and Kendall and the team of two was made up of Mack and Wozniak.',
      'Kendall was the overall winner, with Wozniak as runner-up, Mack in 3rd, Maddix in 4th, and Ritchie finishing last.',
      'As Britain was still dealing with the COVID-19 pandemic and maintaining strict social distancing guidelines, filming was done in compliance with these, with virtual audiences allowed to watch complete footage and their laughter tracks recorded for the final edit of an episode before it is broadcast.',
      'During its broadcast, the series averaged over 2.71 million viewers.',
    ],
  },
  {
    id: 12,
    title: 'An Imbalance in the Poppability',
    img: './img/series-12.jpg',
    alt: 'Series 12 promo picture',
    series: 'Series 12',
    cast: [
      'Alan Davies',
      'Desiree Burch',
      'Guz Khan',
      'Morgana Robinson',
      'Victoria Coren Mitchell',
    ],
    text: [
      'The contestants for the twelfth season were announced on 20 May 2021. The line-up includes Alan Davies, Desiree Burch, Guz Khan, Morgana Robinson and Victoria Coren Mitchell. It began airing from 23 September 2021.',
      'Robinson was the overall winner, with Khan as runner-up, Burch and Davies tied in 3rd, and Coren Mitchell finishing last.',
      'For team tasks in this series, the team of three was made up of Burch, Khan and Robinson and the team of two was made up of Davies and Coren Mitchell.',
      'During its broadcast, the series averaged over 2.56 million viewers.',
    ],
  },
  {
    id: 13,
    title: 'The Noise that Blue Makes',
    img: './img/series-13.jpg',
    alt: 'Series 13 promo picture',
    series: 'Series 13',
    cast: [
      "Ardal O'Hanlon",
      'Bridget Christie',
      'Chris Ramsey',
      'Judi Love',
      'Sophie Duker',
    ],
    text: [
      "Following the final of series 12 on 25 November 2021, the cast for the show's thirteenth series was announced, set to begin on 14 April 2022. Series 13 features Ardal O'Hanlon, Bridget Christie, Chris Ramsey, Judi Love and Sophie Duker.",
      "For team tasks in this series, the team of three was made up of Christie, Love and Duker and the team of two was made up of O'Hanlon and Ramsey. This season featured the first individual task to be completed as teams. Team mates were allowed to confer during this challenge even though they were competing directly against each other.",
      "Duker was the overall winner, with Ramsey as runner-up, Christie in 3rd, O'Hanlon in 4th, and Love finishing last.",
    ],
  },
];

const navWrapper = document.querySelector('.series-nav');
const contentWrapper = document.querySelector('.content');
const btnMore = document.querySelector('.btn-more');
const initSeriesId = 0;

function addNavigation(seriesData) {
  const ul = document.createElement('ul');
  ul.classList.add('series-list');
  seriesData
    .filter(({ id }) => id !== initSeriesId)
    .forEach(({ series, id }) => {
      const link = document.createElement('a');
      link.classList.add('series-link');
      link.setAttribute('href', '#');
      link.setAttribute('data-set', id);
      link.textContent = series;
      const li = document.createElement('li');
      li.classList.add('series-item');
      li.append(link);
      ul.append(li);
    });
  navWrapper.append(ul);
}

function toggleMenu() {
  const btnImg = document.querySelector('.btn-img');
  if (navList.className.includes('show')) {
    navList.classList.remove('show');
    btnImg.classList.remove('open');
  } else {
    navList.classList.add('show');
    btnImg.classList.add('open');
  }
}

function createContentImg(src, alt) {
  img = document.createElement('img');
  img.classList.add('content-img');
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  const figure = document.createElement('figure');
  figure.classList.add('content-figure');
  figure.append(img);
  return figure;
}

function createContentHeading(tag, className, text) {
  const heading = document.createElement(tag);
  heading.classList.add(className);
  heading.innerText = text;
  return heading;
}

function createContentList(castArr) {
  const ul = document.createElement('ul');
  ul.classList.add('cast-list');
  castArr.forEach((player) => {
    player = player.split(' ');
    let [firstName, ...lastName] = player;
    lastName = lastName.join(' ');
    const span = document.createElement('span');
    span.classList.add('red');
    span.innerText = firstName;
    const li = document.createElement('li');
    li.classList.add('cast-item');
    li.append(span);
    li.append(lastName);
    ul.append(li);
  });
  return ul;
}

function createContentText(paragraphsArr) {
  const paragraphsWrapper = document.createElement('div');
  paragraphsArr.forEach((text) => {
    const pTag = document.createElement('p');
    pTag.classList.add('content-text');
    pTag.innerText = text;
    paragraphsWrapper.append(pTag);
  });
  return paragraphsWrapper;
}

function createContent([{ img, alt, title, series, cast, text }]) {
  const contentImg = createContentImg(img, alt);
  const contentTitle = createContentHeading('h2', 'content-title', title);
  const contentSubtitle = createContentHeading(
    'h3',
    'content-subtitle',
    series
  );
  const contentCastList = createContentList(cast);
  const contentTexts = createContentText(text);

  return [
    contentImg,
    contentTitle,
    contentSubtitle,
    contentCastList,
    contentTexts,
  ];
}

function addTemplateToDom(parent, template) {
  parent.innerHTML = '';
  parent.append(...template);
}

function initContent(parent, seriesData) {
  const initSeries = seriesData.filter((series) => series.id === initSeriesId);
  const htmlTemplate = createContent(initSeries);
  addTemplateToDom(parent, htmlTemplate);
}

function showContent({ target }) {
  if (target.className.includes('series-link')) {
    const seriesFiltred = taskmasterData.filter(
      ({ id }) => id === Number(target.getAttribute('data-set'))
    );

    const htmlTemplate = createContent(seriesFiltred);
    addTemplateToDom(contentWrapper, htmlTemplate);

    if (document.querySelector('.active')) {
      document.querySelector('.active').classList.remove('active');
    }
    target.classList.add('active');
  }

  if (navList.className.includes('show')) {
    toggleMenu();
  }
}

addNavigation(taskmasterData);
initContent(contentWrapper, taskmasterData);

const navList = document.querySelector('.series-list');
navList.addEventListener('click', showContent);
btnMore.addEventListener('click', toggleMenu);
