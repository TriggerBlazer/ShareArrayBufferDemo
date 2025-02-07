(function () {
    class ShareTest {
        //------------------------------------------
        constructor() {
        }

        //------------------------------------------
        run() {
            const buffer = new SharedArrayBuffer(4);
            const int32 = new Int32Array(buffer);
            console.log("SharedArrayBuffer init");
        }
        //------------------------------------------
    }
    try {
        const buffer = new SharedArrayBuffer(4);
        const int32 = new Int32Array(buffer);
        console.log("SharedArrayBuffer init");
    } catch (error) {
        // 捕获错误并处理
        console.error("捕获到错误：", error);
        console.error("错误信息：", error.message);
    }
    window.ShareTest = ShareTest;

})();