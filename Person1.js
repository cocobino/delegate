class Persone1 {
    #map = new Map;
    
    set name(name) {
        this.#map.set('name', name);
    }

    get name() {
        return this.#map.get('name') ?? 'lee';
    }

    set age(age) {
        this.#map.set('age', age);
    }

    get age() {
        return this.#map.get('age') ?? '29';
    }
}