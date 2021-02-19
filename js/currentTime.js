function currentDate(date, today) {
    date.innerText = `${today.getFullYear()}.${makeTwoString(today.getMonth() + 1)}.${makeTwoString(today.getDate())}`;
}

function currentTime(time, today) {
    time.innerText = `${makeTwoString(today.getHours())}:${makeTwoString(today.getMinutes())}`;
}

function init() {
    const today = standardDate();

    const date = document.querySelector('.date');
    const time = document.querySelector('.time');

    currentDate(date, today);

    window.setInterval(() => {
        currentTime(time, today);
    }, 1000);
}

init();