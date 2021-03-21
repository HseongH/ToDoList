function addToTask() {
    const year = calendar.getFullYear();
    const month = calendar.getMonth();
    const date = document.querySelector('.select-list').innerText;

    this.href = `addTask.html?${year}?${month}?${date}`;
}

function sd(href) {
    const calendarList = document.querySelectorAll('.calendar__list');
    const [select] = [].filter.call(calendarList, list => href === list.querySelector('.calendar__date').innerText);
    console.log(select);

    document.querySelectorAll('.calendar__list')[nodeIndex(select)].click();
}

function init() {
    const addTask = document.querySelector('.add-todos');
    const href = location.href.split('?');
    const calendarArea = document.querySelector('.calendar-area');
    console.log(href);

    if (href[1]) {
        calendar.setFullYear(parseInt(href[1]));
        calendar.setMonth(parseInt(href[2]));

        if (href[3]) {
            calendar.setDate(parseInt(href[3]));
            sd(href[3]);
            
            foldUnfold(calendarArea);
        }

        foldUnfold(calendarArea);
    }

    addTask.addEventListener('click', addToTask);
}

init();