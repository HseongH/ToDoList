function foldUnfold(area) {
    const containMonth = calendarContainMonth();
    const containYear = calendarContainYear();
    const startDate = document.querySelector('.select-date');
    const endDate = document.querySelectorAll('.select-date')[1];

    callCalendarMake(area);
    if (containMonth && !containYear) {
        makeMonthCalendar(area);
    } 
    if (containYear) {
        callCalendarMake(area);
        makeCalendarYear(area);
    } 
    if (!containMonth && !containYear) {
        makeCalendarLists(area);
    }

    clickDate();
    if (currentCalendar() && !containYear) {
        dateTerm();
        term(startDate.innerText, endDate.innerText);
    }
    
    if (!currentCalendar() && !containYear) {
        const todo = new LocalToDo;
        
        todo.todo && hasList();
    }
}

function wayOfShowing(fold) {
    const contain = calendarContainMonth();
    const foldText = fold.querySelector('h3');
    const arrowUnfold = document.querySelector('.arrow--unfold');

    if (contain) {
        arrowUnfold.classList.add('showing-month');
        foldText.innerText = '주 별로 보기';
    } else {
        arrowUnfold.classList.remove('showing-month');
        foldText.innerText = '월 별로 보기';
    }
}

function pastDate(area) {
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

    foldUnfold(area);
}

function nextDate(area) {
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

    foldUnfold(area);
}

function currentDate(area) {
    calendar = new Date;

    foldUnfold(area);
}

function init() {
    const calendarArea = document.querySelector('.calendar-area');
    const leftArrow = document.querySelector('.arrow--left');
    const rightArrow = document.querySelector('.arrow--right');
    const today = document.querySelector('.select-today');
    const unfold = document.querySelector('.control__unfold');
    const select = document.querySelector('.select');

    foldUnfold(calendarArea);

    leftArrow.addEventListener('click', () => {
        pastDate(calendarArea);
    });
    rightArrow.addEventListener('click', () => {
        nextDate(calendarArea);
    });
    today.addEventListener('click', () => {
        date = currentDate(calendarArea);
    });
    unfold && unfold.addEventListener('click', () => {
        calendarArea.classList.remove('year');
        calendarArea.classList.toggle('month');
        foldUnfold(calendarArea);
        wayOfShowing(unfold);
    });
    select.addEventListener('click', () => {
        calendarArea.classList.toggle('year');
        foldUnfold(calendarArea);
    });
    
    if (!currentCalendar()) {
        todayTask();
    }
}

init();