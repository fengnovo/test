function clone(obj) {
    if(typeof obj !== 'object') {
        return obj;
    }
    if(obj === null) {
        return null;
    }
    if(obj instanceof Date) {
        return new Date(obj);
    }
    if(obj instanceof RegExp) {
        return new RegExp(obj);
    }

    console.log(obj.constructor()); // [] {}
    let newObj = new obj.constructor();
    for(let key in obj){
        newObj[key] = typeof[key] === 'object' ? clone(obj[key]) : obj[key];
    }
    return newObj;
}

let a = {
    s: {
        sfd: new Date(),
        ss: /^\ddd$/,
        a: [{sdfs: 32}]
    },
    sd: {
        sdf: 'sdfsdf'
    },
    sdfsd: {
        b: {
            sdfs: 'sdf',
            dd: function() {
                console.log(213);
            },
            a: [{sdfs: 32}, {a: 22}]
        }
    }
}

console.log(a);
let b = clone(a);
console.log(b);