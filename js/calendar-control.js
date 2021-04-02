_cal.createObject('calendarControl');

_cal.calendarControl.whatTypeOfCalendar = () => {
    return [_cal.isContainYear(), _cal.isContainMonth()];
}

_cal.calendarControl.displayedByYear = () => {
    _cal.calElem.classList.toggle('year');

    _cal.calendarControl.wayOfShowing();
}

_cal.calendarControl.wayOfShowing = () => {
    const [yearType, monthType] = _cal.calendarControl.whatTypeOfCalendar();

    _cal.createCalendar.printANewCalendar();

    if (yearType) {
        _cal.createCalendar.yearlyCalendar();
    }else if (monthType) {
        _cal.createCalendar.monthlyCalendar();
    }else {
        _cal.createCalendar.weeklyCalendar();
    }

    !(_cal.isContainYear()) && _cal.chooseDate.listActivation();
}

// CREATE NEXT CALENDAR
_cal.calendarControl.nextMonth = () => {
    const [yearType, monthType] = _cal.calendarControl.whatTypeOfCalendar();

    if (yearType) {
        _cal.calendar.setFullYear(_cal.calendar.getFullYear() + 1);
        _cal.calendarControl.wayOfShowing();

        return;
    }

    if (monthType) {
        _cal.calendar.setMonth(_cal.calendar.getMonth() + 1);
        _cal.calendarControl.wayOfShowing();

        return;
    }

    _cal.calendar.setDate(_cal.calendar.getDate() + 7);
    _cal.calendarControl.wayOfShowing();
}

// CREATE LAST CALENDAR
_cal.calendarControl.lastMonth = () => {
    const [yearType, monthType] = _cal.calendarControl.whatTypeOfCalendar();

    if (yearType) {
        _cal.calendar.setFullYear(_cal.calendar.getFullYear() - 1);
        _cal.calendarControl.wayOfShowing();

        return;
    }

    if (monthType) {
        _cal.calendar.setMonth(_cal.calendar.getMonth() - 1);
        _cal.calendarControl.wayOfShowing();

        return;
    }

    _cal.calendar.setDate(_cal.calendar.getDate() - 7);
    _cal.calendarControl.wayOfShowing();
}

// RESET THE CALENDAR
_cal.calendarControl.curMonth = () => {
    _cal.calendar = new Date;

    _cal.calendarControl.wayOfShowing();
}

_cal.calendarControl.wayOfShowing();

_cal.arrowLeft.addEventListener('click', _cal.calendarControl.lastMonth);
_cal.arrowRight.addEventListener('click', _cal.calendarControl.nextMonth);
_cal.selectToday.addEventListener('click', _cal.calendarControl.curMonth);
_cal.select.addEventListener('click', _cal.calendarControl.displayedByYear);
