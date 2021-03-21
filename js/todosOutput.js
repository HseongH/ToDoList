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
        const sd = toDoList.todo[nodeIndex(list)].startDate;
        const currentDate = `${year} / ${month} / ${date}`;

        if (sd === currentDate) {
            list.classList.remove('hide');
            list.classList.add('show');
        } else {
            list.classList.remove('show');
            list.classList.add('hide');
        }

        if (toDoList.todo[nodeIndex(list)].endDate) {
            ed = toDoList.todo[nodeIndex(list)].endDate;

            if (sd <= currentDate && ed >= currentDate) {
                list.classList.remove('hide');
                list.classList.add('show');
            } else {
                list.classList.remove('show');
                list.classList.add('hide');
            }
        }
    });
}

function toDoTerm(lists) {
    [].forEach.call(lists, list => {
        const hasList = list.querySelector('.has-list');
        const containTerm = list.querySelector('.list-term');
        const listTerm = document.createElement('div');
        listTerm.setAttribute('class', 'list-term');

        if (hasList) {
            list.removeChild(hasList);
        }
        
        if (!containTerm) {
            list.appendChild(listTerm);
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
            const select = `${year} / ${month} / ${makeTwoString(dt.innerText)}`;
            const containList = dt.parentNode.querySelector('.has-list');

            if (list.startDate === select) {
                if (!dt.parentNode.classList.contains('not-current-month')) {
                    if (!containList) {
                        const hasList = document.createElement('div');
                        hasList.setAttribute('class', 'has-list');
                        dt.parentNode.appendChild(hasList);
                    }
                }
            }

            if (list.endDate) {
                term(list.startDate, list.endDate);
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

function removeSelect(remove) {
    const toDoList = new LocalToDo;
    const year = document.querySelector('.select-year').innerText;
    const month = document.querySelector('.select-month').innerText;
    const date = document.querySelectorAll('.calendar__date');
    const removeList = toDoList.todo[nodeIndex(remove)];
    if (removeList.endDate) {
        const term = document.querySelectorAll('.list-term');
        const listTerm = [].filter.call(term, t => {
            const da = t.parentNode.querySelector('.calendar__date').innerText;
            const select = `${year} / ${month} / ${makeTwoString(da)}`;
            
            return removeList.startDate <= select && select <= removeList.endDate;
        });
        
        [].forEach.call(listTerm, lt => {
            lt.parentNode.removeChild(lt.parentNode.querySelector('.list-term'));
        });
    } else {
        const [hasList] = [].filter.call(date, dt => {
            const select = `${year} / ${month} / ${makeTwoString(dt.innerText)}`;
            return removeList.startDate === select;
        });
        hasList.parentNode.removeChild(hasList.parentNode.querySelector('.has-list'));
    }
}

function removeList() {
    const remove = this.parentNode;
    const todoList = new LocalToDo;

    todoList.todo = todoList.todo.filter((doList, i) => i !== nodeIndex(remove));
    removeSelect(remove);
    remove.parentNode.removeChild(remove);

    saveList(todoList.todo);
    hasList();
}

function toDosList(todo) {
    const todos = document.querySelector('.todos');
    const todosList = document.createElement('li');
    const todosComplete = document.createElement('button');
    const btnComplete = document.createElement('div');

    const task = document.createElement('div');
    const taskTitle = document.createElement('h3');
    const taskDes = document.createElement('p');

    const todosDel = document.createElement('button');
    
    todosList.setAttribute('class', 'todos__list');
    todo.com && todosList.classList.add('complete');

    todosComplete.setAttribute('class', 'todos--complete');
    todosComplete.classList.add('btn');
    btnComplete.setAttribute('class', 'btn--complete');

    task.setAttribute('class', 'task');
    taskTitle.setAttribute('class', 'task__title');
    taskDes.setAttribute('class', 'task__description');

    todosDel.setAttribute('class', 'btn');
    todosDel.classList.add('todos--delete');

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

    todo.todo && todo.todo.forEach(element => {
        toDosList(element);
    });
}

init();