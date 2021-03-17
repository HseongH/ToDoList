function earlyOrSlow(list, select) {
    const month = new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    const firstDay = month.getDay();
    const listIndex = nodeIndex(list);

    if (listIndex < firstDay) {
        const sp = select.split(' / ')
        sp[1] = makeTwoString(parseInt(sp[1]) - 1);
        if (sp[1] <= 0) {
            sp[1] = '12';
            sp[0] = `${parseInt(sp[0]) - 1}`;
        }

        return sp.join(' / ');
    } else {
        const sp = select.split(' / ')
        sp[1] = makeTwoString(parseInt(sp[1]) + 1);
        if (sp[1] >= 12) {
            sp[1] = '01';
            sp[0] = `${parseInt(sp[0]) + 1}`;
        }

        return sp.join(' / ');
    }
}

function term(startDate, endDate) {
    const calendarList = document.querySelectorAll('.calendar__list');
    const year = document.querySelector('.select-year').innerText;
    const month = document.querySelector('.select-month').innerText;

    const selectDate = [].filter.call(calendarList, list => {
        const date = makeTwoString(list.querySelector('.calendar__date').innerText);
        let select = `${year} / ${month} / ${date}`;

        if (list.classList.contains('not-current-month')) {
            select = earlyOrSlow(list, select);
        }
        
        return startDate <= select && endDate >= select;
    });
    
    if (currentCalendar()) {
        addSelect(selectDate);
    } else {
        toDoTerm(selectDate);
    }
}