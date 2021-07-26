export function throttle(func, timeFrame) {
    let lastTime = 0;

    return function () {
        const now = Date.now();

        if (now - lastTime >= timeFrame) {
            lastTime = now;

            return func.apply(this, arguments);
        }
    };
}