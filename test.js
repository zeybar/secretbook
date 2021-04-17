// 数组全排列
// function permute(nums) {
//     const res = [];
//     const used = {};

//     function dfs(path = []) {
//       // 先写退出条件
//       if (path.length === nums.length) {
//         res.push(path.slice());
//         return;
//       }
//       for(let num of nums) {
//         if (used[num]) continue;
//         used[num] = true;
//         path.push(num);
//         dfs(path)
//         used[num] = false;
//         path.pop()
//       }
//     }
//     dfs();
//     return res;
//   }

//   console.log(permute([1,2,3,4]))



// 浏览器的eventloop
// console.log(1);
// setTimeout(() => console.log(4), 0);
// new Promise(res => {
//     console.log(5)
//     res()
// }).then(() => { console.log(6)});
// async function test(){ await console.log(7)};
// test();
// console.log(9)

// 结果： 1 5 7 9 6 5


// node的eventloop
// const { readFile } = require('fs')
// console.log(1)
// setImmediate(() => {
//   console.log(3)
// })
// setTimeout(() => {
//   console.log(4)
// })
// new Promise(res => {
//   console.log(5)
//   res();
// }).then(() => {
//   console.log(6)
// })
// process.nextTick(() => {
//   console.log(2)
// })
// async function test() {
//   await console.log(7)
// }
// test()
// readFile('./axios.js', (err, res) => {
//   console.log('8')
// })
// console.log(9)
//答案： 1 5 7 9 2 6 4 3 8
/*
 解析： 同步任务1 -> 同步任务5 -> test函数执行await 让出协程先执行后面的内容，所以先执行7
 -> 继续执行同步任务9 -> 阶段二 执行nextTick 2 函数 -> 执行微任务即：promise then 6 ->
 -> 执行setTimeout 4 -> 执行setImidiate 3 -> 执行关闭回调函数 8
*/


// function getPrice(arr, max) {
//   const len = arr.length;
//   let sum = -1;
//   arr = arr.sort((a, b) => b - a);
//   for (let i = 0; i < len; i++) {
//     let j = i + 1;
//     let k = len - 1;
//     while(j < k) {
//       let curSum = arr[i] + arr[j] + arr[k];
//       if (curSum < max && curSum > sum) {
//         sum = curSum;
//       }

//       if (curSum > max) {
//         k--;
//       } else {
//         j++;
//       }
//     }
//   }
//   return sum;
// }

// console.log(getPrice([23,30,40], 26))


function getMaxTreamNum(arr, require) {
  let count = 0;
  arr = arr.sort((a, b) => a - b);
  console.log(arr)
  const len = arr.length;
  let j = 0;
  let k = len - 1;
  while(j < k) {
    if (arr[k] >= require) {
      count++;
      k--;
      continue;
    }
    const curSum = arr[j] + arr[k];
    if (curSum >= require) {
      count++;
      j++;
      k--;
    } else {
      j++
    }
  }
  return count;
}

console.log(getMaxTreamNum([3,1,5,7,9], 8))


