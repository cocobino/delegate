class NetDelegate {
    static loaded = new Map;
    #url;

    constructor(url) {
        this.#url = url;
    }

    async getValue(target, k) {
        if(!NetDelegate.loaded.has(this.#url)) {
            NetDelegate.loaded.set(this.#url, await (await fetch(this.#url)).json());
        }
        return NetDelegate.loaded.get(this.#url) ?? 'no data';
    }

    setValue(target, k, v){}
}

const by = (cls) => {
    Object.entries(cls)
    .filter(([, v]) => {
        return typeof v.getValue == 'function' && typeof v.setValue == 'function';
    })
    .reduce((proto, [key, delegator]) => {
        Object.defineProperty(proto, key, {
            get() {
                return delegator.getValue(this, key);
            },
            set(v) {
                delegator.setValue(this, key, v);
            }
        });
        return proto;
    }, cls.prototype);
    return cls
};

const Test = by(class {
    static json = new NetDelegate('test.json');
});

(async() => {
    const test = new Test();
    console.log(await test.json);
})();