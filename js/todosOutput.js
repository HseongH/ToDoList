function LocalToDo() {
    this.todo = JSON.parse(localStorage.getItem('toDoLists'));
}

function todayTask() {
    const toDoList = new LocalToDo;
    const year = document.querySelector('.select-year').innerText;
    const month = document.querySelector('.select-month').innerText;
    const today = document.querySelector('.today');
    const date = makeTwoString(today.querySelector('.calendar__date').innerText);
    const toDos = document.querySelectorAll('.todos__list');

    [].forEach.call(toDos, list => {
        if (toDoList.todo[nodeIndex(list)].startDate === `${year} / ${month} / ${date}`) {
            list.classList.remove('hide');
            list.classList.add('show');
        } else {
            list.classList.remove('show');
            list.classList.add('hide');
        }
    });
}

function hasList() {
    const toDoList = new LocalToDo;
    const year = document.querySelector('.select-year').innerText;
    const month = document.querySelector('.select-month').innerText;
    const date = document.querySelectorAll('.calendar__date');

    toDoList.todo.forEach(list => {
        [].forEach.call(date, dt => {
            if (list.startDate === `${year} / ${month} / ${makeTwoString(dt.innerText)}`) {
                if (!dt.parentNode.querySelector('.has-list') && !dt.parentNode.classList.contains('not-current-month')) {
                    const hasList = document.createElement('div');
                    hasList.setAttribute('class', 'has-list');
                    dt.parentNode.appendChild(hasList);
                }
            }
        });
    });
}

function completeList() {
    const list = this.parentNode;
    const toDoList = new LocalToDo;

    if (!list.classList.contains('complete')) {
        toDoList.todo = toDoList.todo.map((doList, i) => {
            if (i === nodeIndex(list)) {
                doList.com = true;
            }
            return doList;
        });
    
        list.classList.add('complete');
    } else {
        toDoList.todo = toDoList.todo.map((doList, i) => {
            if (i === nodeIndex(list)) {
                doList.com = false;
            }
            return doList;
        });
    
        list.classList.remove('complete');
    }

    saveList(toDoList.todo);
}

function removeList() {
    const remove = this.parentNode;
    const todoList = new LocalToDo;

    todoList.todo = todoList.todo.filter((doList, i) => i !== nodeIndex(remove));
    remove.parentNode.removeChild(remove);

    saveList(todoList.todo);
}

function toDosList(todo) {
    const todos = document.querySelector('.todos');
    const todosList = document.createElement('li');
    const todosComplete = document.createElement('div');
    const btnComplete = document.createElement('div');

    const task = document.createElement('div');
    const taskTitle = document.createElement('h4');
    const taskDes = document.createElement('p');

    const todosDel = document.createElement('div');

    todosList.setAttribute('class', 'todos__list');
    todo.com && todosList.classList.add('complete');

    todosComplete.setAttribute('class', 'todos--complete');
    btnComplete.setAttribute('class', 'btn');
    btnComplete.classList.add('btn--complete');

    task.setAttribute('class', 'task');
    taskTitle.setAttribute('class', 'task__title');
    taskDes.setAttribute('class', 'task__description');

    todosDel.setAttribute('class', 'todos--delete');

    taskTitle.innerText = todo.title;
    taskDes.innerText = todo.description;
    todosDel.innerText = '×';

    todosComplete.appendChild(btnComplete);
    task.appendChild(taskTitle);
    task.appendChild(taskDes);
    if (todo.time) {
        const taskTime = document.createElement('div');
        taskTime.setAttribute('class', 'task__time');
        taskTime.innerText = todo.time;
        task.appendChild(taskTime);
    }

    if (todo.endDate) {
        const taskEnd = document.createElement('div');
        taskEnd.setAttribute('class', 'task__end-date');
        taskEnd.innerText = todo.endDate;
        task.appendChild(taskEnd);
    }

    todosList.appendChild(todosComplete);
    todosList.appendChild(task);
    todosList.appendChild(todosDel);

    todos.appendChild(todosList);

    todosDel.addEventListener('click', removeList);
    todosComplete.addEventListener('click', completeList);
}

function init() {
    const todo = new LocalToDo;

    todo && todo.todo.forEach(element => {
        toDosList(element, todo);
    });
}

init();