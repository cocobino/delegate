const prop = (target, key, delegator) => {
    Object.defineProperty(target, key, {
        get() {
            return delegator.getValue(this, key);
        },
        set(v) {
            delegator.setValue(this, key, v);
        }
    })
}

class PersonDelegate {
    getValue(target, k) {
        return target?.map.get(k) ?? `decalre ${k}`;
    }

    setValue(target, k, v) {
        target?.map.set(k, v);
    }
}

class Person {
    map= new Map;
}

prop(Person.prototype, 'name', new PersonDelegate);
prop(Person.prototype, 'age', new PersonDelegate);


const person = new Person;
person.age = 11;
person.name = 'test';

console.log(person);