_cal.createObject('sendLink');

_cal.sendLink.sendAsTask = target => {
    const date = document.querySelector('.select-list').innerText;

    target.href = `addTask.html?year=${_cal.calendar.getFullYear()}&month=${_cal.calendar.getMonth()}&date=${date}`;
}

_cal.indexVar.addToDos.addEventListener('click', function() {
    _cal.sendLink.sendAsTask(this);
});
