class Persone1 {
    #map = new Map;
    
    _set(k, v) {
        this.#map.set(k, v);
    }

    _get(k) {
        return this.#map.get(k) ?? `declare ${k}`;
    }

    set name(name) {
        this._set('name', name);
    }

    get name() {
        return this._get('name') ?? 'lee';
    }

    set age(age) {
        this._set('age', age);
    }

    get age() {
        return this._get('age') ?? '29';
    }
}