console.log("sync start");

let fetchData = null;
if (typeof window === 'undefined') {
    // 仅在 Node.js 环境中使用 deasync
    const deasync = require('deasync');

    fetchData = function (callback) {
        setTimeout(() => {
            console.log('Hello from async function');
            callback && callback();
        }, 1000);
    };

    // 使用 deasync 将异步转为同步
    fetchData = deasync(fetchData);
} else {
    // 在浏览器中使用普通异步操作
    fetchData = function (callback) {
        setTimeout(() => {
            console.log('Hello from async function');
            callback && callback();
        }, 1000);
    };
}
fetchData();
console.log("sync end"); 