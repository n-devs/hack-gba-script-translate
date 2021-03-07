const Timer = {
  time: 5, // 5 time in seconds
  _time: null,
  _timeout: null,
  fun: () => { },
  start() {
    if (this._timeout == null) {
      const self = this;
      this.fun();
      this._timeout = setTimeout(function repeater() {
        self.fun();
        self._timeout = setTimeout(repeater, 10 * self.time);
      }, 10 * this.time);
    }
  },
  stop() {
    const timeout = this._timeout;
    this._timeout = null;
    this.set_time(); // set time to default
    clearTimeout(timeout);
  },
  set_time(time) {
    if (this._time == null) this._time = this.time;

    if (time) {
      this.time = time;
    } else {
      this.time = this._time;
    }
  },
};

// print time
// Timer.fun = () =>{
//   console.log(new Date())
// };
// Timer.set_time(100)
// Timer.start()

module.exports = Timer;