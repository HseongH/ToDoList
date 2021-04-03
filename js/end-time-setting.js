_cal.createObject('endTimeSetting');

_cal.endTimeSetting.numberOfClick = 0;

_cal.endTimeSetting.selectedDate = () => {
    const term = _cal.chooseDate.dateTerm(_cal.addTaskVar.startDate.innerText, _cal.addTaskVar.endDate.innerText);

    [].forEach.call(term, elem => {
        elem.querySelector('.calendar__date').classList.add('select-list');
    });
}

_cal.endTimeSetting.endTimeSetting = target => {
    const dateString = _cal.chooseDate.redefineDate(target);
    
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

// [].forEach.call(_cal.calendarList(), list => {
//     list.addEventListener('click', function() {
//         _cal.endTimeSetting.endTimeSetting(this);
//     })
// });
