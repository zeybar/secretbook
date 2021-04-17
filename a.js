// let count = 1;

// function setCount() {
//     count += 1;
// }

// setTimeout(() => {
//     console.log('a', count);
// })

// module.exports = {
//     count,
//     setCount,
// }

console.log('aaaa')
const B = require('./b');
console.log('a', B.B);
module.exports = {
    B: 2,
}

// 这里node a.js 会如何执行
/*
1. module.exports 是输出复制一份引用
2. 所以两个js文件都会执行
3. 执行顺序为， 
aaaa
bbb
b undefined
a undefined
原因是由于执行b的时候module.exports还未发生，所以答应undefined
*/