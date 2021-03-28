_cal.createObject('timeSet');

_cal.timeSet.hour = document.querySelector('.hours');
_cal.timeSet.minute = document.querySelector('.minutes');

_cal.timeSet.preventScroll = event => {
    event.preventDefault();
    event.stopPropagation();
}

_cal.timeSet.minutesActivation = (target) => {
    const selection = target.querySelector('.selection-time');
    const area = _cal.timeSet.minute.querySelector('.selection-area');

    if (selection.innerText !== '--') {
        area.classList.remove('hide');
        return;
    }

    area.classList.add('hide');
}

_cal.timeSet.timeSelection = (target, event) => {
    const area = target.querySelector('.selection-area');
    const time = area.querySelectorAll('li');
    const selection = time[1];
    const movement = event.deltaY;

    selection.classList.remove('selection-time');

    if (movement > 0) {
        area.appendChild(time[0]);
        time[2].classList.add('selection-time');
        return;
    }

    area.insertBefore(area.lastElementChild, time[0]);
    time[0].classList.add('selection-time');
}

// SCROLL EVENT
_cal.timeSet.hour.addEventListener('scroll', _cal.timeSet.preventScroll);
_cal.timeSet.minute.addEventListener('scroll', _cal.timeSet.preventScroll);

// MOUSE WHEEL EVENT
_cal.timeSet.hour.addEventListener('mousewheel', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.minutesActivation(this);
    _cal.timeSet.timeSelection(this, event);
});
_cal.timeSet.minute.addEventListener('mousewheel', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(this, event);
});

// TOUCH MOVE EVENT
_cal.timeSet.hour.addEventListener('touchmove', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.minutesActivation(this);
    _cal.timeSet.timeSelection(this, event);
});
_cal.timeSet.minute.addEventListener('touchmove', function() {
    _cal.timeSet.preventScroll(event);
    _cal.timeSet.timeSelection(this, event);
});
