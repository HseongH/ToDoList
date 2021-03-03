function LocalToDo() {
    this.todo = JSON.parse(localStorage.getItem('toDoLists'));
}

function completeList() {
    const list = this.parentNode;
    const toDoList = new LocalToDo;

    if (!list.classList.contains('complete')) {
        toDoList.todo = toDoList.todo.map(doList => {
            if (doList.id === parseInt(list.id)) {
                doList.com = true;
            }
            return doList;
        });
    
        list.classList.add('complete');
    } else {
        toDoList.todo = toDoList.todo.map(doList => {
            if (doList.id === parseInt(list.id)) {
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

    todoList.todo = todoList.todo.filter(doList => doList.id !== parseInt(remove.id));
    todoList.todo = todoList.todo.map((doList, i) => {
        doList.id = i;
        return doList;
    });
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
    const taskTime = document.createElement('div');

    const todosDel = document.createElement('div');

    todosList.setAttribute('class', 'todos__list');
    todosList.setAttribute('id', todo.id);
    todo.com && todosList.classList.add('complete');

    todosComplete.setAttribute('class', 'todos--complete');
    btnComplete.setAttribute('class', 'btn');
    btnComplete.classList.add('btn--complete');

    task.setAttribute('class', 'task');
    taskTitle.setAttribute('class', 'task__title');
    taskDes.setAttribute('class', 'task__description');
    taskTime.setAttribute('class', 'task__time');

    todosDel.setAttribute('class', 'todos--delete');

    taskTitle.innerText = todo.title;
    taskDes.innerText = todo.description;
    todosDel.innerText = '×';

    todosComplete.appendChild(btnComplete);
    task.appendChild(taskTitle);
    task.appendChild(taskDes);
    if (todo.time) {
        taskTime.innerText = todo.time;
        task.appendChild(taskTime);
    }

    todosList.appendChild(todosComplete);
    todosList.appendChild(task);
    todosList.appendChild(todosDel);

    todos.appendChild(todosList);

    todosDel.addEventListener('click', removeList);
    todosComplete.addEventListener('click', completeList);
    console.log(todo.id);
}

function init() {
    const todo = new LocalToDo;

    todo && todo.todo.forEach(element => {
        toDosList(element, todo);
    });
}

init();