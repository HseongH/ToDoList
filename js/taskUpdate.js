function updateToDo() {
    const todo = new LocalToDo;
    const sendList = todo.todo[nodeIndex(this)];
    const taskTitle = sendList.title;
    const taskDes = sendList.description;
    const startDate = sendList.startDate;
    const endDate = sendList.endDate;
    const time = sendList.time;

    this.parentNode.removeChild(this);
    todo.todo = todo.todo.filter((task, i) => i !== nodeIndex(this));

    saveList(todo.todo);
    location.href = `addTask.html?${taskTitle}?${taskDes}?${startDate}?${endDate}?${time}`;
}

function init() {
    const toDosList = document.querySelectorAll('.todos__list');

    [].forEach.call(toDosList, todo => {
        todo.addEventListener('click', updateToDo);
    });
}

init();