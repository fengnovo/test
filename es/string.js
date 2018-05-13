let name = '小明';
let age = '11';
let str = ' \`${name}今年${age}岁了\`';
str = str.replace(/\$\{([^}])*\}/g, () => {
    return eval(arguments[1]);
});
console.log(str);

let a = 'd';
{
    console.log(a); // 暂存死区
    let a = 12;
}
