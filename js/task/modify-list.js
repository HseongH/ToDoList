_cal.createObject('modify');

_cal.modify.modifyList = () => {
  const getId = parseInt(_cal.dateSet.id);
  const [toDo] = _cal.getToDoList().filter((task) => task.id === getId);
  const modifyToDo = _cal.getToDoList().filter((task) => task.id !== getId);
  const title = _cal.addTaskVar.title;
  const description = _cal.addTaskVar.desc;
  const startDate = _cal.addTaskVar.startDate;
  const fullDate = decodeURI(toDo.startDate);

  title.value = toDo.title;
  description.value = toDo.description;
  startDate.innerText = fullDate;
  _cal.fullDate = fullDate;

  if (toDo.endDate) {
    const endDate = _cal.addTaskVar.endDate;
    endDate.innerText = decodeURI(toDo.endDate);
  }

  if (toDo.time) {
    const hours = _cal.addTaskVar.hours.querySelector('.selection-time');
    const minutes = _cal.addTaskVar.minutes.querySelectorAll('li')[1];
    const time = toDo.time.split(' ');
    const [h, m] = time[0].split(':');
    const noon = time[1] === 'AM' ? 0 : 12;

    _cal.timeSet.enterTimes(hours, parseInt(h) + noon, '--');
    _cal.timeSet.enterTimes(minutes, m, '00');
  }

  _cal.tasks = modifyToDo;
};

_cal.dateSet.id && _cal.modify.modifyList();
