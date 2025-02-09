"use strict";

// 🛑constructor functions and the new keyword
const Person = function (firstName, birthYear) {
  // console.log(this);
  this.PersonName = firstName;
  this.birthYear = birthYear;

  // NEVER DO THIS TO CREATE METHODS ❌
  //     this.calcAge = function() {
  //         console.log(2025 - this.birthYear);
  //     }
};

const athul = new Person("Athul", 2005);
console.log(athul);

// 1. first a new empty object is created
// 2. the function is called , this keyword is point  this new empty object
// 3. new created object is linked to prototype
// 4. function automatically return emmpty object

const john = new Person("john", 2000);
console.log(john);

const jack = new Person("jack", 1998);
console.log(jack);

console.log(athul instanceof Person); //retun true --we creted athul using constructor function
//////////////////////////////////////////////////////////////////////////////////////////////////////

// 🛑PROTOTYPE
// basically adding object to methods created using constructor fuction
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
athul.calcAge();
jack.calcAge();

// also used to add property
Person.prototype.species = "Homo Sapiens";
console.log(athul, jack, john);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 🛑prototypal inheritance on built in objects
console.log(athul.__proto__.__proto__);
console.log(athul.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true

console.log(arr.__proto__.__proto__);
// adding new  property
//  so all array inherits this method
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);
console.dir(h1);
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// coding challenge

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going with  ${this.speed} km/hr`);
};

Car.prototype.break = function () {
  this.speed -= 10;
  console.log(`${this.make} is going with  ${this.speed} km/hr`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make);
  Car.call(this, speed);
  this.charge = charge;
};

// Linking prototypes
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.chargeTo = chargeTo;
};

const tesla = new EV("tesla", 120, 23);
tesla.chargeBattery(90);

const bmw = new Car("BMW", 128);
const innova = new Car("INNOVA", 124);

bmw.accelerate();
bmw.accelerate();
bmw.break();
bmw.accelerate();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// 🛑 Es6 classes
// same as prototype method but in anicer and modern syntax..

// class decleration
class Personcl {
  // add a constructor method
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // adding methods
  calcAge() {
    console.log(2025 - this.birthYear);
  } // will be added to prototype prototype coz its defined outside the constructor function..

  // Get
  get age() {
    return 2025 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert("its not a full name..!");
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log(`hello there from person class`);
  }
}

const jessica = new Personcl("jessica Davis", 2005);
console.log(jessica.age);
console.log(jessica);

const mark = new Personcl("Mark zuckerberg", 1995);
console.log(Personcl);

Personcl.hey();

// also we can use ths to define methods
// Personcl.prototype.greet = function() {
//     console.log(`Hey ${this.fullName}`);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 🛑 Setters $ Getters

const account = {
  owner: "Athul",
  movements: [200, 400, 800, 500],

  // Get
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // Set
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); //500
account.latest = 5000;
console.log(account.movements.slice(-1).pop()); //50000
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

// 🛑Static method
Person.hey = function () {
  console.log(`Hey there...!`);
};

Person.hey();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 🛑 object.create
// used to create new object using an existing object --like inheritence
// same as .prototype method
const personProto = {
  calcAge() {
    console.log(2025 - this.birthYear);
  },

  // adding propery in a better way ---same as constructor function... 'init' could be any name ..!
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const mike = Object.create(personProto);
mike.name = "Mike";
mike.birthYear = 2005;
console.log(mike);
mike.calcAge();

const ammu = Object.create(personProto);
ammu.name = "Mike";
ammu.birthYear = 2009;
console.log(ammu);
ammu.calcAge();

// but lets set the property in a better way
const steven = Object.create(personProto);
steven.init("steven", 2006);
steven.calcAge();
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// 📝 coding challenge part -2
/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going with  ${this.speed} km/hr`);
  };

  break = function () {
    this.speed -= 10;
    console.log(`${this.make} is going with  ${this.speed} km/hr`);
  };

  get speedUS() {
    return this.speed / 1.6
  }

  set speedUS(speed) {
    this.speed = speed * 1.6
  }
}

const bmw = new CarCl("BMW", 128);
const innova = new CarCl("INNOVA", 124);

const ford = new CarCl('ford', 120)

bmw.accelerate();
bmw.accelerate();
console.log( ford.speedUS)
ford.accelerate()
ford.accelerate()
ford.accelerate()
ford.accelerate();
bmw.break();
ford.speedUS = 50;
console.log(ford.speedUS);
*/

//  📝coding challenge 3

//////////////////////////////////////////////////////////////////////////////////////////////

// 🛑 INHERITENCE BETWEEN CLASSES...!
//     1. using constructor function

const Man = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Man.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName; //VIOLATING DRY PRINICIPLE and not efficinet in future development
  // this.birthYear = birthYear;
  Man.call(this, firstName, birthYear); //in function decleration this keyword is undefined  to we shoul dpoint this keyword tothe student using call() function
  this.course = course;
};

// Linking prototypes...
Student.prototype.introduce = function () {
  console.log(`hey ${this.firstName},h doing my degree in ${this.course}`);
};

const visal = new Student("Visal krishna", 2005, "computer science");
console.log(visal);
visal.introduce();
///////////////////////////////////////////////////////////////

//  2. using ES6 classes.....
// here the student cclass is inheriting from person class
class student extends Personcl {
  // constructor function
  constructor(fullName, birthYear, course) {
    // Always needs to happen first
    super(fullName, birthYear); //super function- constructor function of the parent function
    this.course = course;
  }

  hi() {
    console.log(
      `hey  i am ${this.fullName}, doing my degree in ${this.course}`
    );
  }

  calcAge() {
    console.log(
      ` i am ${2025 - this.birthYear}, but as a student i feel more like older`
    );
  }
}

const sania = new student("Sania varma", 2005, "computer science");
console.log(sania);
sania.hi();
sania.calcAge(); //actually its the method that we are declared in personcl class..we can us eit

// 3. using object.create() Method
const adam = Object.create(personProto);

const studentProto = Object.create(personProto);
const ajay = Object.create(studentProto);
ajay.init("ajay", 2005, "computer sciece");
//  ajay.introduce();
ajay.calcAge();
console.clear();
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//  🛑 ANOTHER CLASS EXAMPLE.. + ENCAPSULATION -DATA PROVACY--

// PUBLIC FIELDS ( fields means PROPERTY)
// PRIVATE FIELDS
// PUBLIC METHODS
// PRIVATE METHODS

class Account {
  // public fields
  locale = navigator.language;

  // private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //  _means protected property
    this.#pin = pin;

    // this._movements = [];
    // this.locale = navigator.language;
  }

  // get movements outside
  getMovements() {
    return this.#movements;
  }

  // Depsoit methods
  depsoit(val) {
    this.#movements.push(val);
  }

  // Withdrewal value
  withdrewal(val) {
    this.#movements.push(val);
  }

  // approve loan
  _approveLoan(val) {
    return true;
  }

  // Request Loan
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.depsoit(val);
      console.log("Loan approved.");
    }
  }
}

const acc1 = new Account("Athul", "RS", 2255);
console.log(acc1);

// pushing deposit and withdrewal to the movements array
// acc1.movements.push(100, 200, 300, -200, -100) --declaring methods is better

acc1.depsoit(200);
acc1.withdrewal(-9200);
console.log(acc1._pin);
acc1.requestLoan(200);

console.log(acc1.getMovements());
// console.log(acc1.#movements); //error accessing private property.
// console.log(acc1.#pin); //error accessing private 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

