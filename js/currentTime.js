function currentDate(date, today) {
    date.innerText = `${today.getFullYear()}.${makeTwoString(today.getMonth() + 1)}.${makeTwoString(today.getDate())}`;
}

function currentTime(time, today) {
    time.innerText = `${makeTwoString(today.getHours())}:${makeTwoString(today.getMinutes())}`;
}

function init() {
    const today = new Date;

    const date = document.querySelector('.date');
    const time = document.querySelector('.time');

    currentDate(date, today);

    window.setInterval(() => {
        currentTime(time, new Date);
    }, 1000);
}

init();