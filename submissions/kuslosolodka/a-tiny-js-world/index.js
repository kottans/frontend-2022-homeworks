/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: "dog",
  name: "Brovko",
  gender: "male",
  legs: 4,
  hands: undefined,
  saying: "woof-woof!",
};
const cat = {
  species: "cat",
  name: "Murka",
  gender: "female",
  legs: 4,
  hands: undefined,
  saying: "meow!",
};
const woman = {
  species: "human",
  name: "Stefania",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "I am Stefania!",
};
const man = {
  species: "human",
  name: "Marko",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "I am Marko!",
};
const cat_woman = {
  species: "supernatural",
  name: "Batgirl",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat["saying"],
};
dog.friend = `${woman.name},${man.name},${woman.name}`;
cat.friend = undefined;
woman.friend = `${man.name},${dog.name}`;
man.friend = `${woman.name},${dog.name}`;
cat_woman.friend = cat.name;
// ======== OUTPUT ========
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
const inhabitants = [dog, cat, woman, man, cat_woman];
inhabitants.map((item) => {
  let res = "";
  for (let key in item) {
    res += item[key] + ";";
  }
  print(res);
});
