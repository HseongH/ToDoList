function nodeIndex(elem) {
    let sibling = elem.previousSibling;
    let nodeIndex = 0;

    while(sibling) {
        if (sibling.nodeType === 1) {
            sibling = sibling.previousSibling;
            nodeIndex++;
        }
    }

    return nodeIndex;
}

function notCurrentMonth(listIndex, calendar) {
    const calendarArea = document.querySelector('.calendar-area');
    const month = new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    const firstDay = month.getDay();

    if (listIndex < firstDay) {
        pastDate(calendarArea, calendar);
    } else {
        nextDate(calendarArea, calendar);
    }
}

function addSelect(calendar, elem, sib) {
    [].forEach.call(elem, elem => {
        if(calendar.getHours() >= 18 || calendar.getHours() <= 6) {
            elem.querySelector('.calendar__date').classList.add('select-sunset');
        } else {
            elem.querySelector('.calendar__date').classList.add('select-list');
        }
    });

    sib && [].forEach.call(sib, elem => {
        if(calendar.getHours() >= 18 || calendar.getHours() <= 6) {
            elem.querySelector('.calendar__date').classList.remove('select-sunset');
        } else {
            elem.querySelector('.calendar__date').classList.remove('select-list');
        }
    });
}

function showList(elem) {
    const toDoList = new LocalToDo;
    const year = document.querySelector('.select-year').innerText;
    const month = document.querySelector('.select-month').innerText;
    const date = makeTwoString(elem.querySelector('.calendar__date').innerText);
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

function selectDate(elem, calendar) {
    const calendarList = document.querySelectorAll('.calendar__list');
    const [selectDate] = [].filter.call(calendarList, list => {
        return !list.classList.contains('not-current-month') 
        && list.querySelector('.calendar__date').innerText === elem.querySelector('.calendar__date').innerText
    });
    const sib = findSibling(selectDate);

    addSelect(calendar, [selectDate], sib);
    if (!document.querySelector('.calendar-task')){
        showList(elem);
    }
}

function clickDate(calendar) {
    const calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', () => {
            if (list.parentNode) {
                if (list.classList.contains('not-current-month')) {
                    const listIndex = nodeIndex(list);
                    
                    notCurrentMonth(listIndex, calendar);
                }
                
                selectDate(list, calendar);
            }
        });
    });
}