_cal.createObject('endTimeSetting');

_cal.endTimeSetting.numberOfClick = 0;
_cal.addTaskVar.startDate.innerText = _cal.fullDate;

_cal.endTimeSetting.selectedDate = () => {
  const term = _cal.chooseDate.dateTerm(
    _cal.addTaskVar.startDate.innerText,
    _cal.addTaskVar.endDate.innerText
  );

  [].forEach.call(term, (elem) => {
    const select = elem.querySelector('.calendar__date');

    select.classList.add('select-list');
    _cal.colorChange.selectOverTime(select);
  });
};

_cal.endTimeSetting.endTimeSetting = (target) => {
  const dateString = _cal.chooseDate.redefineDate(target);
  const condition = [
    _cal.endTimeSetting.numberOfClick <= 0,
    dateString <= _cal.addTaskVar.startDate.innerText,
  ];
  const date = _cal.addTaskVar.startDate.innerText.split(' / ');

  if (condition.includes(true)) {
    _cal.addTaskVar.startDate.innerText = dateString;

    _cal.addTaskVar.endDate.innerText = '---- / -- / --';

    _cal.endTimeSetting.numberOfClick++;

    return;
  }

  _cal.calendarInitial.year = date[0];
  _cal.calendarInitial.month = parseInt(date[1]) - 1;
  _cal.calendarInitial.date = date[2];

  _cal.addTaskVar.endDate.innerText = dateString;

  _cal.endTimeSetting.selectedDate();

  _cal.endTimeSetting.numberOfClick = 0;
};
