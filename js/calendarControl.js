function calendarContainMonth(area) {
    return area.classList.contains('month');
}

function foldUnfold(area, calendar) {
    const contain = calendarContainMonth(area);

    callCalendarMake(area, calendar);
    if (contain) {
        makeMonthCalendar(area, calendar);
    } else {
        makeCalendarLists(area, calendar);
    }
}

function init() {
    const calendarList = document.querySelector('.calendar-area');
    const leftBtn = document.querySelector('.btn--left');
    const rightBtn = document.querySelector('.btn--right');
    const today = document.querySelector('.select-today');
    const unfonld = document.querySelector('.control__unfold');

    let calendar = new Date;

    leftBtn.addEventListener('click', () => {    
        const contain = calendarContainMonth(calendarList);

        if (contain) {
            calendar.setMonth(calendar.getMonth() - 1);
            console.log(calendar.getMonth());
        } else {
            calendar.setDate(calendar.getDate() - 7);
        }

        foldUnfold(calendarList, calendar);
    });
    rightBtn.addEventListener('click', () => {
        const contain = calendarContainMonth(calendarList);

        if (contain) {
            calendar.setMonth(calendar.getMonth() + 1);
            console.log(calendar.getMonth());
        } else {
            calendar.setDate(calendar.getDate() + 7);
        }

        foldUnfold(calendarList, calendar);
    });
    today.addEventListener('click', () => {
        calendar = new Date;
        foldUnfold(calendarList, calendar);
    });
    unfonld.addEventListener('click', () => {
        calendarList.classList.toggle('month');
        foldUnfold(calendarList, calendar);
    });
}

init();