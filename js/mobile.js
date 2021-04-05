_cal.createCalendar('mobile');

_cal.mobile.moveX;
_cal.mobile.moveY;

_cal.mobile.minuteSetting = (e, target) => {
    const movement = e.changedTouches[0].clientY - _cal.mobile.moveY;

    _cal.timeSet.preventScroll(e);
    _cal.timeSet.timeSelection(target, e, movement);
    _cal.timeSet.hoursActivation();
}

_cal.mobile.hourSetting = (e, target) => {
    const movement = e.changedTouches[0].clientY - _cal.mobile.moveY;

    _cal.timeSet.preventScroll(e);
    _cal.timeSet.timeSelection(target, e, movement);
    _cal.timeSet.minutesActivation(target);
}

_cal.mobile.createCalendar = e => {
    const movement = e.changedTouches[0].clientX - _cal.mobile.moveX;

    if (movement > 0) {
        _cal.calendarControl.nextMonth();
        return;
    }

    _cal.calendarControl.lastMonth();
}

// CALENDAR CONTROL
// TOUCH START
_cal.calendarArea.addEventListener('touchstart', function(e) {
    _cal.mobile.moveX = e.touches[0].clientX;
});

// TOUCH END
_cal.calendarArea.addEventListener('touchend', function(e) {
    _cal.mobile.createCalendar(e);
});

// TIME SETTING CONTROL
// TOUCH START
_cal.addTaskVar.hours.addEventListener('touchstart', function(e) {
    _cal.mobile.moveY = e.touches[0].clientY;
});

_cal.addTaskVar.minutes.addEventListener('touchstart', function(e) {
    _cal.mobile.moveY = e.touches[0].clientY;
});

// TOUCHEND
_cal.addTaskVar.hours.addEventListener('touchend', function(e) {
    _cal.mobile.hourSetting(e, this);
});

_cal.addTaskVar.minutes.addEventListener('touchend', function(e) {
    _cal.mobile.minuteSetting(e, this);
});
