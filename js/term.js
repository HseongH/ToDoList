function term(startDate, endDate, calendar) {
    const calendarList = document.querySelectorAll('.calendar__list');

    const year = parseInt(document.querySelector('.select-year').innerText);
    const month = parseInt(document.querySelector('.select-month').innerText);
    const yearMonth = `${year}/${month}`;

    const s_split = startDate.split('/');
    const e_split = endDate.split('/');

    const s_year = parseInt(s_split[0]);
    const s_month = parseInt(s_split[1]);
    const e_year = parseInt(e_split[0]);
    const e_month = parseInt(e_split[1]);

    const s_yearMonth = `${s_year}/${s_month}`;
    const e_yearMonth = `${e_year}/${e_month}`;
    const s_date = parseInt(s_split[2]);
    const e_date = parseInt(e_split[2]);

    const selectDate = [].filter.call(calendarList, list => {
        if (yearMonth === s_yearMonth && yearMonth === e_yearMonth) {
            return !list.classList.contains('not-current-month') && list.querySelector('.calendar__date').innerText >= s_date && list.querySelector('.calendar__date').innerText <= e_date;
        } else if (yearMonth === s_yearMonth && yearMonth !== e_yearMonth) {
            return (!list.classList.contains('not-current-month') && list.querySelector('.calendar__date').innerText >= s_date) || 
            (list.classList.contains('not-current-month') && list.querySelector('.calendar__date').innerText <= e_date);
        } else if (yearMonth !== s_yearMonth && yearMonth === e_yearMonth) {
            return (list.classList.contains('not-current-month') && list.querySelector('.calendar__date').innerText >= s_date) || 
            (!list.classList.contains('not-current-month') && list.querySelector('.calendar__date').innerText <= e_date);
        } else if (year === s_year && year === e_year && month > s_month && month < e_month){
            return list;
        }
    });
    
    if (calendarList[0].parentNode.classList.contains('calendar-task')) {
        addSelect(calendar, selectDate);
    } else {
        toDoTerm(selectDate);
    }
}