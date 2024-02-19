const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`
    const input = root.querySelector('input');
    const dropdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector('.results');

    const onInput = debounce(1000, async (event) => {
        const items = await fetchData(event.target.value);
        if (!items.length) {

            return;
        }
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                input.value = inputValue(item);
                dropdown.classList.remove('is-active');
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(option);
        }
    });

    input.addEventListener('input', onInput);

    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
}