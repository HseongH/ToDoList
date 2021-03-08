function term(startDate, endDate, calendar) {
    const calendarList = document.querySelectorAll('.calendar__list');
    const year = document.querySelector('.select-year').innerText;
    const month = document.querySelector('.select-month').innerText;

    const selectDate = [].filter.call(calendarList, list => {
        const select = `${year} / ${month} / ${list.querySelector('.calendar__date').innerText}`;

        return startDate <= select && endDate >= select;
    });
    
    if (calendarList[0].parentNode.classList.contains('calendar-task')) {
        addSelect(calendar, selectDate);
    } else {
        toDoTerm(selectDate);
    }
}