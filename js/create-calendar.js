_cal.createObject('createCalendar');

_cal.createCalendar.yearIndication = () => {
    _cal.selectYear.innerText = _cal.calendar.getFullYear();
}

_cal.createCalendar.monthIndication = () => {
    _cal.selectMonth.innerText = _cal.splitByTwoLetters(_cal.calendar.getMonth() + 1);
}

_cal.createCalendar.delLists = () => {
    _cal.calendarArea.innerText = '';
}

_cal.createCalendar.printANewCalendar = () => {
    _cal.createCalendar.yearIndication();
    _cal.createCalendar.monthIndication();
    _cal.createCalendar.delLists();
}

_cal.createCalendar.showTheDate = date => {
    const dateCon = document.createElement('div');

    dateCon.setAttribute('class', 'calendar__date');
    dateCon.innerText = date.getDate();

    return dateCon;
}

_cal.createCalendar.createCalendarList = date => {
    const calList = document.createElement('li');
    const today = new Date;
    
    calList.setAttribute('class', 'calendar__list');
    
    if (date.toDateString() === today.toDateString()) {
        calList.classList.add('sunrise');
        // sunset([calList]);
    }

    return calList;
}

_cal.createCalendar.monthSelection = elem => {
    const month = parseInt(elem.innerText);
    _cal.calendar.setMonth(month - 1);

    _cal.calendarControl.displayedByYear();
}

// WEEKLY CALENDAR
_cal.createCalendar.weeklyCalendar = () => {
    const calendar = _cal.calendar;
    const week = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate() - 3);

    for (let i = 0; i < 7; i++) {
        const calList = _cal.createCalendar.createCalendarList(week);
        const dates = _cal.createCalendar.showTheDate(week);
        
        calList.appendChild(dates);
        
        _cal.calendarArea.appendChild(calList);
        
        week.setDate(week.getDate() + 1);
    }
}

// MONTHLY CALENDAR
_cal.createCalendar.monthlyCalendar = () => {
    const calendar = _cal.calendar;
    const month = new Date(calendar.getFullYear(), calendar.getMonth());
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const firstDay = month.getDay();
    const lastDay = nextMonth.getDate();
    const numberOfLists = 42;

    month.setDate(month.getDate() - month.getDay());

    for (let i = 0; i < numberOfLists; i++) {
        const calList = _cal.createCalendar.createCalendarList(month);
        const dates = _cal.createCalendar.showTheDate(month);
        
        calList.appendChild(dates);

        if (i < firstDay || i >= lastDay + firstDay) {
            calList.classList.add('not-this-month');
        }

        _cal.calendarArea.appendChild(calList);

        month.setDate(month.getDate() + 1);
    }
}

// YEARLY CALENDAR
_cal.createCalendar.yearlyCalendar = () => {
    const year = new Date(_cal.calendar.getFullYear());
    const numberOfLists = 12;

    for (let i = 0; i < numberOfLists; i++) {
        const calList = _cal.createCalendar.createCalendarList(year);
        calList.innerText = `${year.getMonth() + 1}월`;

        _cal.calendarArea.appendChild(calList);

        if (year.getMonth() === _cal.calendar.getMonth()) {
            calList.classList.add('select-list');
        }

        calList.addEventListener('click', () => {
            _cal.createCalendar.monthSelection(calList);
        });
        year.setMonth(year.getMonth() + 1);
    }
}
