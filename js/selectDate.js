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

// function term(start, end, calendar) {
//     const pastDate = new calendar(calendar.getFullYear(), calendar.getMonth(), 0);

    
// }

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

        index++;
    } else {
        const end = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;

        if (end > startDate.innerText) {
            endDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;

            // term(startDate.innerText, endDate.innerText, calendar);

            index = 0;
        } else {
            startDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;
        }
    }
}

function selectDate(elem) {
    const calendarList = document.querySelectorAll('.calendar__list');
    const [selectDate] = [].filter.call(calendarList, list => {
        return !list.classList.contains('not-current-month') 
        && list.querySelector('.calendar__date').innerText === elem.querySelector('.calendar__date').innerText
    });
    const sib = findSibling(selectDate);
    
    selectDate.querySelector('.calendar__date').classList.add('select-list');
    
    [].forEach.call(sib, date => {
        date.querySelector('.calendar__date').classList.remove('select-list');
    });
}

function clickDate(calendar) {
    const calendarArea = document.querySelector('.calendar-area');
    let calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', () => {
            if (!list.parentNode.classList.contains('year')) {
                if (list.classList.contains('not-current-month')) {
                    const listIndex = nodeIndex(list);
                    
                    notCurrentMonth(listIndex, calendar);
                }
                
                selectDate(list);
                
                if (calendarArea.classList.contains('calendar-task')) {
                    setFinishDate(list, calendar);
                }
            }
        });
    });
}