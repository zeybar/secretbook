// 算法实现


// 1. 斐波那契函数 / 爬楼梯

// 思路一： 使用普通递归，不推荐，每次都要计算
function fibo(n) {
  if (n < 3) {
    return n
  }

  return fibo(n - 1) + fibo(n - 2)
}

// 思路二： 使用dp
function fibo(n) {
  if (n < 3) {
    return n
  }
  const dp = Array.from({length: n}).fill(0)

  for (let i = 3; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n];
}

// 思路三： 使用滚动计算方式
function fibo(n) {
  if (n < 3) return n
  let first = 1
  let second = 2

  for(let i = 3;i < n; i++) {
    let third = first + second
    first = second
    second = third
  }

  return second
}

// 2.打家劫舍
// 整体公式fn(n) = max(fn(n-1), fn(n-2) + h(n))

// 思路一：动态规划
function rob(nums) {
  const len = nums.length
  if (len < 2) return nums[0] || 0
  const dp = []
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for(let i = 2;i < len; i++) {
    dp[i] = Math.max(nums[i - 1], (nums[i - 2] + nums[i]))
  }

  return dp[i - 1]
}

// 思路二： 滚动数组，跟上面那个有点像
function rob(nums) {
  const len = nums.length
  if (len < 2) return nums[0] || 0
  const dp = []
  let first = nums[0]
  let second = Math.max(nums[0], nums[1])
  for(let i = 2;i < len; i++) {
    // 先把下一家存起来
    let third = second
    // 把计算下一家
    second = Math.max(second, (first + nums[i]))
    // 把存下来的赋值给上一家
    first = third
  }

  return second
}


// 3. 找出二位矩阵中面积最大的1

//思路一： 动态规划，先找出1，然后向上，向左找出有1的值的个数
function maxSquare (matrix) {
  const len = matrix.length, len2 = matrix[0].length
  const dp = new Array(len).fill([new Array(len2).fill(0)])
  let maxSize = 0
  for (let i = 0; i < len; i++) {
    for(let j = 0; j < len2;j++) {
      // !i !j 用于检测边界
      if (!i || !j || matrix[i][j] === '0') {
        dp[i][j] = 0
      } else {
        // 上 左 左上 比较， 遇到0结束
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      }
      maxSize = Math.max(maxSize, dp[i][j])
    }
  }
  return maxSize ** 2
}

// 4. 零钱兑换

// 思路一：递归 动态规划
function coinChange(coins, amount) {
  const dp = new Array(amount).fill(Infinity)
  dp[0] = 0
  for (let i = 0; i < amount; i++) {
    for(let coin in coins) {
      if (i <= coin) {
        dp[i] = Math.min(dp[i - coin] + 1, dp[i])
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}


// 5. 查询链表中是否有环

// 思路
function hasCycle(head) {
  let fast, slow
  fast = slow = head

  while(fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) return true
  }

  return false
}

// 查找环的位置
function indexOfCycle(head) {
  let fast, slow
  fast = slow = head

  while(fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) break
  }

  // 重新出发
  slow = head

  while(slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow
}

// 6.羊生羊问题，农场买了一只小羊，这种羊在第一年是小羊，第二年的年底会生一只小羊，第三年不生小羊，第四年的年底还会再生下一只小羊，第五年就死掉了。要计算N年时农场里有几只羊

// 循环解决
function sleepNum(n){
  let count = 1;
  for(let i = 0;i < n;i++) {
    if (i === 2 || i === 4) {
      count += sleepNum(n - i)
    }
    if (i === 5) {
      count--
      break;
    }
  }

  return count;
}


// 7.排序
// 7.1 快排
// 核心是分而治之，找一个中心点，化繁为简
function quickSort(arr) {
  if (arr < 2) return [...arr]
  const len = arr.length

  let left = []
  let middle = []
  let right = []

  const randomVal = Math.round(Math.random() * len)

  for(let i = 0;i < len;i++) {
    const val = arr[i]

    if (val > randomVal) right.push(val)
    if (val < randomVal) left.push(val)
    if (val === randomVal) middle.push(val)
  }

  return quickSort(left).concat(middle, quickSort(right))
}

// 7.2 冒泡排序
function bubleSort(arr) {
  const len = arr.length;
  for (let i = len; i > 0; i--) {
    // 这里是为了做个优化，如果有序就break了，无须才要继续往下走
    let isOk = true;
    for(let j = 0; j < i - 1;j++){
      // 因为是正向，当比后面的大的时候得排后面
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1]
        arr[j + 1] = temp;
        isOk = false;
      }
    }
    if (isOk) break;
  }
  return arr;
}

// 7.3 选择排序
function insertSort(arr) {
  const len = arr.length;
  for(let i = 1;i < len;i++) {
    const cur = arr[i];
    let j = i;
    for(;j > 0;j--) {
      if (cur >= arr[j - 1]) break; //当前的值如果大于前一个证明是有序的，跳出循环
      arr[j] = arr[j - 1]; // 否则就把当前的值替换成较大的值
    }
    arr[j] = cur; // 把之前记录的当前值放回原处
  }

  return arr;
}

function insertSort(arr) {
  let length = arr.length;
  for(let i = 1; i < length; i++) {
    let temp = arr[i];
    let j = i;
    for(; j > 0; j--) {
      if(temp >= arr[j-1]) {
        break;      // 当前考察的数大于前一个数，证明有序，退出循环
      }
      arr[j] = arr[j-1]; // 将前一个数复制到后一个数上
    }
    arr[j] = temp;  // 找到考察的数应处于的位置
  }
  return arr;
}



// 8. 求数组最大子项和 leetcode42 剑指offer
function maxSubArray(nums) {
  const len = nums.length;
  if (len === 1) return nums[0];
  let dpi = nums[0];
  let max = nums[0];
  for(let i = 1; i < len; i++) {
    // dp 计算规则为如果上次 dp> 0 就让上次dp参与计算，否则丢弃
    // 因为正数才是增加，负数是减少
    dpi = dpi > 0 ? dpi + nums[i] : nums[i];
    max = max > dpi ? max : dpi
  }

  return max;
}

// 9.数组全排列
function permute(nums) {
  const res = [];
  const used = {};

  function dfs(path = []) {
    // 先写退出条件
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for(let num of nums) {
      if (used[num]) continue;
      used[num] = true;
      path.push(num);
      dfs(path)
      used[num] = false;
      path.pop()
    }
  }
  dfs();
  return res;
}

// 数组全排列
function permutation(arr){
  if (arr.length == 1)
    return arr;
  else if (arr.length == 2)
    return [[arr[0],arr[1]],[arr[1],arr[0]]];
  else {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
      var save = arr[i];
      arr.splice(i, 1);//取出arr[i]
      var res = permutation(arr);//递归排列arr[0],arr[1],...,arr[i-1],arr[i+1],...,arr[n]
      arr.splice(i, 0, save);//将arr[j]放入数组，保持原来的位置
      for (var j = 0; j < res.length; j++) {
        res[j].push(arr[i]);
        temp.push(res[j]);//将arr[j]组合起来
      }
    }
    return temp;
  }
}


// 10. 贪心算法

// 11. 求最长不重复子串长度
function findLogestSubStr(s) {
  if (s.length === 1) return 1;
  let subStr = '';
  let res = 0;
  for(let sub of s) {
    const index = subStr.indexOf(sub);
    res = Math.max(res, subStr.length)
    subStr += sub;
    if (index > -1) {
      subStr = subStr.slice(index + 1)
    }
  }

  return Math.max(res, subStr.length)
}

// leetcode 142 积最大子数组
// https://leetcode-cn.com/problems/maximum-product-subarray/solution/wa-ni-zhe-ti-jie-shi-xie-gei-bu-hui-dai-ma-de-nu-p/
function maxProduct(nums) {
  let res = nums[0]
  let prevMin = nums[0]
  let prevMax = nums[0]
  let temp1 = 0, temp2 = 0
  for (let i = 1; i < nums.length; i++) {
    temp1 = prevMin * nums[i]
    temp2 = prevMax * nums[i]
    prevMin = Math.min(temp1, temp2, nums[i])
    prevMax = Math.max(temp1, temp2, nums[i])
    res = Math.max(prevMax, res)
  }
  return res
}


// 二叉树
// 获取二叉树所有路径
function getTreePaths(root) {
  const paths = [];

  const setPath = (node, path = '') => {
    if (!node || !node.value) return;
    path += `${root.value}`;

    // 到达底叶子节点, 也就是都没有子节点了
    if (node.left === null && node.right === null) {
      paths.push(path);
    } else {
      path += '->';
      setPath(node.left, path);
      setPath(node.right, path);
    }
  }
  setPath(root);
}

// 查看二叉树是否对称
function isSymmetric(root) {
  function compaire(left, right) {
    // 都没有了，对称
    if (!left && !right) return true;
    // 有一边没有或者左边不等于右边的值表示不对称
    if (!left || !right || left.value !== right.value) return false;
    return compaire(left.left, right.right) && compaire(left.right, right.left);
  }

  return compaire(root, root);
}

// 二叉树中和为某一值的路径
// 输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径
function pathSum(root, num) {
  const result = [];

  const dfs = (node, num, res, path = []) => {
    // 终止条件
    if (!nodoe) return;
    // 逻辑处理
    path.push(node.value);
    // 递归到叶子节点
    if (!node.left && !node.right && num === node.value) {
      res.push([...path]);
    } else {
      // 进行运算
      let newNum = num - node.value;
      dfs(node.left, newNum, res, path);
      dfs(node.right, newNum, res, path);
    }

    // 递归调用后进行回溯
    path.pop();
  }

  dfs(root, num, result);
  return result;
}

// 反转二叉树
function mirrorTree(root) {
  if (!root) return null;

  [root.left, root.right] = [mirrorTree(node.right), mirrorTree(node.left)];

  return root;
}

// 反转链表
function reversList(head) {
  let pre = null;
  let current = head;

  while(current !== null) {
    let curNext = current.next;
    if (pre === null) {
      current.next = null;
    } else {
      current.next = pre;
    }

    pre = current;
    current = curNext;
  }

  return pre;
}

// 反转字符串, 简单方式'abc'.split('').reduce((a, b) =>b.concat(a))
function reverseString(s) {
  let n = s.length;
  for(let left = 0,right = n -1;left < right; ++left, --right) {
    [s[left], s[right]] = [s[right], s[left]]
  }
}

//找出数组中和为给定值的两个元素
// arr为经过排序的数组
function sameSum(arr, num) {
  if (!Array.isArray(arr) || !arr.length) return;

  let left = 0;
  let right = arr.length;

  while(left < right) {
    if (arr[left] + arr[right] > num) {
      right--;
    } else if (arr[left] + arr[right] < num) {
      left++
    } else {
      console.log(arr[left], arr[right], num);
      left++;
      right--;
    }
  }
}

// 判断是否为素数
function isPrime(num) {
  for (let i = 2, max = Math.sqrt(num); i <= max; i++) {
    if (num % i == 0) return false;
    return true;
  }
}

// 最长递增子序列
const lenthOfLIS = (nums) => {
  const len = nums.length;
  let dp = Array(len).fill(1);
  for(let i = 0; i < len; i++) {
      for(let j = 0; j < i; j++) {
          // 找到比自己大dp里面就+1
          if (nums[i] > nums[j]) {
              dp[i] = Math.max(dp[i], dp[j] + 1)
          }
      }
  }
  // 只需要一个最大值
  return Math.max(...dp);
}


function fn(s){
  let left = [];
  let star = [];

  for (let c of s) {
    if (c === '(') {
      left.push(i)
    } else if (c === '*') {
      star.push(i)
    } else if (c === ')') {
      if (left.length === 0) {
        if (star.length === 0) return false;
        star.pop();
      }
    }
  }
  if (left.length > star.length) return false;
  while(left.length && star.length) {
    if (left.pop() > star.pop()) return false;
  }

  return true;
}