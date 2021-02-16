function selectYear(select) {
    const year = document.querySelector('.select-year');

    year.innerText = select.getFullYear();
}

function selectMonth(select) {
    const month = document.querySelector('.select-month');

    month.innerText = makeTwoString(select.getMonth() + 1);
}

function showDay(calendar) {
    const days = document.createElement('div');

    const day = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    days.setAttribute('class', 'day');
    days.innerText = day[calendar.getDay()];

    return days;
}

function showDate(calendar) {
    const dates = document.createElement('div');

    dates.setAttribute('class', 'calendar__date');
    dates.innerText = calendar.getDate();

    return dates;
}

function makeCalendarLists(list, calendar) {
    const currentDate = new Date;

    for (let i = -3; i <= 3; i++) {
        const calList = document.createElement('li');
        const weekCalendar = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate() + i);
        const days = showDay(weekCalendar);
        const dates = showDate(weekCalendar);

        calList.setAttribute('class', 'calendar__list');
        calList.appendChild(days);
        calList.appendChild(dates);
        
        if (weekCalendar.toDateString() === currentDate.toDateString()) {
            sunset([calList]);
        }

        list.appendChild(calList);
    }
}

function deleteLists(list) {
    list.innerText = '';
}

function pastWeeks(list, index) {
    const pastWeek = new Date;

    index -= 7;
    pastWeek.setDate(pastWeek.getDate() + index);

    deleteLists(list);
    makeCalendarLists(list, pastWeek);
    selectYear(pastWeek);
    selectMonth(pastWeek);

    return index;
}

function nextWeeks(list, index) {
    const nextWeek = new Date;

    index += 7;
    nextWeek.setDate(nextWeek.getDate() + index);

    deleteLists(list);
    makeCalendarLists(list, nextWeek);
    selectYear(nextWeek);
    selectMonth(nextWeek);

    return index;
}

function currentWeeks(list, index) {
    const currentWeek = new Date;

    index = 0;

    deleteLists(list);
    makeCalendarLists(list, currentWeek);
    selectYear(currentWeek);
    selectMonth(currentWeek);

    return index;
}

function init() {
    const calendarList = document.querySelector('.calendar');
    const leftBtn = document.querySelector('.btn--left');
    const rightBtn = document.querySelector('.btn--right');
    const today = document.querySelector('.select-today');

    const calendar = new Date;

    let weekIndex = 0;

    selectYear(calendar);
    selectMonth(calendar);
    makeCalendarLists(calendarList, calendar);

    leftBtn.addEventListener('click', () => {
        weekIndex = pastWeeks(calendarList, weekIndex);
    });
    rightBtn.addEventListener('click', () => {
        weekIndex = nextWeeks(calendarList, weekIndex);
    });
    today.addEventListener('click', () => {
        weekIndex = currentWeeks(calendarList, weekIndex);
    });
}

init();