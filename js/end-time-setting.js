_cal.createObject('endTimeSetting');

_cal.endTimeSetting.numberOfClick = 0;

_cal.endTimeSetting.startDate = document.querySelector('.select-date');
_cal.endTimeSetting.endDate = document.querySelectorAll('.select-date')[1];

_cal.endTimeSetting.selectedDate = () => {
    const term = _cal.chooseDate.dateTerm(_cal.endTimeSetting.startDate.innerText, _cal.endTimeSetting.endDate.innerText);

    [].forEach.call(term, elem => {
        elem.querySelector('.calendar__date').classList.add('select-list');
    });
}

_cal.endTimeSetting.endTimeSetting = target => {
    const year = _cal.calendar.getFullYear();
    const month = _cal.calendar.getMonth() + 1;
    const date = _cal.splitByTwoLetters(target.querySelector('.calendar__date').innerText);
    const dateString = `${year} / ${_cal.splitByTwoLetters(month)} / ${date}`;
    
    if (_cal.endTimeSetting.numberOfClick <= 0 || dateString <= _cal.endTimeSetting.startDate.innerText) {
        _cal.endTimeSetting.startDate.innerText = dateString;
        
        _cal.endTimeSetting.endDate.innerText = '---- / -- / --';

        _cal.endTimeSetting.numberOfClick++;
        
        return;
    }
    
    _cal.endTimeSetting.endDate.innerText = dateString;

    _cal.endTimeSetting.selectedDate();

    _cal.endTimeSetting.numberOfClick = 0;
}
