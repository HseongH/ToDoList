_cal.createObject('doListControl');

_cal.doListControl.showingType = document.querySelector('.showing-type');
_cal.doListControl.completeList = document.querySelector('.complete-lists');
_cal.doListControl.doList = document.querySelector('.do-lists');
_cal.doListControl.listAll = document.querySelector('.list-all');

_cal.doListControl.typeChange = (apply) => {
  const calendarSection = document.querySelector('.section--calendar');
  const toDoLists = document.querySelectorAll('.todos__list');
  const comList = _cal.doListControl.completeList;
  const doList = _cal.doListControl.doList;
  const listAll = _cal.doListControl.listAll;

  calendarSection.classList.toggle('hide');

  if (calendarSection.classList.contains('hide')) {
    apply.innerText = '날짜 별로 보기';
    comList.classList.remove('hide');
    doList.classList.remove('hide');
    listAll.classList.remove('hide');

    [].forEach.call(toDoLists, (list) => {
      list.classList.remove('hide');
    });

    return;
  }

  apply.innerText = '전체 목록 보기';
  comList.classList.add('hide');
  doList.classList.add('hide');
  listAll.classList.add('hide');

  const dateString = _cal.fullDate;
  const date = dateString.split(' / ');

  _cal.calendar.setFullYear(date[0]);
  _cal.calendar.setMonth(parseInt(date[1]) - 1);
  _cal.calendar.setDate(date[2]);

  _cal.calendarControl.wayOfShowing();

  const select = document.querySelector('.select-list').parentNode;

  _cal.displayedAList.listDisplay(select);
};

// SHOWING TYPE CONTROL
_cal.doListControl.showingType.addEventListener('click', function () {
  _cal.doListControl.typeChange(this);
});

// LIST TO SHOW CONTROL
_cal.doListControl.completeList.addEventListener('click', function () {
  const toDoLists = document.querySelectorAll('.todos__list');

  [].forEach.call(toDoLists, (list) => {
    if (list.classList.contains('complete')) {
      list.classList.remove('hide');
      return;
    }

    list.classList.add('hide');
  });
});

_cal.doListControl.doList.addEventListener('click', function () {
  const toDoLists = document.querySelectorAll('.todos__list');

  [].forEach.call(toDoLists, (list) => {
    if (list.classList.contains('complete')) {
      list.classList.add('hide');
      return;
    }

    list.classList.remove('hide');
  });
});

_cal.doListControl.listAll.addEventListener('click', function () {
  const toDoLists = document.querySelectorAll('.todos__list');

  [].forEach.call(toDoLists, (list) => {
    list.classList.remove('hide');
  });
});
