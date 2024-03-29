const assert = require('assert');

it('has a text input 1', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    assert(input);
});

it('shows a success message with a valid email 2', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = 'dsadasda@sdasdasd.com';
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

    const h1 = dom.window.document.querySelector('h1');
    assert.strictEqual(h1.innerHTML, 'Looks good!');
});