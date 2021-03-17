function showMonth(calendar) {
    const month = document.createElement('div');

    month.setAttribute('class', 'calendar__month');
    month.innerText = `${calendar.getMonth() + 1}월`;

    return month;
}

function calendarMonth(list, area) {
    const month = parseInt(list.innerText);

    calendar.setMonth(month - 1);
    area.classList.remove('year');

    foldUnfold(area);
}

function makeCalendarYear(area) {
    const year = new Date(calendar.getFullYear(), 0);

    for (let i = 0; i < 12; i++) {
        const calList = document.createElement('li');
        const month = showMonth(year);

        calList.setAttribute('class', 'calendar__list');

        calList.appendChild(month);

        if (year.getMonth() === calendar.getMonth()) {
            if(calendar.getHours() >= 18 || calendar.getHours() <= 6) {
                calList.classList.add('select-sunset');
            } else {
                calList.classList.add('select-list');
            }
        }

        area.appendChild(calList);

        year.setMonth(year.getMonth() + 1);

        calList.addEventListener('click', () => {
            calendarMonth(month, area);
        });
    }
}