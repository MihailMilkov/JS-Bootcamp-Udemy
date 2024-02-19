const { hash } = window.location;
const message = atob(hash.replace('#', ''));

if (message) {
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#message-show').classList.remove('hide');
    document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#link-form').classList.remove('hide');
    const message = document.querySelector('#message-input').value;
    const encoded = btoa(message);
    const input = document.querySelector('#link-input');
    input.value = `${window.location}#${encoded}`;
    input.select();
    navigator.clipboard.writeText(input.value); // copy to clipboard
});

