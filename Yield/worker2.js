self.onmessage = (e) => {
  console.log('Worker2 received:', e.data);
  // 模拟异步处理
  self.postMessage({ 'Worker sended:': e.data });
};