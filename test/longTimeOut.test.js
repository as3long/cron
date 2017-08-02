const longTimeOut = require('../lib/longTimeOut');


it('正常延时', (done) => {
    longTimeOut.setTimeout(function() {
        console.log(1);
    }, 1000);
    longTimeOut.setTimeout(function() {
        console.log(2);
        done();
    }, 2000);
});

it('正常定时', (done) => {
    let i = 0;
    longTimeOut.setInterval(function() {
        i++;
        console.log(i);
        if (i === 3) {
            done();
        }
    }, 1000);
});
