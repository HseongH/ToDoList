_cal.createObject('displayedAList');

_cal.displayedAList.toDo = JSON.parse(localStorage.getItem('toDoLists'));

_cal.displayedAList.returnDate = () => {
    const calendarList = document.querySelectorAll('.calendar__list');
    const dateArr = [].map.call(calendarList, list => {
        let [year, month] = [_cal.calendar.getFullYear(), _cal.calendar.getMonth() + 1];
        const calDate = list.querySelector('.calendar__date');
        const date = _cal.splitByTwoLetters(calDate.innerText);

        if (_cal.isCurrentMonth(list)) {
            [year, month] = _cal.chooseDate.redefineDate(year, month, list);
        }

        const dateString = `${year} / ${_cal.splitByTwoLetters(month)} / ${date}`;

        return dateString;
    });

    return dateArr;
}

_cal.displayedAList.showCompletionDueDate = (start, end) => {
    const term = _cal.chooseDate.dateTerm(start, end);
    
    [].forEach.call(term, apply => {
        const contains = apply.querySelector('list-term');

        if (contains) return;

        const listTerm = document.createElement('div');
        listTerm.setAttribute('class', 'list-term');
        apply.appendChild(listTerm);
    })
}

_cal.displayedAList.listByDate = () => {
    const calendarList = document.querySelectorAll('.calendar__list');
    const dateArr = _cal.displayedAList.returnDate();
    const todo = _cal.displayedAList.toDo;

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
    const year = _cal.calendar.getFullYear();
    const month = _cal.splitByTwoLetters(_cal.calendar.getMonth() + 1);
    const date = _cal.splitByTwoLetters(list.querySelector('.calendar__date').innerText);
    const dateString = `${year} / ${month} / ${date}`;
    const lists = document.querySelectorAll('.todos__list');
    
    [].forEach.call(lists, (task, idx) => {
        const toDo = _cal.displayedAList.toDo[idx];

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

    const retouch = _cal.displayedAList.toDo.map(task => {
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

_cal.displayedAList.reorderItems = function() {
    const lists = document.querySelectorAll('.todos__list');

    lists.forEach((list, idx) => {
        list.id = idx;
    })
}

_cal.displayedAList.removeList = target => {
    const removeTarget = target.parentNode;

    _cal.displayedAList.toDo = _cal.displayedAList.toDo.filter(task => 
        task.id !== parseInt(removeTarget.id)    
    );
    _cal.displayedAList.toDo.forEach((task, idx) => {
        task.id = idx;
    });

    removeTarget.parentNode.removeChild(removeTarget);

    _cal.displayedAList.reorderItems();
    _cal.saveList(_cal.displayedAList.toDo);
}

_cal.displayedAList.disTask = task => {
    const todayString = `${_cal.today.getFullYear()} / ${_cal.splitByTwoLetters(_cal.today.getMonth() + 1)} / ${_cal.splitByTwoLetters(_cal.today.getDate())}`;

    const area = document.querySelector('.todos');
    const doLists = document.createElement('li');
    const complete = document.createElement('button');
    const comBtn = document.createElement('div');

    const todo = document.createElement('div');
    const title = document.createElement('h3');
    const des = document.createElement('p');
    
    const modify = document.createElement('button');
    const delBtn = document.createElement('button');

    doLists.id = task.id;
    doLists.setAttribute('class', 'todos__list');
    task.startDate !== todayString && doLists.classList.add('hide');
    task.complete && doLists.classList.add('complete');

    complete.setAttribute('class', 'todos--complete');
    complete.classList.add('btn');
    comBtn.setAttribute('class', 'btn--complete');

    todo.setAttribute('class', 'task');
    title.setAttribute('class', 'task__title');
    des.setAttribute('class', 'task__description');

    modify.setAttribute('class', 'todos--modify');
    modify.classList.add('btn');

    delBtn.setAttribute('class', 'todos--delete');
    delBtn.classList.add('btn');

    title.innerText = task.title;
    des.innerText = task.description;
    modify.innerText = '✏';
    delBtn.innerText = '×';

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
        const term = document.createElement('div');
        term.setAttribute('class', 'task__end-date');
        term.innerText = task.endDate;
        todo.appendChild(term);
    }

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
}

_cal.displayedAList.toDo && _cal.displayedAList.toDo.forEach(task => {
    _cal.displayedAList.disTask(task);
});
