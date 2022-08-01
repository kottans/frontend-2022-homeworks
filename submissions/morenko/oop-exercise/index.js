// создадим родительский класс WorldInhabitant
class WorldInhabitant {
  // объявляем метод конструктор (ожидаем на входе значения, список свойств жителя)
  constructor(name, species, gender, saying) {
    // инициализация полей
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.saying = saying;
  }
  // объявление метода toString()
  // toString() возвращает строку, представляющую объект
  // обращение к собственному атрибуту через this
  toString() {
    return `${this.name}; ${this.species}; ${this.gender}; ${this.saying}; `;
  }
}

// создадим два класса наследующие от родительского часть свойств
class Human extends WorldInhabitant {
  constructor(name, species, gender, saying, legs, hands) {
    super(name, species, gender, saying); //наследуем поля от родителя, и добавляем еще два поля
    this.legs = 2 || legs;
    this.hands = 2 || hands;
  } 
  toString() {
    return super.toString() + `${this.legs}; ${this.hands};`
  }
}

class Animal extends WorldInhabitant {
  // наследуем четыре свойства от родителя и добавляем лапы для животных
  constructor(name, species, gender, saying, paws) {
    super(name, species, gender, saying) //наследуем поля от родителя, и добавляем еще два поля
    this.paws = 4 || paws;
  }
  toString(){
    return super.toString() + `${this.paws}; `
  }
}

// создаем экземпляр жителя и передаем параметр
// этот экземпляр с собственным состоянием свойств класса
const man = new Human(
  'human',
  'Joey',
  'male',
  'Hi',
);

// создаем новый экземпляр жителя
const woman = new Human(
  'human',
  'Rey',
  'female',
  'Bye',
);

// создаем новый экземпляр жителя
const cat = new Animal(
  'cat',
  'Allen',
  'female',
  'Mau',
);
  
// создаем новый экземпляр жителя
const dog = new Animal(
  'dog',
  'Johnny',
  'male',
  'Woof',
);

[man, woman, cat, dog].map(el => print(el));
