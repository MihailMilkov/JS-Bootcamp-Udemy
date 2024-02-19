#! /usr/bin/env node
const Runner = require('./runner');

const runner = new Runner();

(async () => {
    await runner.collectFiles('C:\\Users\\1\\Desktop\\JS-Bootcamp\\tme\\samplewebproject');
    runner.runTests();
})();