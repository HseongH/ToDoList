_cal.timeSet.enterTimes = (elem, input, ori) => {
    const area = elem.parentNode.parentNode;

    elem.innerText = ori;

    if (area === _cal.addTaskVar.hours) {
        _cal.calendar.setHours(parseInt(input));

        const currentHour = _cal.calendar.getHours() % 12 <= 0 ? 12 :
        _cal.calendar.getHours() % 12;

        _cal.timeSet.timeSetting(area, currentHour);
        _cal.timeSet.minutesActivation(area);
        
        return;
    }
    
    _cal.calendar.setMinutes(parseInt(input));
    
    _cal.timeSet.timeSetting(area, _cal.calendar.getMinutes());
    _cal.timeSet.hoursActivation();
}

_cal.timeSet.createAnInputArea = target => {
    if (target.querySelector('input')) return;

    const inputTimeArea = document.createElement('input');
    const originalValue = target.innerText;

    inputTimeArea.setAttribute('type', 'number');
    inputTimeArea.setAttribute('class', 'input-time');
    inputTimeArea.value = originalValue;

    target.innerText = '';
    target.appendChild(inputTimeArea);
    inputTimeArea.select();

    inputTimeArea.addEventListener('blur', () => {
        _cal.timeSet.enterTimes(target, inputTimeArea.value, originalValue);
    });
}

_cal.timeSet.hoursSelectionTime = _cal.addTaskVar.hours.querySelectorAll('li')[1];
_cal.timeSet.minutesSelectionTime = _cal.addTaskVar.minutes.querySelectorAll('li')[1];

_cal.timeSet.hoursSelectionTime.addEventListener('click', function() {
    _cal.timeSet.createAnInputArea(this);
});
_cal.timeSet.minutesSelectionTime.addEventListener('click', function() {
    _cal.timeSet.createAnInputArea(this);
});
