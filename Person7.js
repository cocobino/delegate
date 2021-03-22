const lazy = f => {
    let v;
    return {
        getValue(target, k) {
            return v ?? (v = f(target));
        },
        setValue(target, k, v){ throw `don't use`;}
    }
};
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
    static el =lazy (({selector}) => document.querySelector(selector));
    selector;
    constructor(selector) {
        this.selector = selector;
    }
});

const person = new Person('#person');
document.querySelector('body').innerHTML ='<div id="person">test</div>';
console.log(person.el.innerHTML);