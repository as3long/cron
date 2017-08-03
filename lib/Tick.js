/**
 * 定时器
 * 
 * @class Tick
 */
class Tick {
    constructor() {
        /**
         * 默认定时器间隔为1S
         */
        this._interval = 1000;
        /**
         * 事件字典
         */
        this.dict = {};
        this.dict[Tick.EVENT_TICK] = [];
        this.runTick();
    }

    /**
     * 获取定时器的单例
     * 
     * @static
     * @returns {Tick}
     * @memberof Tick
     */
    static getInstance() {
        if (!Tick.instance) {
            Tick.instance = new Tick();
        }

        return Tick.instance;
    }

    /**
     * 设置定时器时间间隔
     * 
     * @memberof Tick
     */
    set interval(value) {
        this._interval = value;
    }

    /**
     * 获取定时器的时间间隔
     * 
     * @readonly
     * @memberof Tick
     */
    get interval() {
        return this._interval;
    }

    /**
     * 事件类型：tick
     * 
     * @readonly
     * @static
     * @memberof Tick
     */
    static get EVENT_TICK() {
        return 'event_tick';
    }

    runTick() {
        setTimeout(() => {
            this.dict[Tick.EVENT_TICK].forEach(callback => {
                callback(Tick.EVENT_TICK);
            });
            this.runTick();
        }, this._interval);
    }

    /**
     * 添加事件监听
     * 
     * @param {String} type 事件类型 
     * @param {Function} listener 回调函数 
     * @memberof Tick
     */
    addEventListener(type, listener) {
        if (!this.dict[type]) {
            this.dict[type] = [];
        }
        this.dict[type].push(listener);
    }

    removeEventListener(type, listener) {
        if (!this.dict[type]) {
            this.dict[type] = [];
        }
        let listenerIndex;
        for (let i = 0,len=this.dict[type].length;i<len;i++) {
            if (this.dict[type][i] === listener) {
                listenerIndex = i;
                break;
            }
        }

        if (listenerIndex !== undefined) {
            this.dict[type].splice(listenerIndex, 1);
        }
    }

    removeAllEventListener(type) {
        this.dict[type] = [];
    }
}

module.exports = Tick;