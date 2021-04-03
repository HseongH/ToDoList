_cal.createObject('chooseDate');

_cal.chooseDate.redefineDate = target => {
    let [year, month] = [_cal.calendar.getFullYear(), _cal.calendar.getMonth() + 1];
    const date = target.querySelector('.calendar__date').innerText;
    const firstDay = new Date(_cal.calendar.getFullYear(), _cal.calendar.getMonth()).getDay();
    const index = _cal.nodeIndex(target);

    if (!(_cal.isCurrentMonth(target))) {
        return `${year} / ${_cal.splitByTwoLetters(month)} / ${_cal.splitByTwoLetters(date)}`;
    }

    if (index < firstDay) {
        month--;
        if (month < 1) {
            month = 12;
            year--;
        }
    } else {
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
    }

    return `${year} / ${_cal.splitByTwoLetters(month)} / ${_cal.splitByTwoLetters(date)}`;
}

_cal.chooseDate.dateTerm = (start, end) => {
    const calenarList = document.querySelectorAll('.calendar__list');
    const target = [].filter.call(calenarList, point => {
        const dateString = _cal.chooseDate.redefineDate(point);

        return start <= dateString && dateString <= end;
    });

    return target;
}

_cal.chooseDate.chooseDate = target => {
    const listDate = target.querySelector('.calendar__date');
    const sib = document.querySelectorAll('.select-list');

    const dateString = _cal.chooseDate.redefineDate(target);
    const date = dateString.split(' / ');

    _cal.calendarInitial.year = date[0];
    _cal.calendarInitial.month = parseInt(date[1]) - 1;
    _cal.calendarInitial.date = date[2];

    console.log(_cal.calendarInitial);

    sib && [].forEach.call(sib, sib => {
        sib.classList.remove('select-list');
    });
    listDate.classList.add('select-list');
}

_cal.chooseDate.listActivation = () => {
    const calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', function() {
            _cal.chooseDate.chooseDate(this);

            if (_cal.calendarType()) {
                _cal.endTimeSetting.endTimeSetting(this);
                return;
            }
            
            _cal.displayedAList.listDisplay(this);
        });
    });

    if (_cal.calendarType()) {
        _cal.endTimeSetting.selectedDate();
    }
}

_cal.chooseDate.listActivation();
