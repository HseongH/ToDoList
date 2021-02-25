let index = 0;

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

function setFinishDate(elem, calendar) {
    const year = calendar.getFullYear();
    const month = calendar.getMonth();
    const date = elem.querySelector('.calendar__date').innerText;
    const startDate = document.querySelector('.select-date');
    const endDate = document.querySelectorAll('.select-date')[1];
    
    if (index === 0) {
        startDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;
        endDate.innerText = '---- / -- / --';
        start = parseInt(date);
        index++;
    } else {
        const end = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;

        if (end > startDate.innerText) {
            endDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;
            index = 0;
        } else {
            startDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;
        }
    }
}

function selectDate(elem) {
    const sib = findSibling(elem);

    elem.querySelector('.calendar__date').classList.add('select-list');
    
    [].forEach.call(sib, date => {
        date.querySelector('.calendar__date').classList.remove('select-list');
    });
}

function clickDate(calendar) {
    const calendarArea = document.querySelector('.calendar-area');
    let calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', () => {
            selectDate(list);

            if (calendarArea.classList.contains('calendar-task')) {
                setFinishDate(list, calendar);
            }
            
            if (list.classList.contains('not-current-month')) {
                const listIndex = nodeIndex(list);
                
                notCurrentMonth(listIndex, calendar);
            }
        });
    });
}