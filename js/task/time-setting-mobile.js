_cal.mobile.moveY;

_cal.mobile.minuteSetting = (event, target) => {
    const movement = _cal.mobile.moveY - event.changedTouches[0].clientY;

    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(target, event, movement);
    _cal.timeSet.hoursActivation();
}

_cal.mobile.hourSetting = (event, target) => {
    const movement = _cal.mobile.moveY - event.changedTouches[0].clientY;

    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(target, event, movement);
    _cal.timeSet.minutesActivation(target);
}

// TIME SETTING CONTROL
// TOUCH START
_cal.addTaskVar.hours.addEventListener('touchstart', function(event) {
    _cal.mobile.moveY = event.touches[0].clientY;
});

_cal.addTaskVar.minutes.addEventListener('touchstart', function(event) {
    _cal.mobile.moveY = event.touches[0].clientY;
});

// TOUCHEND
_cal.addTaskVar.hours.addEventListener('touchend', function(event) {
    _cal.mobile.hourSetting(event, this);
});

_cal.addTaskVar.minutes.addEventListener('touchend', function(event) {
    _cal.mobile.minuteSetting(event, this);
});
