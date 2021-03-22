class Person {
    #map = new Map;
    #delegate = new PersoneDelegate(this.#map);

    set name(name) {
        this.#delegate.setValue('name', name);
    }

    get name() {
        return this.#delegate.getValue('name') ?? 'lee';
    }

    set age(age) {
        this.#delegate.setValue('age', age);
    }

    get age() {
        return this.#delegate.getValue('age') ?? '29';
    }
}


class PersoneDelegate {
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