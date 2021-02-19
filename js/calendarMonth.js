function makeMonthCalendar(area, calendar) {
    const month = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate());
    const nextMonth = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate());
    const currentDate = standardDate();

    month.setDate(1);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(0);

    const firstDay = month.getDay();
    const lastDay = nextMonth.getDate();

    month.setDate(month.getDate() - month.getDay());

    for (let i = 0; i < 42; i++) {
        const calList = document.createElement('li');
        const dates = showDate(month);

        calList.setAttribute('class', 'calendar__list');

        if (i <= 6) {
            const days = showDay(month);
            calList.appendChild(days)
        }
        
        if (i < firstDay || i - firstDay >= lastDay) {
            dates.classList.add('not-current-month');
        }
        calList.appendChild(dates);
        
        if (month.toDateString() === currentDate.toDateString()) {
            sunset([calList]);
            calList.classList.add('today');
        }

        area.appendChild(calList);

        month.setDate(month.getDate() + 1);
    }
}