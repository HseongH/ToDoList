_cal.createObject('endTimeSetting');

_cal.endTimeSetting.numberOfClick = 0;

_cal.endTimeSetting.selectedDate = () => {
    const term = _cal.chooseDate.dateTerm(_cal.addTaskVar.startDate.innerText, _cal.addTaskVar.endDate.innerText);

    [].forEach.call(term, elem => {
        elem.querySelector('.calendar__date').classList.add('select-list');
    });
}

_cal.endTimeSetting.endTimeSetting = target => {
    const year = _cal.calendar.getFullYear();
    const month = _cal.calendar.getMonth() + 1;
    const date = _cal.splitByTwoLetters(target.querySelector('.calendar__date').innerText);
    const dateString = `${year} / ${_cal.splitByTwoLetters(month)} / ${date}`;
    
    if (_cal.endTimeSetting.numberOfClick <= 0 || dateString <= _cal.addTaskVar.startDate.innerText) {
        _cal.addTaskVar.startDate.innerText = dateString;
        
        _cal.addTaskVar.endDate.innerText = '---- / -- / --';

        _cal.endTimeSetting.numberOfClick++;
        
        return;
    }
    
    _cal.addTaskVar.endDate.innerText = dateString;

    _cal.endTimeSetting.selectedDate();

    _cal.endTimeSetting.numberOfClick = 0;
}
