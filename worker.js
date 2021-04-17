

function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = function (event) {
  var data = event.data;
  console.log('worder', data);
  var ans = fibonacci(data);
  this.postMessage(ans);
};