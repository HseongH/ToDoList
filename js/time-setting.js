_cal.createObject('timeSet');

_cal.timeSet.preventScroll = event => {
    event.preventDefault();
    event.stopPropagation();
}

_cal.timeSet.timeSelection = (target, event) => {
    const area = target.querySelector('.selection-area');
    const time = area.querySelectorAll('li');
    const selection = time[1];
    const movement = event ? event.deltaY : 1;

    selection.classList.remove('selection-time');

    if (movement > 0) {
        area.appendChild(time[0]);
        time[2].classList.add('selection-time');
        return;
    }

    area.insertBefore(area.lastElementChild, time[0]);
    time[0].classList.add('selection-time');
}

_cal.timeSet.hoursActivation = () => {
    if (_cal.addTaskVar.hours.querySelector('.selection-time').innerText !== '--') {
        return;
    }
    
    const currentHour = _cal.calendar.getHours() % 12 <= 0 ? 12 :
    _cal.calendar.getHours() % 12;
    
    for (let i = 0; i < currentHour; i++) {
        _cal.timeSet.timeSelection(_cal.addTaskVar.hours);
    }
}

_cal.timeSet.minutesActivation = target => {
    const selection = _cal.addTaskVar.minutes.querySelector('.selection-time');
    
    if (target.querySelector('.selection-time').innerText === '--') {
        selection.classList.remove('selection-time');
        return;
    }
    
    if (selection) return;
    
    _cal.addTaskVar.minutes.querySelectorAll('li')[1].classList.add('selection-time');
}

// SCROLL EVENT
_cal.addTaskVar.hours.addEventListener('scroll', _cal.timeSet.preventScroll);
_cal.addTaskVar.minutes.addEventListener('scroll', _cal.timeSet.preventScroll);

// MOUSE WHEEL EVENT
_cal.addTaskVar.hours.addEventListener('mousewheel', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(this, event);
    _cal.timeSet.minutesActivation(this);
});
_cal.addTaskVar.minutes.addEventListener('mousewheel', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(this, event);
    _cal.timeSet.hoursActivation();
});

// TOUCH MOVE EVENT
_cal.addTaskVar.hours.addEventListener('touchmove', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(this, event);
    _cal.timeSet.minutesActivation(this);
});
_cal.addTaskVar.minutes.addEventListener('touchmove', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(this, event);
    _cal.timeSet.hoursActivation();
});
