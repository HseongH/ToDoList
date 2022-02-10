_cal.createObject('enterToDo');

_cal.enterToDo.sortList = (task) => {
  const toDo = _cal.tasks;

  if (toDo.length <= 0) {
    toDo.push(task);
    return;
  }

  const lastList = toDo[toDo.length - 1];
  const pushCondition = [
    Boolean(lastList.startDate === task.startDate && !lastList.endDate && task.endDate),
    lastList.startDate === task.startDate && lastList.endDate < task.endDate,
    lastList.startDate < task.startDate,
  ];

  if (pushCondition.includes(true)) {
    toDo.push(task);
    return;
  }

  for (let i = 0; i < toDo.length; i++) {
    if (toDo[i].startDate > task.startDate) {
      toDo.splice(i, 0, task);
      return;
    }

    if (toDo[i].startDate === task.startDate) {
      const condition = [
        Boolean(toDo[i].endDate && !task.endDate),
        toDo[i].endDate > task.endDate,
        Boolean(toDo[i].endDate === task.endDate && !toDo.time && task.time),
      ];

      if (condition.includes(true)) {
        _cal.tasks.splice(i, 0, task);
        return;
      }

      if (toDo[i].time && task.time) {
        const toDoSp = toDo.time.split(' ');
        const taskSp = task.time.split(' ');
        const toDoTime = toDoSp[1] + toDoSp[0];
        const taskTime = taskSp[1] + taskSp[0];

        if (taskTime < toDoTime) {
          _cal.tasks.splice(i, 0, task);
          return;
        }
      }
    }
  }

  toDo.push(task);
};

_cal.enterToDo.addTasks = () => {
  const titleInput = _cal.addTaskVar.title;
  const desInput = _cal.addTaskVar.desc;

  if (!titleInput.value) {
    titleInput.classList.add('no-value');
    window.scrollTo(0, 0);

    titleInput.addEventListener('change', function () {
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

  const toDoLists = {
    id: _cal.tasks.length,
    title: titleInput.value,
    description: desInput.value,
    startDate,
  };

  if (parseInt(endDate)) toDoLists.endDate = endDate;
  if (parseInt(hours)) toDoLists.time = `${hours}:${minutes.innerText} ${noon}`;

  _cal.enterToDo.sortList(toDoLists);
  _cal.saveList(_cal.tasks);
  _cal.sendLink.sendAsTask();
};

_cal.addTaskVar.submitToDos.onclick = _cal.enterToDo.addTasks;
