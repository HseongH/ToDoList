function sunRise(container, time) {
    const date = new Date;

    if(date.getHours() >= 18 || date.getHours() <= 6) {
        container.classList.add('after-sun-rise');
        time.classList.add('sun-rise-color');
    } else {
        container.classList.remove('after-sun-rise');
        time.classList.remove('sun-rise-color');
    }
}

function init() {
    const headerContainer = document.querySelector('header').querySelector('.container');
    const time = document.querySelector('.time');

    sunRise(headerContainer, time);
}

init();