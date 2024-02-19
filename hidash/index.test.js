const { forEach, map } = require('./index');
const assert = require('assert');

it('The forEach function', () => {
    let sum = 0;
    forEach([1, 2, 3], (value, i) => {
        sum += value;
    });

    assert.strictEqual(sum, 6, 'Expected forEach to sum the array');
});

it('The map function', () => {
    const result = map([1, 2, 3], value => {
        return value * 2;
    });
    assert.deepStrictEqual(result, [2, 4, 6]);
});
