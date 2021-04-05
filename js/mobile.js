_cal.createObject('mobile');

_cal.mobile.moveX;

_cal.mobile.createCalendar = event => {
    const movement = event.changedTouches[0].clientX - _cal.mobile.moveX;

    if (movement < 0) {
        _cal.calendarControl.nextMonth();
        return;
    }

    _cal.calendarControl.lastMonth();
}

// CALENDAR CONTROL
// TOUCH START
_cal.calendarArea.addEventListener('touchstart', function(event) {
    _cal.mobile.moveX = event.touches[0].clientX;
});

// TOUCH END
_cal.calendarArea.addEventListener('touchend', function(event) {
    _cal.mobile.createCalendar(event);
});
