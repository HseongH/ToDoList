_cal.createObject('displayedAList');

_cal.displayedAList.modifyList = target => {
    const id = target.parentNode.id;

    _cal.calendarInitial.id = id;

    _cal.sendLink.sendAsTask();

    location.href = 'addTask.html';
}

_cal.displayedAList.returnDate = () => {
    const calendarList = document.querySelectorAll('.calendar__list');
    const dateArr = [].map.call(calendarList, list => {
        const dateString = _cal.chooseDate.redefineDate(list);

        return dateString;
    });

    return dateArr;
}

_cal.displayedAList.showCompletionDueDate = (start, end) => {
    const term = _cal.chooseDate.dateTerm(start, end);
    
    [].forEach.call(term, apply => {
        const contains = apply.querySelector('.list-term');

        if (contains) return;

        const listTerm = document.createElement('div');
        listTerm.setAttribute('class', 'list-term');
        apply.insertBefore(listTerm, apply.children[1]);
    })
}

_cal.displayedAList.listByDate = () => {
    const sectionCalendar = document.querySelector('.section--calendar');
    const todo = _cal.getToDoList();

    if (sectionCalendar.classList.contains('hide') || !todo) return;

    const calendarList = document.querySelectorAll('.calendar__list');
    const dateArr = _cal.displayedAList.returnDate();

    todo.forEach(task => {
        if (task.endDate) {
            _cal.displayedAList.showCompletionDueDate(task.startDate, task.endDate);
            return;
        }

        const idx = dateArr.indexOf(task.startDate);

        if (idx === -1) return;

        const contains = calendarList[idx].querySelector('.has-list');

        if (contains) return;

        const hasList = document.createElement('div');
        hasList.setAttribute('class', 'has-list');

        calendarList[idx].appendChild(hasList);
    });
}

_cal.displayedAList.listDisplay = list => {
    const lists = document.querySelectorAll('.todos__list');
    const dateString = _cal.chooseDate.redefineDate(list);
    
    [].forEach.call(lists, (task, idx) => {
        const toDo = _cal.getToDoList()[idx];

        if (toDo.startDate === dateString) {
            task.classList.remove('hide');
            return;
        }

        if (toDo.startDate <= dateString && toDo.endDate >= dateString) {
            task.classList.remove('hide');
            return;
        }

        task.classList.add('hide');
    });
}

_cal.displayedAList.completeList = target => {
    const comList = target.parentNode;

    const retouch = _cal.getToDoList().map(task => {
        if (task.id !== parseInt(comList.id)) {
            return task;
        }

        if (task.complete) {
            task.complete = false;
            return task;
        }

        task.complete = true;
        return task;
    });

    comList.classList.toggle('complete');
    _cal.saveList(retouch);
}

_cal.displayedAList.removeListByDate = id => {
    const sectionCalendar = document.querySelector('.section--calendar');
    const selectList = document.querySelector('.select-list');

    if (sectionCalendar.classList.contains('hide') || !selectList) return;

    const [todo] = _cal.getToDoList().filter(task => 
        task.id === id
    );

    if (todo.endDate) {
        const term = _cal.chooseDate.dateTerm(todo.startDate, todo.endDate);

        [].forEach.call(term, apply => {
            const listTerm = apply.querySelector('.list-term');

            apply.removeChild(listTerm);
        })

        return;
    }

    const calendarList = selectList.parentNode;
    const hasList = calendarList.querySelector('.has-list');

    calendarList.removeChild(hasList);
}

_cal.displayedAList.reorderItems = () => {
    const lists = document.querySelectorAll('.todos__list');

    lists.forEach((list, idx) => {
        list.id = idx;
    });
}

_cal.displayedAList.removeList = target => {
    const removeTarget = target.parentNode;
    const id = parseInt(removeTarget.id);
    const toDo = _cal.getToDoList().filter(task => 
        task.id !== id     
    );
    toDo.forEach((task, idx) => {
        task.id = idx;
    });

    _cal.displayedAList.removeListByDate(id);
    removeTarget.parentNode.removeChild(removeTarget);
    
    _cal.displayedAList.reorderItems();
    _cal.saveList(toDo);
    _cal.displayedAList.listByDate();
}

_cal.displayedAList.disTask = task => {
    const todayString = _cal.fullDate;
    const showCondition = task.endDate ? 
    task.startDate <= todayString && todayString <= task.endDate : 
    task.startDate === todayString;

    const area = document.querySelector('.todos');
    const doLists = document.createElement('li');
    const complete = document.createElement('button');
    const comBtn = document.createElement('div');
    const date = document.createElement('div');

    const todo = document.createElement('div');
    const title = document.createElement('h3');
    const des = document.createElement('p');
    
    const modify = document.createElement('button');
    const delBtn = document.createElement('button');

    const modifyIcon = document.createElement('img');
    const deleteIcon = document.createElement('img');

    doLists.id = task.id;
    doLists.setAttribute('class', 'todos__list');
    !(showCondition) && doLists.classList.add('hide');
    task.complete && doLists.classList.add('complete');

    complete.setAttribute('class', 'todos--complete');
    complete.classList.add('btn');
    comBtn.setAttribute('class', 'btn--complete');

    todo.setAttribute('class', 'task');
    title.setAttribute('class', 'task__title');
    des.setAttribute('class', 'task__description');
    date.setAttribute('class', 'task__date');

    modify.setAttribute('class', 'todos--modify');
    modify.classList.add('btn');
    delBtn.setAttribute('class', 'todos--delete');
    delBtn.classList.add('btn');

    modifyIcon.src = 'https://img.icons8.com/windows/32/000000/edit--v1.png';
    modifyIcon.alt = 'edit icon';
    deleteIcon.src = 'https://img.icons8.com/windows/32/000000/delete-sign.png';
    deleteIcon.alt = 'delete icon';

    title.innerText = task.title;
    des.innerText = task.description;
    date.innerText = task.startDate;
    modify.appendChild(modifyIcon);
    delBtn.appendChild(deleteIcon);

    complete.appendChild(comBtn);
    todo.appendChild(title);
    todo.appendChild(des);
    if (task.time) {
        const time = document.createElement('div');
        time.setAttribute('class', 'task__time');
        time.innerText = task.time;
        todo.appendChild(time);
    }

    if (task.endDate) {
        date.innerText = `${task.startDate} ~ ${task.endDate}`;
    }

    todo.appendChild(date);
    doLists.appendChild(complete);
    doLists.appendChild(todo);
    doLists.appendChild(modify);
    doLists.appendChild(delBtn);

    area.appendChild(doLists);

    delBtn.addEventListener('click', function() {
        _cal.displayedAList.removeList(this);
    });
    complete.addEventListener('click', function() {
        _cal.displayedAList.completeList(this);
    });
    modify.addEventListener('click', function() {
        _cal.displayedAList.modifyList(this);
    });
}

_cal.getToDoList() && _cal.getToDoList().forEach(task => {
    _cal.displayedAList.disTask(task);
});

_cal.indexVar.addToDos.addEventListener('click', _cal.sendLink.sendAsTask);
