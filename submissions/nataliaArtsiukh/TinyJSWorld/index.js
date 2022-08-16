const man = {
   hands: 2,
   legs: 2,
   name: 'Bob',
   gender: 'male',
   saying: 'I\'m vegan',
   friends: 'no one'
 };
 const woman = {
   hands: 2,
   legs: 2,
   name: 'Mary',
   gender: 'female',
   saying: 'Hi everyone',
   friends: 'Tom, Rex, Halle'
 };
 const cat = {
   hands: 0,
   legs: 4,
   name: 'Tom',
   gender: 'male',
   saying: 'Mrrrr',
   friends: 'Mary, Halle'
 };
 const dog = {
   hands: 0,
   legs: 4,
   name: 'Rex',
   gender: 'male',
   saying: 'Woof',
   friends: 'Mary'
 };
 const catwoman = {
   __proto__:cat,
   hands: 2,
   legs: 2,
   name: 'Halle',
   gender: 'female',
   friends: 'Mary, Tom, Batman'
 };
 
 const habitants = [man, woman, cat, dog, catwoman];
 
 habitants.forEach(({ saying, name, gender, hands, legs, friends }) => print(`${saying}! My name is ${name}. I'm ${gender}. I have ${hands} hands and ${legs} legs. I'm friends with ${friends}.`));
