_cal.createObject('enterToDo');

_cal.enterToDo.sortList = task => {
    const condition = [!(task.time), _cal.tasks.length <= 0, _cal.tasks[_cal.tasks.length - 1].time < task.time];

    if (condition.includes(true)) {
        _cal.tasks.push(task);
        return;
    }

    for (let i = 0; i < _cal.tasks.length; i++) {
        if (!(_cal.tasks[i].time)) {
            _cal.tasks.splice(i, 0, task);
            break;
        }


    }
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
    const hours = _cal.addTaskVar.hours.innerText;
    const minutes = _cal.addTaskVar.minutes.innerText;
    const noon = document.querySelector('.current-noon').innerText;
    const dateString = `${_cal.today.getFullYear()} / ${_cal.splitByTwoLetters(_cal.today.getMonth() + 1)} / ${_cal.today.getDate()}`;

    const toDoLists = {
        id: _cal.tasks.length,
        title: titleInput.value,
        description: desInput.value,
        startDate: parseInt(startDate) ? startDate : dateString
    }

    if (parseInt(endDate)) toDoLists.endDate = endDate;
    if (parseInt(hours)) toDoLists.time = `${hours}:${minutes} ${noon}`;
}

_cal.addTaskVar.submitToDos.onclick = _cal.enterToDo.addTasks;
