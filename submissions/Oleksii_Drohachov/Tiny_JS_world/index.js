
catsPhrase = 'meow-meow skinbag';

const tinyWorldInhabitants = [
   {
      species: 'dog',
      name: 'Barbos',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'gav-gav kaje pes',
      friends: ['definitely everybody in the world !']
   },
   {
      species: 'cat',
      name: 'Sonya',
      gender: 'female',
      legs: 4,
      hands: 0,
      saying : catsPhrase,
      friends: ['definitely nobody except her own slaves']
   },
   {
      species: 'human',
      name: 'Oleksii',
      gender: 'male',
      legs: 2,
      hands: 2,
      saying: 'Wanna be frontend ninja in future!',
      friends: ['Alex', 'Victoria', 'every lovely kottan on the course']
   },
   {
      species: 'human',
      name: 'Victoria',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying: 'When will you bring the money to home, honey? ',
      friends: ['Natasha', 'Katya', 'Lada']
   },
   {
      species: 'catWoman',
      name: 'Anjela',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying : catsPhrase,
      friends: ['definitely nobody except her own slaves, she\'s a cat, you know...']
   }
]


   function formOutput(obj) {

      const outputArr = [obj.species, obj.name, obj.gender, obj.legs, obj.hands, obj.saying, obj.friends];

      for (let i = 0; i < outputArr.length; i++) {
         if (Array.isArray(outputArr[i])) {
            outputArr[i] = outputArr[i].join(', ')
         }
      }

      const result = outputArr.join('; ');
      
      return result
   }
   
   tinyWorldInhabitants.forEach( item => print(formOutput(item)));




