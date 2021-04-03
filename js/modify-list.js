_cal.createObject('modify');

_cal.modify.modifyList = () => {
    const getId = location.search.substring(1);
    const [toDo] = _cal.getToDoList().filter(task => task.id === parseInt(getId));
    const modifyToDo = _cal.getToDoList().filter(task => task.id !== parseInt(getId));
    const title = document.getElementById('title-input');
    const description = document.getElementById('description-input');
    const startDate = _cal.addTaskVar.startDate;

    title.value = toDo.title;
    description.value = toDo.description;
    startDate.innerText = decodeURI(toDo.startDate);

    if (toDo.endDate) {
        const endDate = _cal.addTaskVar.endDate;
        endDate.innerText = decodeURI(toDo.endDate);
    }

    if (toDo.time) {
        const hours = _cal.addTaskVar.hours.querySelector('.selection-time');
        const minutes = _cal.addTaskVar.minutes.querySelector('li');
        const time = toDo.time.split(' ');
        const [h, m] = time[0].split(':');
        const noon = time[1] === 'AM' ? 0 : 12;

        _cal.timeSet.enterTimes(hours, parseInt(h) + noon, '--');
        _cal.timeSet.enterTimes(minutes, m, '00');
    }

    _cal.tasks = modifyToDo;
}

location.search && _cal.modify.modifyList();