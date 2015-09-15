
class Trait {
}

class Person extends Trait {
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
  }
}

class Boss extends Trait {
  constructor(name, age, money) {
    super();
    this.name = name;
    this.age = age;
    this.money = money;
  }
}

const Actions = {
  Trait: {
    Person: Person.constructor,
    Boss: Boss.constructor
  }
};

export default Actions;
