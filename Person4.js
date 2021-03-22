class PersonDelegate {
    #map;

    constructor(map) {
        this.#map = map;
    }

    getValue(k) {
        return this.#map.get(k) ?? `decalre ${k}`;
    }

    setValue(k, v) {
        this.#map.set(k, v);
    }
}

class Person {
    #map= new Map;

    constructor() {
      prop(this, 'name', new PersonDelegate(this.#map));
      prop(this, 'age', new PersonDelegate(this.#map));
    }
}

const prop = (target, key, delegator) => {
    Object.defineProperty(target, key, {
        get() {
            return delegator.getValue(key);
        },
        set(v) {
            delegator.setValue(key, v);
        }
    })
}

const person = new Person;
person.age = 11;
person.name = 'test';

console.log(person);