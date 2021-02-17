function makeMonthCalendar(area, calendar) {
    const month = new Date(calendar.getFullYear(), calendar.getMonth(), calendar.getDate(calendar.setDate(1)));
    const currentDate = new Date;

    const firstDay = month.getDay();
    let lastDay = 0

    month.setDate(month.getDate() - month.getDay());
    calendar.setMonth(calendar.getMonth() + 1);
    lastDay = calendar.getDate(calendar.setDate(0));

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