let index = 0;

function setFinishDate(elem) {
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

            term(startDate.innerText, endDate.innerText);
        } else {
            startDate.innerText = `${year} / ${makeTwoString(month + 1)} / ${makeTwoString(date)}`;
        }
    }
}

function dateTerm() {
    const calendarList = document.querySelectorAll('.calendar__list');

    [].forEach.call(calendarList, list => {
        list.addEventListener('click', () => {
            setFinishDate(list);
        });
    });
}