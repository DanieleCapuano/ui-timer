function Timer(callback, timeInterval, debug) {
    //thanks to https://www.youtube.com/watch?v=x8PBWobv6NY

    this.timeInterval = timeInterval;
    this.start = () => {
        this.expected = Date.now() + this.timeInterval;
        this.timeout = setTimeout(this.round, this.timeInterval);
        debug && console.log('Started');
    };

    this.stop = () => {
        clearTimeout(this.timeout);
        debug && console.log("Stopped");
    };

    this.round = () => {
        let drift = Date.now() - this.expected;
        if (drift > this.timeInterval) {
            console.warn("High drift found", drift);
        }
        callback();
        this.expected += this.timeInterval;

        if (debug) {
            console.log("Drift = " + drift);
            console.log(this.timeInterval - drift);
        }
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    };
}

export { Timer };
export default { Timer };