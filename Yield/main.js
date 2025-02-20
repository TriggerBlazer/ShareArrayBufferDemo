const worker = new Worker('worker.js');

function sendMessage(worker, data) {
  return new Promise((resolve) => {
    worker.onmessage = (e) => resolve(e.data);
    worker.postMessage(data);
  });
}

function* syncCommunication() {
  const reply1 = yield sendMessage(worker, 'Ping');
  console.log('Main received:', reply1); // "Pong"

  const reply2 = yield sendMessage(worker, 'Another message');
  console.log('Main received:', reply2); // "Another response"
}

// 执行生成器
function runGenerator(generator) {
  const iterator = generator();

  function step(next) {
    if (next.done) return;
    next.value.then((result) => {
      step(iterator.next(result));
    });
  }

  step(iterator.next());
}

runGenerator(syncCommunication);
console.log("finished");