function inputTime() {
    if (this.querySelector('.input-time')) {
        return;
    } else {
        const form = document.createElement('form');
        const input = document.createElement('input');

        form.setAttribute('id', 'time-form');
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'input-time');
        input.value = this.innerText;

        form.appendChild(input);
        this.innerText = '';
        this.appendChild(form);
        input.select();
    }
}

function finishHours() {
    inputTime(this);
}

function init() {
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const atNoon = document.querySelector('.at-noon');

    hours.addEventListener('click', inputTime);
    minutes.addEventListener('click', inputTime);
}

init();