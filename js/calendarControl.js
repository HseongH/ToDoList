function calendarContainMonth() {
    const calendarArea = document.querySelector('.calendar-area');

    return calendarArea.classList.contains('month');
}

function foldUnfold(area, calendar) {
    const contain = calendarContainMonth();

    callCalendarMake(area, calendar);
    if (contain) {
        makeMonthCalendar(area, calendar);
    } else {
        makeCalendarLists(area, calendar);
    }
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
    const contain = calendarContainMonth();

    if (contain) {
        calendar.setMonth(calendar.getMonth() - 1);
    } else {
        calendar.setDate(calendar.getDate() - 7);
    }

    foldUnfold(area, calendar);
}

function nextDate(area, calendar) {
    const contain = calendarContainMonth();

    if (contain) {
        calendar.setMonth(calendar.getMonth() + 1);
    } else {
        calendar.setDate(calendar.getDate() + 7);
    }

    foldUnfold(area, calendar);
}

function currentDate(area, calendar) {
    calendar = standardDate();

    foldUnfold(area, calendar);

    return calendar;
}

function init() {
    const calendarArea = document.querySelector('.calendar-area');
    const leftBtn = document.querySelector('.btn--left');
    const rightBtn = document.querySelector('.btn--right');
    const today = document.querySelector('.select-today');
    const unfold = document.querySelector('.control__unfold');

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
        calendarArea.classList.toggle('month');
        foldUnfold(calendarArea, date);
        wayOfShowing(unfold);
    });
}

init();