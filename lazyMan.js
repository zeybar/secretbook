// 实现lazyman
class LazyManGen {
  constructor(name) {
    this.taskArr = [];
    // 初始化任务
    const task = () => {
      console.log('hi,', name);
      // 执行完初始化任务后继续执行下一个任务
      this.next();
    }

    // 将初始化任务放入任务队列
    this.taskArr.push(task);

    setTimeout(() => {
      this.next();
    });
  }

  next() {
    // 取出下一个任务并执行
    const task = this.taskArr.shift();

    task && task();
  }

  sleepTask(time, prior = false) {
    const task = () => {
      setTimeout(() => {
        console.log('timeout', time);
        this.next();
      }, time * 1000)
    }

    if (prior) {
      this.taskArr.unshift(task);
    } else {
      this.taskArr.push(task);
    }
  }

  sleep(time) {
    this.sleepTask(time);
    return this;
  }

  sleepFirst(time) {
    this.sleepTask(time, true);
    return this;
  }

  eat(name) {
    const task = () => {
      console.log('eat', name);
      this.next();
    }
    this.taskArr.push(task);
    return this;
  }
}

function LazyMan(name) {
  return new LazyManGen(name);
}

// LazyMan('asdf').sleepFirst(5).eat('apple')
//