_cal.calendarControl.foldAndUnfold = () => {
    const fold = _cal.indexVar.unfold;
    const status = fold.querySelector('.calendar-status');
    const arrow = fold.querySelector('.arrow--unfold');

    _cal.calElem.classList.remove('year');
    _cal.calElem.classList.toggle('month');
    arrow.classList.toggle('showing-month');

    _cal.createCalendar.delLists();

    if (_cal.isContainMonth()) {
        _cal.createCalendar.monthlyCalendar();
        status.innerText = '주 별로 보기';

        return;
    }

    _cal.createCalendar.weeklyCalendar();
    status.innerText = '월 별로 보기';
}

_cal.indexVar.unfold.addEventListener('click', _cal.calendarControl.foldAndUnfold);
