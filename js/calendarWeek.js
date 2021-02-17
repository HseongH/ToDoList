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
            calList.classList.add('today');
        }

        list.appendChild(calList);
    }
}

function deleteLists(list) {
    list.innerText = '';
}

function callCalendarMake(area, calendar) {
    deleteLists(area);
    selectYear(calendar);
    selectMonth(calendar);
}

function init() {
    const calendarList = document.querySelector('.calendar-area');

    const calendar = new Date;

    selectYear(calendar);
    selectMonth(calendar);
    makeCalendarLists(calendarList, calendar);
}

init();