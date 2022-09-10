/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const PROPS = [
  "species",
  "name",
  "gender",
  "legs",
  "hands",
  "saying",
  "friends",
];
const SPECIES = { DOG: "dog", CAT: "cat", HUMAN: "human" };
const GENDER = { MALE: "male", FEMALE: "female" };
let createHabitat = (species, name, gender, legs, hands, saying) => {
  const data = {
    species,
    name,
    gender,
    legs,
    hands,
    saying,
    friends: [],
    addFriend,
    toString: () => {
      let info = [species, name, gender, legs, hands, saying].join("; ");
      if (data.friends.length > 0) {
        info += "; ";
        let friendList = data.friends.reduce((list, friend) => {
          list.push(friend.species + " " + friend.name);
          return list;
        }, []);

        info += friendList.join(", ");
      }
      return info;
    },
  };
  return data;
};

const dog = createHabitat(SPECIES.DOG, "Sharik", GENDER.MALE, 4, 0, "gav-gav!");
const cat = createHabitat(SPECIES.CAT, "Murka", GENDER.FEMALE, 4, 0, "Myau");
const man = createHabitat(
  SPECIES.HUMAN,
  "Igor",
  GENDER.MALE,
  2,
  2,
  "Hello, everebody!"
);

const woman = createHabitat(
  SPECIES.HUMAN,
  "Nata",
  GENDER.FEMALE,
  2,
  2,
  "Hi. My name is Nata"
);

const catWoman = createHabitat(
  SPECIES.HUMAN,
  "Margo",
  GENDER.FEMALE,
  2,
  2,
  cat.saying
);

function addFriend(friend) {
  this.friends.push(friend);
  friend.friends.push(this);
}

dog.addFriend(cat);
man.addFriend(cat);
man.addFriend(woman);
habitats.push(dog, cat, man, woman, catWoman);
// ======== OUTPUT ========
habitats.forEach((habitat) => {
  print(habitat);
});

/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
