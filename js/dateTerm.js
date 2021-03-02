let index = 0;

function term() {
    const calendarList = document.querySelectorAll('.calendar__list');
    const startDate = document.querySelector('.select-date').innerText;
    const endDate = document.querySelectorAll('.select-date')[1].innerText;

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
    
    [].forEach.call(selectDate, date => {
        date.querySelector('.calendar__date').classList.add('select-list');
    });
}

function setFinishDate(elem, calendar) {
    const year = calendar.getFullYear();
    const month = calendar.getMonth();
    const date = elem.querySelector('.calendar__date').innerText;
    const startDate = document.querySelector('.select-date');
    const endDate = document.querySelectorAll('.select-date')[1];
    
    if (index === 0) {
        startDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;

        endDate.innerText = '---- / -- / --';

        index++;
    } else {
        const end = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;

        if (end > startDate.innerText) {
            endDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;

            index = 0;

            term();
        } else {
            startDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;
        }
    }
}

function dateTerm(calendar) {
    const calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', () => {
            setFinishDate(list, calendar);
        });
    });
}