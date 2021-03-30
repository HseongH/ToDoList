_cal.createObject('timeSet');

_cal.timeSet.preventScroll = event => {
    event.preventDefault();
    event.stopPropagation();
}

_cal.timeSet.settingAMPM = () => {
    const currentNoon = document.querySelector('.current-noon');
    const [noon] = _cal.findSiblings(currentNoon);

    currentNoon.classList.remove('current-noon');
    noon.classList.add('current-noon');
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

_cal.timeSet.timeSetting = (target, time) => {
    const currentNoon = document.querySelector('.current-noon');

    for (let i = 0; i < time; i++) {
        _cal.timeSet.timeSelection(target);
    }

    if (_cal.calendar.getHours() >= 12) {
        if (currentNoon.innerText === 'PM') return;
        _cal.timeSet.settingAMPM();
        return;
    }

    if (currentNoon.innerText === 'AM') return;
    _cal.timeSet.settingAMPM();
}

_cal.timeSet.hoursActivation = () => {
    if (_cal.addTaskVar.hours.querySelector('.selection-time').innerText !== '--') {
        return;
    }

    const currentHour = _cal.calendar.getHours() % 12 <= 0 ? 12 :
    _cal.calendar.getHours() % 12;

    _cal.timeSet.timeSetting(_cal.addTaskVar.hours, currentHour);
}

_cal.timeSet.minutesActivation = target => {
    const selection = _cal.addTaskVar.minutes.querySelector('.selection-time');
    const hoursSelection = target.querySelector('.selection-time');
    
    if (hoursSelection.innerText === '--') {
        selection.classList.remove('selection-time');
        return;
    }

    if (hoursSelection.innerText === '12') {
        _cal.timeSet.settingAMPM();
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
