function Promise(excutor) {
  this.status = 'pending';
  this.value = null;
  this.reson = null;
  this.onFulfilledArray = [];
  this.onRejectedArray = [];

  const resolve = value => {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'fufilled';
        this.value = value;
        this.onFulfilledArray.forEach(fn => fn(value));
      }
    });

  }

  const reject = reson => {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.reson = reson;
        this.status = 'rejected';
        this.onFulfilledArray.forEach(fn => fn(value));
      }
    });
  }

  try {
    excutor(resolve, reject);
  } catch(e) {
    reject(e);
  }
}

/*
promise2 也就是当前实例
result，回调执行返回值
resolve 真正的resolve
reject 真正的reject
*/
const resolvePromise = (promise2, result, resolve, reject) => {
  // 两者相等
  if (promise2 === result) {
    reject(new TypeError('error due to dircular'))
  }
  if (result instanceof Promise) {
    // result 是new Promise生成的并还在pending状态
    // 目的是为了把resolve的值传递下去 Promise.resolve(new Promise((res) => res(10))).then(a => {console.log(a)}) // 10
    if (result.status === 'pending') {
      result.then((val) => {
        resolvePromise(promise2, val, resolve, reject)
      }, reject)
    } else {
      result.then(resolve, reject);
    }
    return;
  }

  // 查看引用类型
  let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && target !== null;
  let consumed = false;
  let thenable;

  // 引用类型 疑似promise 类promise
  if (isComplexResult) {
    try {
      // 这里是为了兼容这种情况：
      // Promise.resolve({a : 10, then: () => console.log(123)}).then(a => {console.log(a)})
      // 这里也要执行掉console.log(123)
      thenable = result.then;
      if (typeof thenable === 'function') {
        thenable.call(result, data => {
          if (consumed) return;
          consumed = true;

          return resolvePromise(promise2, data, resolve, reject);
        }, error => {
          if (consumed) return;
          consumed = true;

          return resolvePromise(promise2, error, resolve, reject);
        })
      } else {
        resolve(result);
      }
    } catch(e) {
      if (consumed) return;
      consumed = true;
      return reject(e)
    }
  } else {
    resolve(result)
  }
}

Promise.prototype.then = function(onResolve = Function.prototype, onReject = Function.prototype) {
  onResolve = typeof onResolve === 'function' ? onResolve : v => v;
  onReject = typeof onReject === 'function' ? onReject : e => { throw e }

  let promise2;
  if (this.status === 'fufilled') {
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onResolve(this.value)
          resolvePromise(promise2, result, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }

  if (this.status === 'rejected') {
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onReject(this.value)
          resolvePromise(promise2, result, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }

  if (this.status === 'pedding') {
    return promise2 = new Promise((resolve, reject) => {
      this.onFulfilledArray.push(value => {
        try {
          let result = onResolve(value)
          resolvePromise(promise2, result, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })

      this.onRejectedArray.push(value => {
        try {
          let result = onReject(value)
          resolvePromise(promise2, result, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }
}

Promise.resolve = function(value) {
  return new Promise((resolve) => resolve(value))
}

Promise.reject = function(e) {
  return new Promise((_, reject) => reject(e))
}

Promise.prototype.catch = function(onReject) {
  return this.then(null, onReject);
}

Promise.prototype.all = function(promises) {
  if (!Array.isArray(promises)) return;
  return new Promise((resolve, reject) => {
    const len = promises.length;
    let resArr = new Array(len);
    let count = 0;
    try{
      promises.forEach((promise, index) => {
        promise.then(res => {
          resArr[index] = res;
        }, reject).finally(() => {
          count += 1;
          if (count >= len) {
            resolve(resArr);
          }
        })
      })
    }catch(e) {
      reject(e)
    }
  })
}

Promise.prototype.race = function(promises) {
  if (!Array.isArray(promises)) return;
  return new Promise((resolve, reject) => {
    try{
      promises.forEach(promise => {
        promise.then(resolve, reject);
      })
    }catch(e) {
      reject(e)
    }
  })
}