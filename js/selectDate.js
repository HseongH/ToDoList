function notCurrentMonth(list) {
    const calendarArea = document.querySelector('.calendar-area');
    const month = new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    const firstDay = month.getDay();
    const listIndex = nodeIndex(list);

    if (listIndex < firstDay) {
        pastDate(calendarArea);
    } else {
        nextDate(calendarArea);
    }
}

function addSelect(elem, sib) {
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
        const localList = toDoList.todo[nodeIndex(list)];

        if (localList.endDate) {
            if (`${year} / ${month} / ${date}` >= localList.startDate && `${year} / ${month} / ${date}` <= localList.endDate) {
                list.classList.remove('hide');
                list.classList.add('show');
            } else {
                list.classList.remove('show');
                list.classList.add('hide');
            }
        } else {
            if (localList.startDate === `${year} / ${month} / ${date}`) {
                list.classList.remove('hide');
                list.classList.add('show');
            } else {
                list.classList.remove('show');
                list.classList.add('hide');
            }
        }
    });
}

function selectDate(elem) {
    const calendarList = document.querySelectorAll('.calendar__list');
    const [selectDate] = [].filter.call(calendarList, list => {
        return !list.classList.contains('not-current-month') 
        && list.querySelector('.calendar__date').innerText === elem.querySelector('.calendar__date').innerText
    });
    const sib = findSibling(selectDate);

    addSelect([selectDate], sib);
    if (!currentCalendar()){
        showList(elem);
    }
}

function clickDate() {
    const calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', () => {
            if (list.parentNode) {
                if (list.classList.contains('not-current-month')) {
                    notCurrentMonth(list);
                }
                
                selectDate(list);
            }
        });
    });
}