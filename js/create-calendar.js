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
    const dateString = `${date.getFullYear()} / ${_cal.splitByTwoLetters(date.getMonth() + 1)} / ${_cal.splitByTwoLetters(date.getDate())}`;

    dateCon.setAttribute('class', 'calendar__date');
    
    if (dateString === _cal.fullDate) {
        dateCon.classList.add('select-list');
        _cal.colorChange.selectOverTime(dateCon);
    }

    dateCon.innerText = date.getDate();

    return dateCon;
}

_cal.createCalendar.createCalendarList = date => {
    const calList = document.createElement('li');
    
    calList.setAttribute('class', 'calendar__list');
    
    if (date.toDateString() === _cal.today.toDateString()) {
        calList.classList.add('sunrise');
        _cal.colorChange.overTime(calList);
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
    const week = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate());
    const numberOfLists = 7;

    week.setDate(week.getDate() - week.getDay());

    for (let i = 0; i < numberOfLists; i++) {
        const calList = _cal.createCalendar.createCalendarList(week);
        const dates = _cal.createCalendar.showTheDate(week);
        const conditions = week.getMonth() !== calendar.getMonth();
        
        calList.appendChild(dates);

        if (conditions) calList.classList.add('not-this-month');
        
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
        const conditions = [
            i < firstDay,
            i >= lastDay + firstDay
        ];
        
        calList.appendChild(dates);

        if (conditions.includes(true)) {
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
            _cal.colorChange.selectOverTime(calList);
        }

        calList.addEventListener('click', () => {
            _cal.createCalendar.monthSelection(calList);
        });
        year.setMonth(year.getMonth() + 1);
    }
}
