const Tick = require('./Tick');

exports.setTimeout = function (listener, after) {
    return new Timeout(listener, after)
}
exports.setInterval = function (listener, after) {
    return new Interval(listener, after)
}
exports.clearTimeout = function (timer) {
    if (timer) timer.close()
}
exports.clearInterval = function (interval) {
    if (interval) interval.close()
}

function Timeout(listener, after) {
    this.listener = listener
    this.after = after
    this.startTimeStamp = 0;
    this.tickCallback;
    this.start()
}


Timeout.prototype.start = function () {
    this.startTimeStamp = Date.now();
    this.tickCallback = () => {
        if (Date.now() - this.startTimeStamp >= this.after) {
            this.listener();
            Tick.getInstance().removeEventListener(Tick.EVENT_TICK, this.tickCallback);
        }
    };
    Tick.getInstance().addEventListener(Tick.EVENT_TICK, this.tickCallback);
}

Timeout.prototype.close = function () {
    Tick.getInstance().removeEventListener(Tick.EVENT_TICK, this.tickCallback);
}

function Interval(listener, after) {
    this.listener = listener
    this.after = after
    this.startTimeStamp = 0;
    this.tickCallback;
    this.start()
}

Interval.prototype.start = function () {
    this.startTimeStamp = Date.now();
    this.tickCallback = () => {
        if (Date.now() - this.startTimeStamp >= this.after) {
            this.listener();
            this.start();
        }
    };
    Tick.getInstance().addEventListener(Tick.EVENT_TICK, this.tickCallback);
}

Interval.prototype.close = function () {
    Tick.getInstance().removeEventListener(Tick.EVENT_TICK, this.tickCallback);
}