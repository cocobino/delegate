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