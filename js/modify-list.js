_cal.createObject('modify');

_cal.modify.modifyList = task => {
    location.href = `addTask.html`;

    const toDo = task;
    const title = document.getElementById('title-input');
    const description = document.getElementById('description-input');
    const startDate = _cal.addTaskVar.startDate;
    const endDate = _cal.addTaskVar.endDate;

    title.value = toDo.title;
    description.value = toDo.description;
}
