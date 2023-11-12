interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

interface IHouse {
  comeIn(person: IPerson): void;
  openDoor(key: IKey): void;
}

class Key implements IKey {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {}

  getKey(): IKey {
    return this.key;
  }
}

abstract class House implements IHouse {
  public door: boolean = false;
  private tenants: IPerson[] = [];

  constructor(protected key: IKey) {}

  comeIn(person: IPerson) {
    if (this.door) {
      this.tenants.push(person);
      console.log("Person coming in");
      return;
    }

    console.log("Door is closed");
    return;
  }

  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  openDoor(key: IKey): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;

      console.log("Door is opening");

      return;
    }

    console.log("Your key isn`t valid");
    return;
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
