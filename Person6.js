const prop = (target, key, delegator) => {
    Object.defineProperty(target, key, {
        get() {
            return delegator.getValue(this, key);
        },
        set(v) {
            delegator.setValue(this, key, v);
        }
    })
};

class PersonDelegate {
    getValue(target, k) {
        return target?.map.get(k) ?? `decalre ${k}`;
    }
    setValue(target, k, v) {
        target?.map.set(k, v);
    }
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

const Person = by(class {
    static name = new PersonDelegate;
    static age = new PersonDelegate;
    map = new Map;
});
