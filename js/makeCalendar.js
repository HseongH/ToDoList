_cal.makeObject('makeCalendar');

_cal.makeCalendar.yearIndication = () => {
    _cal.selectYear.innerText = _cal.calendar.getFullYear();
}

_cal.makeCalendar.monthIndication = () => {
    _cal.selectMonth.innerText = _cal.splitByTwoLetters(_cal.calendar.getMonth() + 1);
}

_cal.makeCalendar.showTheDay = day => {
    const dayCon = document.createElement('div');
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    dayCon.setAttribute('class', 'day');
    dayCon.innerText = days[day.getDay()];

    return dayCon;
}

_cal.makeCalendar.showTheDate = date => {
    const dateCon = document.createElement('div');

    dateCon.setAttribute('class', 'calendar__date');
    dateCon.innerText = date.getDate();

    return dateCon;
}

_cal.makeCalendar.delList = () => {
    _cal.calendarArea.innerText = '';
}

// WEEKLY CALENDAR
_cal.makeCalendar.weeklyCalendar = () => {
    const currentDate = new Date;
    const calendar = _cal.calendar;
    const weekly = new Date(calendar.getFullYear(), calendar.getMonth());

    for (let i = -3; i <= 3; i++) {
        weekly.setDate(calendar.getDate() + i);

        const calList = document.createElement('li');
        const days = _cal.makeCalendar.showTheDay(weekly);
        const dates = _cal.makeCalendar.showTheDate(weekly);

        calList.setAttribute('class', 'calendar__list');
        calList.appendChild(days);
        calList.appendChild(dates);
        
        if (weekly.toDateString() === currentDate.toDateString()) {
            // sunset([calList]);
            calList.classList.add('today');
        }

        _cal.calendarArea.appendChild(calList);
    }
}

// _cal.makeCalendar.weeklyCalendar();

// MONTHLY CALENDAR
_cal.makeCalendar.monthlyCalendar = () => {
    const calendar = _cal.calendar;
    const month = new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    const nextMonth = new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    const currentDate = new Date;

    const firstDay = month.getDay();
    const lastDay = nextMonth.getDate();

    month.setDate(month.getDate() - month.getDay());

    for (let i = 0; i < 42; i++) {
        const calList = document.createElement('li');
        const dates = _cal.makeCalendar.showTheDate(month);

        calList.setAttribute('class', 'calendar__list');

        if (i <= 6) {
            const days = _cal.makeCalendar.showTheDay(month);
            calList.appendChild(days)
        }
        
        if (i < firstDay || i - firstDay >= lastDay) {
            calList.classList.add('not-current-month');
        }
        calList.appendChild(dates);
        
        if (month.toDateString() === currentDate.toDateString()
            && !_cal.isCurrentMonth(calList)) {
            // sunset([calList]);
            calList.classList.add('today');
        }

        _cal.calendarArea.appendChild(calList);

        month.setDate(month.getDate() + 1);
    }
}

_cal.makeCalendar.monthlyCalendar();
