const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');

const render = async (filename) => {
    const filePath = path.join('C:\\Users\\1\\Desktop\\JS-Bootcamp\\tme\\samplewebproject\\', filename);
    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        });

        dom.window.document.addEventListener('load', () => {
            resolve(dom);
        });
    });
}

module.exports = render;