function taskToAdd() {
    const year = calendar.getFullYear();
    const month = calendar.getMonth();
    const date = document.querySelector('.select-list').innerText;

    this.href = `index.html?${year}?${month}?${date}`;
}

function init() {
    const href = location.href.split('?');
    const calendarArea = document.querySelector('.calendar-area');
    const submitToDo = document.querySelector('.submit-todos');

    calendar.setFullYear(parseInt(href[1]));
    calendar.setMonth(parseInt(href[2]));
    
    if (href[3]) {
        const calendarList = document.querySelectorAll('.calendar__list');
        const [select] = [].filter.call(calendarList, list => !(currentMonth(list)) && href[3] === list.querySelector('.calendar__date').innerText);

        document.querySelectorAll('.calendar__list')[nodeIndex(select)].click();
    }

    foldUnfold(calendarArea);

    submitToDo.addEventListener('click', taskToAdd);
}

init();