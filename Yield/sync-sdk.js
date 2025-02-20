class SyncSDK {
    // 异步计算函数（实际调用 Worker）
    async asyncCompute(data) {
        return new Promise((resolve) => {
            const worker = new Worker('worker2.js');
            worker.postMessage(data);
            worker.onmessage = (e) => resolve(e.data);
        });
    }

    // 创建同步接口的 Proxy 代理
    createSyncProxy(asyncFn) {
        return new Proxy({}, {
            get: (target, prop) => {
                return (...args) => {
                    let result = null;
                    let isResolved = false;
                    let error = null;

                    // 启动异步任务
                    asyncFn(...args)
                        .then((res) => {
                            result = res;
                            isResolved = true;
                        })
                        .catch((err) => {
                            error = err;
                            isResolved = true;
                        });

                    // 非阻塞等待（通过事件循环分片）
                    const wait = () => {
                        if (!isResolved) {
                            // 使用 setTimeout 分片避免阻塞
                            return new Promise(resolve => setTimeout(() => {
                                wait().then(resolve);
                            }, 10));
                        } else {
                            if (error) throw error;
                            return result[prop];
                        }
                    };

                    // 返回一个值或可继续链式调用的 Proxy
                    return wait();
                };
            }
        });
    }

    // 暴露同步接口
    constructor() {
        this.computeSync = this.createSyncProxy(this.asyncCompute);
    }
}