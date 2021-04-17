(function() {
  if(!window.localStorage) {
      console.log('当前浏览器不支持localStorage!')
  }
  // 经测试，在chrome浏览器中，中文字和英文字一样的，最大是5120kb
  // let test = '0123456789';
  let test = '浏览器不支持的测试';
  const add = (num) => {
      num += num;
      console.log(num);
      if(num.length >= 10240) {
          test = num;
          return;
      }
      add(num);
  }
  add(test);
  let sum = test;
  // 每次在原来的基础上加一点，加到设localStorage失败为止
  const show = setInterval(() => {
      sum += test;
      try {
          window.localStorage.removeItem('test');
          window.localStorage.setItem('test', sum);
          console.log(sum.length / 1024 + 'KB');
      } catch(e) {
          console.log(sum.length / 1024 + 'KB超出最大限制');
          clearInterval(show);
      }
  }, 20)
})();
