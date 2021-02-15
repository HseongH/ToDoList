function makeTwoString(str) {
    return `${str}`.length === 2 ? str : `0${str}`;
}

function currentDate(date) {
    const today = new Date;

    date.innerText = `${today.getFullYear()}.${makeTwoString(today.getMonth() + 1)}.${makeTwoString(today.getDate())}`;
}

function currentTime(time) {
    const hour = new Date;

    time.innerText = `${makeTwoString(hour.getHours())}:${makeTwoString(hour.getMinutes())}`;
}

function init() {
    const date = document.querySelector('.date');
    const time = document.querySelector('.time');

    currentDate(date);

    window.setInterval(() => {
        currentTime(time);
    }, 1000);
}

init();