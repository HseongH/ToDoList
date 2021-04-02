_cal.createObject('chooseDate');

_cal.chooseDate.redefineDate = (target) => {
    let [year, month] = [_cal.calendar.getFullYear(), _cal.calendar.getMonth() + 1];
    const date = target.querySelector('.calendar__date').innerText;
    const firstDay = new Date(_cal.calendar.getFullYear(), _cal.calendar.getMonth(), 1).getDay();
    const index = _cal.nodeIndex(target);

    if (_cal.isCurrentMonth(target) && index < firstDay) {
        month--;
        if (month < 1) {
            month = 12;
            year--;
        }
    } else if (_cal.isCurrentMonth(target) && index > firstDay) {
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

_cal.chooseDate.notThisMonth = target => {
    const firstDay = new Date(_cal.calendar.getFullYear(), _cal.calendar.getMonth(), 1).getDay();
    const index = _cal.nodeIndex(target);

    if (index < firstDay) {
        _cal.calendarControl.lastMonth();
        return;
    }

    _cal.calendarControl.nextMonth();
}

_cal.chooseDate.chooseDate = target => {
    let listDate = target.querySelector('.calendar__date');
    const condition = _cal.isCurrentMonth(target) && _cal.isContainMonth();

    if (condition) {
        _cal.chooseDate.notThisMonth(target);

        const calendarDate = document.querySelectorAll('.calendar__date');

        [listDate] = [].filter.call(calendarDate, date => date.innerText === listDate.innerText && !(_cal.isCurrentMonth(date.parentNode)));
    }

    const sib = document.querySelectorAll('.select-list');

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
        return;
    }
}

_cal.chooseDate.listActivation();
