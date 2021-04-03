_cal.createObject('enterToDo');

_cal.enterToDo.sortList = task => {
    const condition = [!(task.time) && !(task.endDate), _cal.tasks.length <= 0];

    if (condition.includes(true)) {
        _cal.tasks.push(task);
        return;
    }

    for (let i = 0; i < _cal.tasks.length; i++) {
        const condition = [Boolean(_cal.tasks[i].time), _cal.tasks[i].endDate <= task.endDate];

        if (condition.includes(false)) {
            _cal.tasks.splice(i, 0, task);
            return;
        }

        const past = task.time.split(':');
        const current = _cal.tasks[i].time.split(':');
        const pastMi = past[1].split(' ');
        const curMi = current[1].split(' ');
        const pastNoon = pastMi[1] === 'AM' ? 0 : 12;
        const curNoon = curMi[1] === 'AM' ? 0 : 12;

        const pastHour = past[0] === '12' ? 0 + pastNoon : parseInt(past[0]) + pastNoon;
        const curHour = current[0] === '12' ? 0 + curNoon : parseInt(current[0]) + curNoon;
        const pastMinutes = parseInt(pastMi[0]);
        const curMinutes = parseInt(curMi[0]);

        const pastTime = pastHour + (pastMinutes / 100);
        const curTime = curHour + (curMinutes / 100);

        if (pastTime < curTime) {
            _cal.tasks.splice(i, 0, task);
            return;
        }
    }

    _cal.tasks.push(task);
}

_cal.enterToDo.addTasks = () => {
    const titleInput = document.getElementById('title-input');
    const desInput = document.getElementById('description-input');

    if (!titleInput.value) {
        titleInput.classList.add('no-value');
        window.scrollTo(0, 0);

        titleInput.addEventListener('change', function() {
            if (this.value) {
                this.classList.remove('no-value');
                return;
            }
            this.classList.add('no-value');
        });

        return false;
    }

    const startDate = _cal.addTaskVar.startDate.innerText;
    const endDate = _cal.addTaskVar.endDate.innerText;
    const hours = _cal.addTaskVar.hours.querySelector('.selection-time').innerText;
    const minutes = _cal.addTaskVar.minutes.querySelector('.selection-time');
    const noon = document.querySelector('.current-noon').innerText;
    const dateString = `${_cal.today.getFullYear()} / ${_cal.splitByTwoLetters(_cal.today.getMonth() + 1)} / ${_cal.splitByTwoLetters(_cal.today.getDate())}`;

    const toDoLists = {
        id: _cal.tasks.length,
        title: titleInput.value,
        description: desInput.value,
        startDate: parseInt(startDate) ? startDate : dateString
    }

    if (parseInt(endDate)) toDoLists.endDate = endDate;
    if (parseInt(hours)) toDoLists.time = `${hours}:${minutes.innerText} ${noon}`;

    _cal.enterToDo.sortList(toDoLists);
    _cal.saveList(_cal.tasks);
    _cal.enterToDo.sendAsIndex();
}

_cal.addTaskVar.submitToDos.onclick = _cal.enterToDo.addTasks;
