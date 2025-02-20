self.onmessage = (e) => {
    console.log('Worker received:', e.data);
    
    // 模拟异步处理
    setTimeout(() => {
      if (e.data === 'Ping') {
        self.postMessage('Pong');
      } else {
        self.postMessage('Another response');
      }
    }, 1000);
  };