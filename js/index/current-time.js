_cal.createObject('curTime');

_cal.curTime.currentDate = () => {
    const date = _cal.indexVar.date;
    const today = _cal.today;

    date.innerText = `${today.getFullYear()}.${_cal.splitByTwoLetters(today.getMonth() + 1)}.${_cal.splitByTwoLetters(today.getDate())}`;
}

_cal.curTime.currentTime = () => {
    const time = _cal.indexVar.time;
    const today = new Date;

    time.innerText = `${_cal.splitByTwoLetters(today.getHours())}:${_cal.splitByTwoLetters(today.getMinutes())}`;
}

_cal.curTime.currentDate();

window.setInterval(_cal.curTime.currentTime, 1000);
