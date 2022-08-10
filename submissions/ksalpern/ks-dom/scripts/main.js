const data = {
    title: 'Cartoon',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis doloribus sapiente facere, enim necessitatibus, nihil inventore repudiandae dolore dolor commodi laboriosam fuga. Eum excepturi maiores autem debitis a corporis nemo harum esse quaerat neque ipsam rem itaque accusantium cumque provident placeat tenetur, quos ducimus ipsa enim fuga fugiat.',
};

const cartoons = [
  {
    title: "Rick and Morty",
    text: "An animated series on adult-swim about the infinite adventures of Rick, a genius alcoholic and careless scientist, with his grandson Morty, a 14 year-old anxious boy who is not so smart. Together, they explore the infinite universes; causing mayhem and running into trouble.",
  },
  {
    title: "Adventure time",
    text: " A boy, Finn the human, and his adopted adoptive brother, Jake the dog, live together and go on adventures in the land of Ooo, which is filled with odd creatures and beings. The land has many kingdoms, most of which are led by a monarch. Mostly, we see princesses, which are named for their physical form. The land of Ooo is on Earth, but the planet was wiped out 1000 years ago in the Great Mushroom War, leaving behind a mutated surface and the wreckage of our civilization.",
  },
  {
    title: "Gravity Falls",
   text: "Dipper and Mabel Pines are mystery twins. They are in for when they are sent off to spend the summer with their great uncle in the mysterious town of Gravity Falls, Oregon. Upon their arrival, Dipper and Mabel's huckster great uncle, Grunkle Stan, enlists the siblings' help in running the Mystery Shack, a tourist trap he owns that overcharges unsuspecting customers. Although Dipper and Mabel quickly discover that the Mystery Shack itself is a hoax, they soon discover that there is something truly strange about their new town, and together they begin to unlock the real secrets of Gravity Falls.",
  },
];

const title = document.querySelector('.wrapper__title');
const asideList = document.querySelector('.aside__list');
const cartoonTitle = document.querySelector('.container__title');
const cartoonDesc = document.querySelector('.container__desc');

let selected;

title.addEventListener('click', function() {
    cartoonTitle.innerText = data.title;
    cartoonDesc.innerText = data.text;

    if (selected) {
        selected.classList.remove('focused');
    }
});

asideList.addEventListener('click', function(event) {
    const listTarget = event.target;
    if (listTarget.tagName === 'UL') return;
    highlightFocused(listTarget);

    const listTargetTitle = listTarget.innerText;

    const cartoon = cartoons.find(item => {
        return item.title === listTargetTitle;
    })

    cartoonDesc.innerText = cartoon.text;
    cartoonTitle.innerText = cartoon.title;
});

function highlightFocused(item) {
    if (selected) {
        selected.classList.remove('focused');
    }
    selected = item;
    selected.classList.add('focused'); 
}
