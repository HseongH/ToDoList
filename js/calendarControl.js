function foldUnfold(area, calendar) {
    const containMonth = calendarContainMonth();
    const containYear = calendarContainYear();

    callCalendarMake(area, calendar);
    if (containMonth && !containYear) {
        makeMonthCalendar(area, calendar);
    } 
    if (containYear) {
        callCalendarMake(area, calendar);
        makeCalendarYear(area, calendar);
    } 
    if (!containMonth && !containYear) {
        makeCalendarLists(area, calendar);
    }

    clickDate(calendar);
}

function wayOfShowing(fold) {
    const contain = calendarContainMonth();
    const foldText = fold.querySelector('h3');
    const btnUnfold = document.querySelector('.btn--unfold');

    if (contain) {
        btnUnfold.classList.add('showing-month');
        foldText.innerText = '주 별로 보기';
    } else {
        btnUnfold.classList.remove('showing-month');
        foldText.innerText = '월 별로 보기';
    }
}

function pastDate(area, calendar) {
    const containMonth = calendarContainMonth();
    const containYear = calendarContainYear();

    if (containMonth && !containYear) {
        calendar.setMonth(calendar.getMonth() - 1);
    }
    if (containYear) {
        calendar.setFullYear(calendar.getFullYear() - 1);
    }
    if (!containMonth && !containYear) {
        calendar.setDate(calendar.getDate() - 7);
    }

    foldUnfold(area, calendar);
}

function nextDate(area, calendar) {
    const containMonth = calendarContainMonth();
    const containYear = calendarContainYear();

    if (containMonth && !containYear) {
        calendar.setMonth(calendar.getMonth() + 1);
    }
    if (containYear) {
        calendar.setFullYear(calendar.getFullYear() + 1);
    }
    if (!containMonth && !containYear) {
        calendar.setDate(calendar.getDate() + 7);
    }

    foldUnfold(area, calendar);
}

function currentDate(area, calendar) {
    calendar = new Date;

    foldUnfold(area, calendar);

    return calendar;
}

function init() {
    const calendarArea = document.querySelector('.calendar-area');
    const leftBtn = document.querySelector('.btn--left');
    const rightBtn = document.querySelector('.btn--right');
    const today = document.querySelector('.select-today');
    const unfold = document.querySelector('.control__unfold');
    const select = document.querySelector('.select');

    let date = new Date;

    foldUnfold(calendarArea, date);

    leftBtn.addEventListener('click', () => {
        pastDate(calendarArea, date);
    });
    rightBtn.addEventListener('click', () => {
        nextDate(calendarArea, date);
    });
    today.addEventListener('click', () => {
        date = currentDate(calendarArea, date);
    });
    unfold && unfold.addEventListener('click', () => {
        calendarArea.classList.remove('year');
        calendarArea.classList.toggle('month');
        foldUnfold(calendarArea, date);
        wayOfShowing(unfold);
    });
    select.addEventListener('click', () => {
        calendarArea.classList.toggle('year');
        foldUnfold(calendarArea, date);
    });
}

init();