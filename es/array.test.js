// ------------------------------------------ reduce
function findLongest(entries) {
    return entries.reduce(function(prev, cur) {
        return cur.length > prev.length ? cur : prev;
    }, '');
}
// console.log(findLongest([1,3,4,5,'ds','sdfasdf','df','sffg']));

var aArr = [{
    price: 20,
    count: 2   
},{
    price: 10,
    count: 3   
},{
    price: 10,
    count: 4   
}];
var total = aArr.reduce(function(prev, cur){
    return prev + cur.price*cur.count;
},0);

// console.log(total); //80


// ------------------------------------------ forEach
var obj1 = {
    times: [1,2,3],
    print: function() {
        console.log(this);
        this.times.forEach(function(){
            console.log(this); // this -> window
        });
    }
}

var obj2 = {
    times: [1,2,3],
    print: function() {
        console.log(this);
        this.times.forEach(function(){
            console.log(this); // this -> obj2
        }, this);
    }
}


// ------------------------------------------ forEach, for in, for of, for区别
var arr = [2,3,65,3,7,43,24];
arr.a = 'afas';
Array.prototype.b = 'sdf';
for(let i in arr) {
    console.log(i);         // 将数组arr的私有属性和原型上的属性都打印出来
}

for(let i of arr) {
    console.log(i);         //只打印数组，2,3,65,3,7,43,24
}

for(let i=0; i<arr.length; i++) {
    console.log(arr[i]);    //只打印数组，2,3,65,3,7,43,24
}

arr.forEach(i => {
    console.log(i);         //只打印数组，2,3,65,3,7,43,24
});

console.log(Object.keys(arr));  //["0", "1", "2", "3", "4", "5", "6", "a"] 把arr的key名称打印出来


//对于object
var aObj = {
    a: '2',
    b: '3'
}
for(let i in aObj){
    console.log(i);     // 遍历出i是aObj的key的名称
}

/*
for(let i of aObj){
    console.log(i);     // 报错
}
*/

for(let i of Object.keys(aObj)){
    console.log(i);     // 遍历出i是aObj的key的名称
}




// ------------------------------------------ 数组去重
Array.prototype.norepeat = function(){
    var result = [];
    for(var i = 0; i < this.length; i++){
        if (result.indexOf(this[i]) === -1) {
            result.push(this[i]);
        }
    }
    return result;
}

// console.log(['s','sf','agg','s'].norepeat()); //  ["s", "sf", "agg"]

// ------------------------------------------ 数组校验是否包含元素
Array.prototype.inarray = function(value){
    for(var i = 0; i < this.length; i++){
        if (this[i] === value) {
            return true;
        }
    }
    return false;
}
// console.log(['s','sf','agg','s','a','ab'].inarray('a')); //  true
// console.log(['s','sf','agg','s','a','ab'].inarray('b')); //  false

// some-----------有一个符合即返回true
['s','sf','agg','s','a','ab'].some(function(item ,index, arr) {
    return item === 'b'
});     //  false

['s','sf','agg','s','a','ab'].some(function(item ,index, arr) {
    return item === 'a'
});     //  true

// every-----------全部符合即返回true
['s','sf','agg','s','a','ab'].every(function(item ,index, arr) {
    return item !== 'b'
});     //  true

// find-----------全部符合即返回true
var theOne2 = ['s','sf','agg','s','a','ab'].find(function(item) {
    return item === 'b'
});
console.log(theOne2); // 如果是undefined则是不存在




// ------------------------------------------ filter
[2,56,7,8,945,4,63].filter(function(item) {
    return 4 < item < 10;
})
//  [2, 56, 7, 8, 945, 4, 63], 因为4 < item < 10永远都是true， 1===1===1 永远都是false，因为1===1是true，true===1是false

[2,56,7,8,945,4,63].filter(function(item) {
    return 4 < item && item < 10;
})
//  [7, 8]

// ------------------------------------------ find 返回找到的那一项，不会改变数组，回调函数中返回true表示找到了，找到后停止循环
var theOne1 = [2,56,7,8,945,4,63].find(function(item) {
    return item === 945
});
console.log(theOne1); // 945

var theOne2 = ['s','sf','agg','s','a','ab'].find(function(item) {
    return item === 'b'
});
console.log(theOne2); // undefined