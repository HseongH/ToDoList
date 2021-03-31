_cal.createObject('chooseDate');

_cal.chooseDate.notThisMonth = target => {
    const firstDay = new Date(_cal.calendar.getFullYear(), _cal.calendar.getMonth(), 1).getDay();
    const nodeIndex = _cal.nodeIndex(target);

    if (nodeIndex < firstDay) {
        _cal.calendarControl.lastMonth();
        return;
    }

    _cal.calendarControl.nextMonth();
}

_cal.chooseDate.chooseDate = target => {
    let listDate = target.querySelector('.calendar__date');

    if (_cal.isCurrentMonth(target)) {
        _cal.chooseDate.notThisMonth(target);

        [listDate] = [].filter.call(document.querySelectorAll('.calendar__date'), date => date.innerText === listDate.innerText && !(_cal.isCurrentMonth(date.parentNode)));
    }

    if (listDate.classList.contains('select-list')) return;

    const sib = document.querySelectorAll('.select-list');

    listDate.classList.add('select-list');
    sib && [].forEach.call(sib, sib => {
        sib.classList.remove('select-list');
    });
}

_cal.chooseDate.listActivation = () => {
    const calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', function() {
            _cal.chooseDate.chooseDate(this);
        });
    });
}

_cal.chooseDate.listActivation();
