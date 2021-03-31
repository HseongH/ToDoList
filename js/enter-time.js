_cal.timeSet.setAMOrPM = target => {
    if (target.classList.contains('current-noon')) return;

    const [remove] = _cal.findSiblings(target);
    target.classList.add('current-noon');
    remove.classList.remove('current-noon');
}

_cal.timeSet.enterTimes = (elem, input, ori) => {
    const area = elem.parentNode.parentNode;
    const enterTime = parseInt(input);

    elem.innerText = ori;

    if (area === _cal.addTaskVar.hours) {
        _cal.calendar.setHours(enterTime);

        const currentHour = _cal.calendar.getHours() % 12 <= 0 ? 12 :
        _cal.calendar.getHours() % 12;

        _cal.timeSet.timeSetting(area, currentHour);
        _cal.timeSet.minutesActivation(area);
        _cal.timeSet.AMOrPM();
        
        return;
    }

    const currentMinute = enterTime % 60 <= 0 ? 60 : enterTime % 60;
    
    _cal.timeSet.timeSetting(area, currentMinute);
}

_cal.timeSet.createAnInputArea = target => {
    if (target.querySelector('input') || !(target.classList.contains('selection-time'))) return;

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

_cal.timeSet.timeInputActivation = () => {
    const selection = document.querySelectorAll('.selection-time');

    [].forEach.call(selection, select => {
        select.addEventListener('click', function() {
            _cal.timeSet.createAnInputArea(this);
        });
    });
}

_cal.timeSet.timeInputActivation();

[].forEach.call(_cal.addTaskVar.noon, noon => {
    noon.addEventListener('click', function() {
        _cal.timeSet.setAMOrPM(this);
    })
});
