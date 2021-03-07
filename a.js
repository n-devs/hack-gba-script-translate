const Timer = require('./libs/Timer')

// print time
const a = [0]
var b = 0

// Timer.start()

Timer.fun = () => {
    this.start(50)
    const r = Math.floor(Math.random() * 101)
    a.unshift(r)
    Timer.set_time(a[0])

    console.log(b, r)

    if (b == 10) {
        console.log("stop")

        this.stop();
    }

    b++

};

Timer.fun()
// Timer.start()


