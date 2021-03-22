const observe = (_ => {
    class Observer {
        #value;
        #observer;

        constructor(value, observer) {
            this.#value =value;
            this.#observer = observer;
        }

        getValue(target, k) {return this.#value;}
        setValue(target, k, v) {
            this.#observer(target, k, this.#value, this.#value=v);
        }
    }
    return (value, observer) => {
        return new Observer(value, observer);
    }
})();

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
    static test = observe('', (target, key, old, v) => {
        if(old ===v) return;
        document.querySelector('#test').value = v;
    });
    static test2 = observe('', (target, key, old, v) => {
        if(old ===v) return;
        document.querySelector('#test2').value = v;
    });
});

const test = new Test;
document.querySelector('#test').onchange = ({target:{value}}) => {
    return test.test = value;
}
document.querySelector('#test2').onchange = ({target:{value}}) => {
    return test.test2 = value;
}

test.test = '123123123';
test.test2 = 'testestset';

document.querySelector('#log').onclick = _ => console.log(test.test, test.test2);